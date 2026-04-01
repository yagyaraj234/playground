import { z } from "zod";
import type {
  BlogContent,
  BlogOutline,
  ResearchData,
  UserInput,
  SEOMetadata,
  FAQItem,
  InternalLink,
  ArticleSchema,
} from "../../types/blog";
import { generateText, Output } from "ai";
import { getCurrentModel, CURRENT_PROVIDER } from "../../lib/model-config";
import { generateObjectResult } from "../../lib/model.util";

class SEOLayer {
  static async generateSEOMetadata(
    blogContent: BlogContent,
    outline: BlogOutline,
    researchData: ResearchData,
    userInput: UserInput,
  ): Promise<SEOMetadata> {
    const metaTitle = await this.generateMetaTitle(userInput.topic, outline.h1);

    // Generate meta description
    const metaDescription = await this.generateMetaDescription(
      userInput.topic,
      blogContent,
    );

    // Generate internal link suggestions
    const internalLinks = await this.generateInternalLinks(
      outline,
      blogContent,
      userInput.topic,
    );

    // Generate FAQ schema from mined questions
    const faqSchema = await this.generateFAQSchema(
      researchData.questionMining,
      blogContent,
    );

    // Generate Article schema
    const articleSchema = this.generateArticleSchema(
      outline.h1,
      metaDescription,
      blogContent,
      userInput.topic,
    );

    return {
      metaTitle,
      metaDescription,
      internalLinks,
      faqSchema,
      articleSchema,
    };
  }

  /**
   * Generates meta title (≤60 chars) with primary keyword
   */
  private static async generateMetaTitle(
    topic: string,
    h1: string,
  ): Promise<string> {
    const model = await getCurrentModel(CURRENT_PROVIDER);

    const result = await generateText({
      model,
      prompt: `Generate a compelling meta title for a blog post about "${topic}".

        Main heading: ${h1}

        Requirements:
        - Maximum 60 characters (including spaces)
        - Include the primary keyword "${topic}"
        - Be compelling and click-worthy
        - Avoid clickbait or misleading language
        - Use title case

        Return ONLY the meta title, nothing else.`,
      temperature: 0.7,
    });

    // Ensure it's under 60 chars
    let title = result.text.trim();
    if (title.length > 60) {
      title = title.substring(0, 57) + "...";
    }

    return title;
  }

  /**
   * Generates meta description (≤155 chars) with call-to-action
   */
  private static async generateMetaDescription(
    topic: string,
    blogContent: BlogContent,
  ): Promise<string> {
    const model = await getCurrentModel(CURRENT_PROVIDER);

    // Get first section content for context
    const firstSection = blogContent.sections[0];
    const contentPreview = firstSection?.content.substring(0, 300) || "";

    const result = await generateText({
      model,
      prompt: `Generate a compelling meta description for a blog post about "${topic}".

            Content preview:
            ${contentPreview}

            Requirements:
            - Maximum 155 characters (including spaces)
            - Include a call-to-action (e.g., "Learn how", "Discover", "Master")
            - Be compelling and encourage clicks
            - Summarize the main benefit or value
            - Avoid clickbait or misleading language

            Return ONLY the meta description, nothing else.`,
      temperature: 0.7,
    });

    // Ensure it's under 155 chars
    let description = result.text.trim();
    if (description.length > 155) {
      description = description.substring(0, 152) + "...";
    }

    return description;
  }

  /**
   * Generates internal link suggestions based on outline and content
   */
  private static async generateInternalLinks(
    outline: BlogOutline,
    blogContent: BlogContent,
    topic: string,
  ): Promise<InternalLink[]> {
    const model = await getCurrentModel(CURRENT_PROVIDER);

    // Get section titles and key content
    const sectionTitles = outline.sections.map((s) => s.title).join(", ");
    const contentPreview = blogContent.sections
      ?.slice(0, 3)
      .map((s) => s.content.substring(0, 200))
      .join("\n");

    const schema = Output.object({
      schema: z.object({
        links: z
          .array(
            z.object({
              anchor: z.string().describe("The anchor text for the link"),
              url: z
                .string()
                .describe(
                  "The suggested URL path (relative, e.g., /blog/topic)",
                ),
              context: z
                .string()
                .describe("Where in the content this link should appear"),
            }),
          )
          .describe("Array of internal link suggestions"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: `Generate internal link suggestions for a blog post about "${topic}".

    Section titles: ${sectionTitles}

    Content preview:
    ${contentPreview}

    Generate 3-5 internal link suggestions that would be relevant to this blog post.
    For each link:
    - Suggest an anchor text (the clickable text)
    - Suggest a URL path (relative, like /blog/react-hooks)
    - Explain where in the content this link should appear

    Focus on links that would be genuinely helpful to readers, not forced or spammy.`,
    });

    return result.links;
  }

  /**
   * Generates FAQ schema from mined questions
   */
  private static async generateFAQSchema(
    questionMining: any,
    blogContent: BlogContent,
  ): Promise<FAQItem[]> {
    const model = await getCurrentModel(CURRENT_PROVIDER);

    // Combine all questions
    const allQuestions = [
      ...questionMining.beginnerQuestions?.slice(0, 2),
      ...questionMining.whyDoesThisBreak?.slice(0, 2),
      ...questionMining.whenNotToUse?.slice(0, 1),
    ];

    // Get relevant content for answers
    const contentSummary = blogContent.sections
      ?.slice(0, 5)
      .map((s) => `${s.title}: ${s.content.substring(0, 150)}`)
      .join("\n\n");

    const schema = Output.object({
      schema: z.object({
        faqItems: z
          .array(
            z.object({
              question: z.string().describe("The FAQ question"),
              answer: z
                .string()
                .describe(
                  "A concise answer (1-2 sentences) based on the blog content",
                ),
            }),
          )
          .describe("Array of FAQ items"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: `Generate FAQ schema items based on these questions and blog content.

        Questions:
        ${allQuestions.map((q) => `- ${q}`).join("\n")}

        Blog content summary:
        ${contentSummary}

        For each question, generate a concise answer (1-2 sentences) based on the blog content.
        Answers should be direct and informative, suitable for FAQ schema.`,
    });

    return result.faqItems;
  }

  /**
   * Generates Article schema (JSON-LD) with required fields
   */
  private static generateArticleSchema(
    headline: string,
    description: string,
    blogContent: BlogContent,
    topic: string,
  ): ArticleSchema {
    // Use current date for publication
    const now = new Date();
    const datePublished = now.toISOString().split("T")[0];

    return {
      headline,
      description,
      author: "AI Blog Generator",
      datePublished,
      wordCount: blogContent.totalWordCount,
    };
  }
}

export async function generateSEO(
  blogContent: BlogContent,
  outline: BlogOutline,
  researchData: ResearchData,
  userInput: UserInput,
): Promise<SEOMetadata> {
  const phaseStartTime = Date.now();

  try {
    const seoMetadata = await SEOLayer.generateSEOMetadata(
      blogContent,
      outline,
      researchData,
      userInput,
    );

    return seoMetadata;
  } catch (error) {
    console.log(
      "seo-generation",
      Date.now() - phaseStartTime,
      0,
      "failed",
      `SEO generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error;
  }
}
