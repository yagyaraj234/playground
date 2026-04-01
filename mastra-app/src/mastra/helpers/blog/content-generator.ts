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
import pino from "pino";
import {
  BLOG_FEW_SHOT_EXAMPLES,
  BLOG_WRITING_STYLE_GUIDE,
  BLOG_ANTI_SIMILARITY_GUIDE,
  BLOG_PROHIBITED_PHRASES,
} from "../../prompts/blog";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

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

    logger.info(
      { sectionTitle: introSection.title },
      "Generated intro section",
    );
    sections.push(introSection);
    totalWordCount += introSection.wordCount;
    totalTokensUsed += introSection.tokensUsed;
    totalGenerationTime += introSection.generationTime;

    logger.info("Generating H2 and H3 sections in parallel...");

    // Generate H2 and H3 sections in parallel
    const sectionPromises = outline.sections.map(async (outlineSection) => {
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

      const specific_instructions = `
      Follow Below Instruction Strictly \n
      
      ### Architecture / System Design

Explains how a system is built and why decisions were made.


Structure:
1. Problem we needed to solve
2. Constraints and requirements
3. Options considered
4. Architecture chosen (with diagram)
5. Trade-offs we accepted
6. Results and lessons


## Writing Rules for Developers

### Voice and Tone

| Do | Don't |
|----|-------|
| Be direct: "Use connection pooling" | "You might want to consider using..." |
| Admit trade-offs: "This adds complexity" | Pretend your solution is perfect |
| Use "we" for team decisions | "I single-handedly architected..." |
| Specific numbers: "reduced p99 from 800ms to 90ms" | "significantly improved performance" |
| Cite sources and benchmarks | Make unsourced claims |
| Acknowledge alternatives | Pretend yours is the only way |

### What Developers Hate


❌ "In today's fast-paced world of technology..." (filler)
❌ "As we all know..." (if we all know, why are you writing it?)
❌ "Simply do X" (nothing is simple if you're reading a tutorial)
❌ "It's easy to..." (dismissive of reader's experience)
❌ "Obviously..." (if it's obvious, don't write it)
❌ Marketing language in technical content
❌ Burying the lede under 3 paragraphs of context


### Code Examples

| Rule | Why |
|------|-----|
| Every code block must be runnable | Broken examples destroy trust |
| Show complete, working examples | Snippets without context are useless |
| Include language identifier in fenced blocks | Syntax highlighting |
| Show output/result after code | Reader verifies understanding |
| Use realistic variable names | 'calculateTotalRevenue' not 'foo' |
| Include error handling in examples | Real code handles errors |
| Pin dependency versions | "Works with React 18.2" not "React" |

Good code block format:


# What this code does (one line)
def calculate_retry_delay(attempt: int, base_delay: float = 1.0) -> float:
    """Exponential backoff with jitter."""
    delay = base_delay * (2 ** attempt)
    jitter = random.uniform(0, delay * 0.1)
    return delay + jitter

# Usage
delay = calculate_retry_delay(attempt=3)  # ~8.0-8.8 seconds

### Explanation Depth

| Audience Signal | Depth |
|----------------|-------|
| "Getting started with X" | Explain everything, assume no prior knowledge |
| "Advanced X patterns" | Skip basics, go deep on nuances |
| "X vs Y" | Assume familiarity with both, focus on differences |
| "How we built X" | Technical audience, can skip fundamentals |

**State your assumed audience level explicitly** at the start:

## Common Mistakes to Avoid

| Mistake | Problem | Fix |
|---------|---------|-----|
| No TL;DR | Busy devs leave before getting the point | 2-3 sentence summary at the top |
| Broken code examples | Destroys all credibility | Test every code block before publishing |
| No version pinning | Code breaks in 6 months | "Works with Node 20, React 18.2" |
| "Simply do X" | Dismissive, condescending | Remove "simply", "just", "easily" |
| No diagrams for architecture | Walls of text describing systems | One diagram > 500 words of description |
| Marketing tone | Developers instantly disengage | Direct, technical, honest |
| No trade-offs section | Reads as biased marketing | Always discuss downsides |
| Giant introduction before content | Readers bounce | Get to the point in 2-3 paragraphs |
| Unpinned dependencies | Tutorial breaks for future readers | Pin versions, note date written |
| No "Further Reading" | Dead end, no context | 3-5 links to deepen understanding |

`;

      const combined_prompt = prompt + " \n " + specific_instructions;
      let text = "";
      let usage: { totalTokens?: number } = { totalTokens: 0 };
      try {
        const { text: generatedText, usage: generatedUsage } =
          await generateText({
            model: google(CURRENT_MODEL),
            prompt: combined_prompt,
            temperature: 0.7,
          });
        text = generatedText;
        usage = generatedUsage;
      } catch (error) {
        logger.error(
          { error, sectionTitle: outlineSection.title },
          "Error generating section",
        );
      }

      const content = this.enforceStyleRules(text);
      const cleanedContent = this.removeFluff(content);

      return {
        level: outlineSection.level,
        title: outlineSection.title,
        content: cleanedContent,
        wordCount: this.countWords(cleanedContent),
        tokensUsed: usage?.totalTokens || 0,
        generationTime: Date.now() - sectionStartTime,
      } as GeneratedSection;
    });

    const generatedSections = await Promise.all(sectionPromises);
    logger.info(
      { count: generatedSections.length },
      "Parallel generation complete",
    );

    for (const section of generatedSections) {
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
      prompt: this.buildConclusionPrompt(outline, validatedInput, researchData),
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

    logger.info("Content generation finished successfully");

    return {
      sections,
      totalWordCount,
      totalTokensUsed,
      totalGenerationTime,
    };
  }

  /**
   * Regenerates a single section based on quality check feedback
   */
  async regenerateSection(
    section: GeneratedSection,
    qualityCheckResult: QualityCheckType,
  ): Promise<GeneratedSection> {
    const sectionStartTime = Date.now();
    const prompt = `Regenerate this section to fix the following issues:

Section: ${section.title}
Current content: ${section.content.substring(0, 500)}...

Issues to fix:
${qualityCheckResult.regenerationReason}

${BLOG_ANTI_SIMILARITY_GUIDE}

Regenerate the section by changing the framing, not just the wording.
Prefer one of these pivots if the content feels too similar:
- a narrower failure mode
- a debugging path
- a trade-off or limitation
- a concrete implementation nuance
- a contrarian but accurate takeaway

Regenerate the section addressing these issues.`;

    let text = "";
    let usage: { totalTokens?: number } = { totalTokens: 0 };
    try {
      const { text: generatedText, usage: generatedUsage } = await generateText(
        {
          model: google(CURRENT_MODEL),
          prompt,
          temperature: 0.7,
        },
      );
      text = generatedText;
      usage = generatedUsage;
    } catch (error) {
      logger.error(
        { error, sectionTitle: section.title },
        "Error regenerating section",
      );
    }

    const content = this.enforceStyleRules(text);
    const cleanedContent = this.removeFluff(content);

    return {
      level: section.level,
      title: section.title,
      content: cleanedContent,
      wordCount: this.countWords(cleanedContent),
      tokensUsed: usage?.totalTokens || 0,
      generationTime: Date.now() - sectionStartTime,
    } as GeneratedSection;
  }

  /**
   * Builds the prompt for intro section (H1)
   */
  private buildIntroPrompt(
    outline: BlogOutline,
    validatedInput: ValidatedInput,
    researchData: ResearchData,
  ): string {
    const uniquenessBrief = this.buildUniquenessBrief(researchData);

    return `Write an engaging introduction for a blog post about "${validatedInput.topic}".

Title: ${outline.h1}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

${BLOG_WRITING_STYLE_GUIDE}

${BLOG_FEW_SHOT_EXAMPLES}

${uniquenessBrief}

${BLOG_ANTI_SIMILARITY_GUIDE}

Avoid these phrases in the final article:
${BLOG_PROHIBITED_PHRASES.map((phrase) => `- ${phrase}`).join("\n")}

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
    const uniquenessBrief = this.buildUniquenessBrief(researchData);
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

${BLOG_WRITING_STYLE_GUIDE}

${BLOG_FEW_SHOT_EXAMPLES}

${uniquenessBrief}

${BLOG_ANTI_SIMILARITY_GUIDE}

Avoid these phrases in the final article:
${BLOG_PROHIBITED_PHRASES.map((phrase) => `- ${phrase}`).join("\n")}

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
- Don't Add Intro hook like ('Have you ever landed on a website only to find it frustratingly slow to load, or seen text and buttons jump around as you're about to click? These common, annoying experiences are exactly what google's core web vitals are designed to measure and improve. core web vitals are a set of three specific metrics that evaluate your website','"Have you ever landed on a website only to wait for content to appear, or tried to click something and the page suddenly')

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
    const uniquenessBrief = this.buildUniquenessBrief(researchData);
    return `Write a subsection for a blog post about "${validatedInput.topic}".

Subsection Title: ${section.title}
Subsection Description: ${section.description}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

${BLOG_WRITING_STYLE_GUIDE}

${BLOG_FEW_SHOT_EXAMPLES}

${uniquenessBrief}

${BLOG_ANTI_SIMILARITY_GUIDE}

Avoid these phrases in the final article:
${BLOG_PROHIBITED_PHRASES.map((phrase) => `- ${phrase}`).join("\n")}

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
- Don't Add Intro hook like ('Have you ever landed on a website only to find it frustratingly slow to load, or seen text and buttons jump around as you're about to click? These common, annoying experiences are exactly what google's core web vitals are designed to measure and improve. core web vitals are a set of three specific metrics that evaluate your website','"Have you ever landed on a website only to wait for content to appear, or tried to click something and the page suddenly')

Write the subsection now:`;
  }

  /**
   * Builds the prompt for conclusion section
   */
  private buildConclusionPrompt(
    outline: BlogOutline,
    validatedInput: ValidatedInput,
    researchData: ResearchData,
  ): string {
    const uniquenessBrief = this.buildUniquenessBrief(researchData);

    const keyPoints = outline.sections
      .filter((s) => s.level === 2)
      .map((s) => s.title)
      ?.slice(0, 3);

    return `Write a conclusion for a blog post about "${validatedInput.topic}".

Main Points Covered:
${keyPoints.map((p) => `- ${p}`).join("\n")}

Target Audience: ${validatedInput.audience}
Tone: ${validatedInput.tone}

${BLOG_WRITING_STYLE_GUIDE}

${BLOG_FEW_SHOT_EXAMPLES}

${uniquenessBrief}

${BLOG_ANTI_SIMILARITY_GUIDE}

Avoid these phrases in the final article:
${BLOG_PROHIBITED_PHRASES.map((phrase) => `- ${phrase}`).join("\n")}

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

    // Remove banned phrases that sound too formal or foreign
    for (const phrase of BLOG_PROHIBITED_PHRASES) {
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`\\b${escaped}\\b`, "gi");
      result = result.replace(pattern, "");
    }

    // Prefer simple language replacements
    result = result.replace(/\butilize\b/gi, "use");
    result = result.replace(/\bapproximately\b/gi, "about");
    result = result.replace(/\btherefore\b/gi, "so");
    result = result.replace(/\bhowever\b/gi, "but");
    result = result.replace(/\bmoreover\b/gi, "also");

    // Clean up extra spaces created by buzzword removal
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }

  /**
   * Builds a compact brief that pushes the model toward a less generic angle.
   */
  private buildUniquenessBrief(researchData: ResearchData): string {
    const topPages = researchData?.serpAnalysis?.topPages ?? [];
    const repeatedThemes = researchData?.gapAnalysis?.whatIsRepeated ?? [];
    const missingAngles = researchData?.gapAnalysis?.whatIsMissing ?? [];
    const sharpQuestions = researchData?.questionMining?.whyDoesThisBreak ?? [];

    const competitorAngles = topPages
      ?.slice(0, 3)
      .map((page) => page.angle)
      .join(", ");

    return `
## Uniqueness Brief

Do not mirror the competitor structure too closely.

Competitor angles: ${competitorAngles || "unknown"}

Common themes to avoid:
${
  repeatedThemes?.slice(0, 3).length > 0
    ? repeatedThemes
        ?.slice(0, 3)
        .map((item) => `- ${item}`)
        .join("\n")
    : "- none provided"
}

Angles to emphasize instead:
${
  missingAngles?.slice(0, 3).length > 0
    ? missingAngles
        ?.slice(0, 3)
        .map((item) => `- ${item}`)
        .join("\n")
    : "- a sharper, more practical angle than the competitors"
}

Questions to answer with specificity:
${
  sharpQuestions?.slice(0, 2).length > 0
    ? sharpQuestions
        ?.slice(0, 2)
        .map((item) => `- ${item}`)
        .join("\n")
    : "- why this fails in real projects and what people usually miss"
}

Requirement: give the article a distinct framing, one concrete example, and one opinionated takeaway that is not just a rewording of common SERP content.
`;
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

export async function generateContent(
  outline: BlogOutline,
  researchData: ResearchData,
  userInput: UserInput,
): Promise<BlogContent> {
  const phaseStartTime = Date.now();
  let totalTokensUsed = 0;
  let regenerationCount = 0;

  logger.info(
    { topic: userInput.topic },
    "Starting content generation pipeline",
  );

  try {
    const contentGenerator = new ContentGenerator();
    const qualityChecker = new QualityChecker();

    // Generate initial content
    let blogContent = await contentGenerator.generateContent(
      outline,
      researchData,
      userInput,
    );

    totalTokensUsed += blogContent.totalTokensUsed;

    // Check quality of each section and regenerate if needed in parallel
    const sectionPromises = blogContent.sections.map(async (section) => {
      let currentSection = section;
      let attempts = 0;
      let sectionTokensUsed = 0;
      let sectionRegenerationCount = 0;
      let qualityCheckResult: QualityCheckType | null = null;

      logger.info(
        { sectionTitle: currentSection.title },
        "Starting quality checks for section",
      );

      // Try up to 3 times to get a section that passes quality checks
      while (attempts < 3) {
        qualityCheckResult = await qualityChecker.checkQuality(
          currentSection,
          researchData,
          userInput,
        );

        if (qualityCheckResult?.overallPassed) {
          logger.info(
            { sectionTitle: currentSection.title, attempts },
            "Section passed quality checks",
          );
          break;
        }

        // Regenerate the section
        attempts++;
        sectionRegenerationCount++;
        logger.warn(
          {
            sectionTitle: currentSection.title,
            attempts,
            reason: qualityCheckResult?.regenerationReason,
          },
          "Section failed quality checks, regenerating",
        );

        if (attempts < 3) {
          // Regenerate using ContentGenerator
          currentSection = await contentGenerator.regenerateSection(
            currentSection,
            qualityCheckResult,
          );

          sectionTokensUsed += currentSection.tokensUsed;
        }
      }

      return {
        section: currentSection,
        tokensUsed: sectionTokensUsed,
        regenerationCount: sectionRegenerationCount,
      };
    });

    const qualityCheckedResults = await Promise.all(sectionPromises);

    const checkedSections = qualityCheckedResults.map((result) => {
      totalTokensUsed += result.tokensUsed;
      regenerationCount += result.regenerationCount;
      return result.section;
    });

    // Update blog content with checked sections
    blogContent = {
      sections: checkedSections,
      totalWordCount: checkedSections.reduce((sum, s) => sum + s.wordCount, 0),
      totalTokensUsed,
      totalGenerationTime: Date.now() - phaseStartTime,
    };

    logger.info(
      { totalTokensUsed, regenerationCount },
      "Content generation pipeline completed",
    );
    return blogContent;
  } catch (error) {
    logger.error({ error }, "Error in content generation pipeline");
    throw error;
  }
}
