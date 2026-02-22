import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { CURRENT_MODEL } from "../../lib/model-config";

import {
  BlogContentType as BlogContent,
  generatedSectionType as GeneratedSection,
  BlogOutlineType as BlogOutline,
  userInputType as ValidatedInput,
  QualityCheckType,
  QualityCheckResult,
} from "../../types/blog";
import type { ResearchData, UserInput } from "../../types/blog";
import { QualityChecker } from "./quality-checker";

async function buildRegenerationPrompt(
  section: any,
  qualityCheckResult: QualityCheckResult,
): Promise<string> {
  return `Regenerate this section to fix the following issues:

Section: ${section.title}
Current content: ${section.content.substring(0, 500)}...

Issues to fix:
${qualityCheckResult.regenerationReason}

Regenerate the section addressing these issues.`;
}

export class ContentGenerator {
  /**
   * Generates blog content section by section
   * @param outline - The approved blog outline
   * @param researchData - The research data from ResearchEngine
   * @param validatedInput - The validated blog generation input
   * @returns BlogContent with all generated sections
   */
  async generateContent(
    outline: BlogOutline,
    researchData: ResearchData,
    validatedInput: UserInput,
  ): Promise<BlogContent> {
    const sections: GeneratedSection[] = [];
    let totalWordCount = 0;
    let totalTokensUsed = 0;
    let totalGenerationTime = 0;

    // Generate H1 (intro section)
    const introStartTime = Date.now();

    const prompt = this.buildIntroPrompt(outline, validatedInput, researchData);

    const { text, usage } = await generateText({
      model: google(CURRENT_MODEL),
      prompt,
      temperature: 0.7,
    });

    const introSection: GeneratedSection = {
      level: 1,
      title: outline.h1,
      content: this.enforceStyleRules(text),
      wordCount: this.countWords(text),
      tokensUsed: usage?.totalTokens || 0,
      generationTime: Date.now() - introStartTime,
    };

    sections.push(introSection);
    totalWordCount += introSection.wordCount;
    totalTokensUsed += introSection.tokensUsed;
    totalGenerationTime += introSection.generationTime;

    // Generate H2 and H3 sections
    for (const outlineSection of outline.sections) {
      const sectionStartTime = Date.now();

      const prompt =
        outlineSection.level === 2
          ? this.buildH2Prompt(
              outlineSection,
              outline,
              validatedInput,
              researchData,
            )
          : this.buildH3Prompt(
              outlineSection,
              outline,
              validatedInput,
              researchData,
            );

      const { text, usage } = await generateText({
        model: google(CURRENT_MODEL),
        prompt,
        temperature: 0.7,
      });

      const content = this.enforceStyleRules(text);
      const cleanedContent = this.removeFluff(content);

      const section: GeneratedSection = {
        level: outlineSection.level,
        title: outlineSection.title,
        content: cleanedContent,
        wordCount: this.countWords(cleanedContent),
        tokensUsed: usage?.totalTokens || 0,
        generationTime: Date.now() - sectionStartTime,
      };

      sections.push(section);
      totalWordCount += section.wordCount;
      totalTokensUsed += section.tokensUsed;
      totalGenerationTime += section.generationTime;
    }

    // Generate conclusion section
    const conclusionStartTime = Date.now();
    const {
      text: conclusionText,
      usage: { totalTokens: conclusionTokens },
    } = await generateText({
      model: google(CURRENT_MODEL),
      prompt: this.buildConclusionPrompt(outline, validatedInput),
      temperature: 0.7,
    });

    const conclusionSection: GeneratedSection = {
      level: 2,
      title: "Conclusion",
      content: this.enforceStyleRules(conclusionText),
      wordCount: this.countWords(conclusionText),
      tokensUsed: conclusionTokens ?? 0,
      generationTime: Date.now() - conclusionStartTime,
    };

    sections.push(conclusionSection);
    totalWordCount += conclusionSection.wordCount;
    totalTokensUsed += conclusionSection.tokensUsed;
    totalGenerationTime += conclusionSection.generationTime;

    return {
      sections,
      totalWordCount,
      totalTokensUsed,
      totalGenerationTime,
    };
  }

  /**
   * Builds the prompt for intro section (H1)
   */
  private buildIntroPrompt(
    outline: BlogOutline,
    validatedInput: ValidatedInput,
    researchData: ResearchData,
  ): string {
    return `Write an engaging introduction for a blog post about "${validatedInput.topic}".

Title: ${outline.h1}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

STYLE RULES:
- Use simple, clear language
- Lowercase unless it's an acronym (e.g., "API", "HTTP")
- Explain like you're teaching a beginner
- Keep paragraphs short (2-3 sentences max)
- Be conversational but precise
- No buzzwords or marketing tone
- No repetition

CONTENT GUIDELINES:
- Hook the reader with a relatable problem or question
- Briefly explain what the post will cover
- Set expectations for what they'll learn
- Keep it concise (150-250 words)

Write the introduction now:`;
  }

  /**
   * Builds the prompt for H2 sections
   */
  private buildH2Prompt(
    section: any,
    outline: BlogOutline,
    validatedInput: ValidatedInput,
    researchData: ResearchData,
  ): string {
    const isSpecialSection =
      section.title.toLowerCase().includes("how it works") ||
      section.title.toLowerCase().includes("common mistake") ||
      section.title.toLowerCase().includes("when not") ||
      section.title.toLowerCase().includes("real-world");

    let specialGuidance = "";
    if (section.title.toLowerCase().includes("how it works")) {
      specialGuidance =
        "\nFocus on explaining the mechanics and internals. Use analogies if helpful.";
    } else if (section.title.toLowerCase().includes("common mistake")) {
      specialGuidance =
        '\nInclude specific examples of what goes wrong. Use "this fails when..." or "I\'ve seen this break..." snippets.';
    } else if (section.title.toLowerCase().includes("when not")) {
      specialGuidance =
        "\nExplain limitations and when alternatives might be better. Be honest about trade-offs.";
    } else if (section.title.toLowerCase().includes("real-world")) {
      specialGuidance =
        "\nProvide a concrete, practical example. Include code if relevant. Make it relatable.";
    }

    return `Write a section for a blog post about "${validatedInput.topic}".

Section Title: ${section.title}
Section Description: ${section.description}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

STYLE RULES:
- Use simple, clear language
- Lowercase unless it's an acronym (e.g., "API", "HTTP")
- Explain like you're teaching a beginner
- Keep paragraphs short (2-3 sentences max)
- Be conversational but precise
- No buzzwords or marketing tone
- No repetition
- Remove any paragraph that can be deleted without losing meaning

CONTENT GUIDELINES:
- Answer the section description clearly
- Include practical examples or code snippets where relevant
- Use experience snippets: "this fails when", "I've seen this break", "people assume X but"
- Keep it focused and avoid tangents
- Target length: 300-500 words${specialGuidance}

Write the section now:`;
  }

  /**
   * Builds the prompt for H3 sections
   */
  private buildH3Prompt(
    section: any,
    outline: BlogOutline,
    validatedInput: ValidatedInput,
    researchData: ResearchData,
  ): string {
    return `Write a subsection for a blog post about "${validatedInput.topic}".

Subsection Title: ${section.title}
Subsection Description: ${section.description}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

STYLE RULES:
- Use simple, clear language
- Lowercase unless it's an acronym (e.g., "API", "HTTP")
- Explain like you're teaching a beginner
- Keep paragraphs short (2-3 sentences max)
- Be conversational but precise
- No buzzwords or marketing tone
- No repetition
- Remove any paragraph that can be deleted without losing meaning

CONTENT GUIDELINES:
- Provide depth or examples for the parent section
- Include code examples if relevant
- Keep it concise and focused
- Target length: 150-300 words

Write the subsection now:`;
  }

  /**
   * Builds the prompt for conclusion section
   */
  private buildConclusionPrompt(
    outline: BlogOutline,
    validatedInput: ValidatedInput,
  ): string {
    const keyPoints = outline.sections
      .filter((s) => s.level === 2)
      .map((s) => s.title)
      .slice(0, 3);

    return `Write a conclusion for a blog post about "${validatedInput.topic}".

Main Points Covered:
${keyPoints.map((p) => `- ${p}`).join("\n")}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

STYLE RULES:
- Use simple, clear language
- Lowercase unless it's an acronym
- Be conversational but precise
- No buzzwords or marketing tone
- Keep paragraphs short (2-3 sentences max)

CONTENT GUIDELINES:
- Summarize the key takeaways
- Provide actionable next steps
- End with a call-to-action or thought-provoking question
- Keep it concise (150-250 words)

Write the conclusion now:`;
  }

  /**
   * Enforces style rules on generated content
   */
  private enforceStyleRules(content: string): string {
    let result = content;

    // Remove excessive punctuation
    result = result.replace(/([.!?])\1{2,}/g, "$1");

    // Fix spacing around punctuation
    result = result.replace(/\s+([.!?,;:])/g, "$1");
    result = result.replace(/([.!?,;:])\s+/g, "$1 ");

    // Ensure proper spacing
    result = result.replace(/\s+/g, " ").trim();

    // Remove marketing buzzwords
    const buzzwords = [
      /\bamazing\b/gi,
      /\bawesome\b/gi,
      /\bincredible\b/gi,
      /\bbeautiful\b/gi,
      /\bpowerful\b/gi,
      /\brevolutionary\b/gi,
      /\bstate-of-the-art\b/gi,
      /\bcutting-edge\b/gi,
      /\bworld-class\b/gi,
      /\bsimply\b/gi,
      /\bjust\b/gi,
      /\beasily\b/gi,
    ];

    for (const buzzword of buzzwords) {
      result = result.replace(buzzword, "");
    }

    // Clean up extra spaces created by buzzword removal
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }

  /**
   * Removes fluff paragraphs (paragraphs that can be deleted without losing meaning)
   */
  private removeFluff(content: string): string {
    const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);

    // Filter out very short paragraphs that are likely fluff
    const meaningfulParagraphs = paragraphs.filter((p) => {
      const words = p.trim().split(/\s+/).length;
      // Keep paragraphs with at least 15 words
      return words >= 15;
    });

    // If we removed too much, keep original
    if (meaningfulParagraphs.length === 0) {
      return content;
    }

    return meaningfulParagraphs.join("\n\n");
  }

  /**
   * Counts words in a string
   */
  private countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }
}

const ContentResponse = {
  sections: [
    {
      level: 1,
      title: "Core Web Vitals Explained: A Simple Guide to LCP, CLS, and INP",
      content:
        "have you ever visited a website that felt. off? maybe it loaded slowly, or elements on the page shifted around as you were about to click something important. this isn't annoying; it's a poor user experience. google, like users, wants websites to be fast, stable, and responsive. to measure these crucial aspects of user experience, they introduced a set of metrics called core web vitals. these aren't technical terms; they are direct indicators of how a real person interacts with your site. in this guide, we'll break down the three main core web vitals: largest contentful paint (`lcp`), cumulative layout shift (`cls`), and interaction to next paint (`inp`). these metrics cover the key phases of loading, visual stability, and responsiveness. by the end of this post, you'll have a clear understanding of what each of these metrics means. you'll learn why they are important for your website's users and how they contribute to a smooth, pleasant online experience. consider this your simple map to navigating the essentials of core web vitals.",
      wordCount: 176,
      tokensUsed: 1635,
      generationTime: 7434,
    },
  ],
  totalWordCount: 1144,
  totalTokensUsed: 6369,
  totalGenerationTime: 28728,
};

export async function phaseGenerateContent(
  outline: BlogOutline,
  researchData: ResearchData,
  userInput: UserInput,
): Promise<BlogContent> {
  const phaseStartTime = Date.now();
  let totalTokensUsed = 0;
  let regenerationCount = 0;

  try {
    const contentGenerator = new ContentGenerator();
    const qualityChecker = new QualityChecker();

    let blogContent = ContentResponse;
    // Generate initial content
    // let blogContent = await contentGenerator.generateContent(
    //   outline,
    //   researchData,
    //   userInput,
    // );

    totalTokensUsed += blogContent.totalTokensUsed;

    // Check quality of each section and regenerate if needed
    const checkedSections = [];

    for (const section of blogContent.sections) {
      let currentSection = section;
      let attempts = 0;
      let qualityCheckResult: QualityCheckType | null = null;

      // Try up to 3 times to get a section that passes quality checks
      while (attempts < 3) {
        qualityCheckResult = await qualityChecker.checkQuality(
          currentSection,
          researchData,
          userInput,
        );

        if (qualityCheckResult?.overallPassed) {
          break;
        }

        // Regenerate the section
        attempts++;
        regenerationCount++;

        if (attempts < 3) {
          const regenerationPrompt = await buildRegenerationPrompt(
            currentSection,
            qualityCheckResult,
          );

          // Regenerate using ContentGenerator
          const regeneratedContent = await contentGenerator.generateContent(
            {
              ...outline,
              sections: [
                {
                  level: currentSection.level as 2 | 1,
                  title: currentSection.title,
                  description: `Regenerate this section. Issues: ${qualityCheckResult.regenerationReason}`,
                },
              ],
            },
            researchData,
            userInput,
          );

          currentSection = regeneratedContent.sections[0];
          totalTokensUsed += regeneratedContent.totalTokensUsed;
        }
      }

      checkedSections.push(currentSection);
    }

    // Update blog content with checked sections
    blogContent = {
      sections: checkedSections,
      totalWordCount: checkedSections.reduce((sum, s) => sum + s.wordCount, 0),
      totalTokensUsed,
      totalGenerationTime: Date.now() - phaseStartTime,
    };

    return blogContent;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
