import { z } from "zod";
import type {
  BlogOutlineType,
  ResearchData,
  UserInput,
  OutlineSection,
  MandatorySections,
} from "../../types/blog";
import { Output } from "ai";
import { generateObjectResult } from "../../lib/model.util";
import { CURRENT_PROVIDER, getCurrentModel } from "../../lib/model-config";

export class OutlineGenerator {
  static async generateOutline(
    researchData: ResearchData,
    userInput: UserInput,               
  ): Promise<BlogOutlineType> {
    const model = await getCurrentModel(CURRENT_PROVIDER);

    // Prepare research summary for outline generation
    const researchSummary = this.prepareResearchSummary(researchData);

    // Define the schema for outline generation
    const outlineSectionSchema = z.object({
      level: z.enum(["2", "3"]).describe("Heading level: 2 for H2, 3 for H3"),
      title: z.string().describe("Section title"),
      description: z
        .string()
        .describe("Brief description of what this section covers"),
      relatedQuestions: z
        .array(z.string())
        .optional()
        .describe("Related questions this section answers"),
      shouldIncludeExample: z
        .boolean()
        .optional()
        .describe("Whether this section should include a code example"),
    });

    const schema = Output.object({
      schema: z.object({
        h1: z.string().describe("Main H1 heading for the blog"),
        sections: z
          .array(outlineSectionSchema)
          .describe("Array of H2 and H3 sections"),
        internalLinkSuggestions: z
          .array(z.string())
          .describe("Suggested internal links to include"),
        tradeOffsToDiscuss: z
          .array(z.string())
          .describe("Trade-offs or considerations to discuss"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: this.buildOutlinePrompt(researchData, userInput, researchSummary),
    });

    // Convert section levels from string to number
    const sections: OutlineSection[] = result.sections.map((section: any) => ({
      level: parseInt(section.level) as 2 | 3,
      title: section.title,
      description: section.description,
      relatedQuestions: section.relatedQuestions,
      shouldIncludeExample: section.shouldIncludeExample,
    }));

    // Verify mandatory sections are present
    const mandatorySections = this.verifyMandatorySections(sections);

    // Verify no filler sections
    this.verifyNoFillerSections(sections);

    return {
      h1: result.h1,
      sections,
      internalLinkSuggestions: result.internalLinkSuggestions,
      tradeOffsToDiscuss: result.tradeOffsToDiscuss,
      mandatorySections,
    };
  }

  /**
   * Prepares a summary of research data for the outline prompt
   */
  private static prepareResearchSummary(researchData: ResearchData): string {
    const { serpAnalysis, gapAnalysis, questionMining } = researchData;

    // Get top competitor headings
    const topPages = serpAnalysis?.topPages ?? [];
    const topHeadings = topPages
      .slice(0, 3)
      .flatMap((page) => [page.h1, ...(page.h2s ?? []).slice(0, 3)])
      .filter((h) => h && h.length > 0)
      .slice(0, 10);

    // Get gaps and questions
    const gaps = [
      ...(gapAnalysis?.whatIsMissing ?? []).slice(0, 2),
      ...(gapAnalysis?.whatIsShallow ?? []).slice(0, 2),
    ];

    const questions = [
      ...(questionMining?.beginnerQuestions ?? []).slice(0, 2),
      ...(questionMining?.whyDoesThisBreak ?? []).slice(0, 2),
      ...(questionMining?.whenNotToUse ?? []).slice(0, 2),
    ];

    return `
Competitor Headings:
${topHeadings.map((h) => `- ${h}`).join("\n")}

Content Gaps to Address:
${gaps.map((g) => `- ${g}`).join("\n")}

User Questions to Answer:
${questions.map((q) => `- ${q}`).join("\n")}

Saturation Score: ${serpAnalysis?.saturationScore ?? 0}%
`;
  }

  /**
   * Builds the prompt for outline generation
   */
  private static buildOutlinePrompt(
    researchData: ResearchData,
    userInput: UserInput,
    researchSummary: string,
  ): string {
    return `Create a detailed blog outline for the topic: "${userInput.topic}"

Target Audience: ${userInput.audience}
Content Intent: ${userInput.intent}
Tone: ${userInput.tone}
Target Length: ${userInput.length} words

${researchSummary}

REQUIREMENTS:
1. Create exactly ONE H1 heading (the main title)
2. Create multiple H2 sections for core concepts
3. Create H3 subsections for depth, examples, and pitfalls
4. MUST include these mandatory sections (as H2s):
   - "How It Works" or "How [Topic] Works" (explain internals/mechanics)
   - "Common Mistakes" or "Common Pitfalls" (what goes wrong)
   - "When NOT to Use" or "When to Avoid" (limitations/alternatives)
   - "Real-World Example" or "Practical Example" (concrete use case)

5. MUST EXCLUDE these filler sections:
   - "Benefits of [Topic]"
   - "Why [Topic] is Important"
   - "Future of [Topic]"
   - "Conclusion" (save for end)
   - "Introduction" (save for beginning)

6. Include internal link suggestions (3-5 related topics)
7. Include trade-offs or considerations to discuss (2-3 items)
8. For each section, provide:
   - Clear title
   - Brief description of content
   - Related questions it answers (if applicable)
   - Whether it should include a code example

STRUCTURE GUIDELINES:
- Start with an engaging H1
- Group related H2s logically
- Use H3s to break down complex H2s
- Ensure flow from basic to advanced concepts
- Include practical examples throughout
- End with actionable takeaways

Generate the outline now:`;
  }

  /**
   * Verifies that all mandatory sections are present
   */
  private static verifyMandatorySections(
    sections: OutlineSection[],
  ): MandatorySections {
    const sectionTitles = sections.map((s) => s.title.toLowerCase());

    const mandatorySections: MandatorySections = {
      howItWorks: sectionTitles.some(
        (t) =>
          t.includes("how it works") ||
          t.includes("how") ||
          t.includes("internals") ||
          t.includes("mechanics"),
      ),
      commonMistakes: sectionTitles.some(
        (t) =>
          t.includes("common mistake") ||
          t.includes("pitfall") ||
          t.includes("wrong") ||
          t.includes("error"),
      ),
      whenNotToUse: sectionTitles.some(
        (t) =>
          t.includes("when not") ||
          t.includes("when to avoid") ||
          t.includes("limitation") ||
          t.includes("alternative"),
      ),
      realWorldExample: sectionTitles.some(
        (t) =>
          t.includes("real-world") ||
          t.includes("practical") ||
          t.includes("example") ||
          t.includes("use case"),
      ),
    };

    return mandatorySections;
  }

  /**
   * Verifies that no filler sections are present
   */
  private static verifyNoFillerSections(sections: OutlineSection[]): void {
    const fillerPatterns = [
      /benefits\s+of/i,
      /why\s+.*\s+is\s+important/i,
      /future\s+of/i,
      /^conclusion$/i,
      /^introduction$/i,
    ];

    for (const section of sections) {
      for (const pattern of fillerPatterns) {
        if (pattern.test(section.title)) {
          throw new Error(
            `Filler section detected: "${section.title}". Remove filler sections like "Benefits of", "Why is it important", "Future of", etc.`,
          );
        }
      }
    }
  }
}

export async function generateOutline(
  researchData: ResearchData,
  userInput: UserInput,
) {
  const phaseStartTime = Date.now();
  try {
    // const outlineGenerator = new OutlineGenerator();
    const outline = await OutlineGenerator.generateOutline(
      researchData,
      userInput,
    );

    const phaseDuration = Date.now() - phaseStartTime;
    const tokensUsed = 0; // Estimate based on outline complexity
    // const cost = this.estimateCost(tokensUsed);

    // this.logPhase(
    //   "outline-generation",
    //   phaseDuration,
    //   tokensUsed,
    //   "success",
    //   `Outline generated with ${outline.sections.length} sections. H1: "${outline.h1}". Mandatory sections: ${Object.values(outline.mandatorySections).filter((v) => v).length}/4`,
    // );

    // this.totalTokensUsed += tokensUsed;
    // this.totalCost += cost;

    return outline;
  } catch (error) {
    // this.logPhase(
    //   "outline-generation",
    //   Date.now() - phaseStartTime,
    //   0,
    //   "failed",
    //   `Outline generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    // );
    throw error;
  }
}
