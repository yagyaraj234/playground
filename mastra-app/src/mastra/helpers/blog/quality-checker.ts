import { z } from "zod";
import { Output } from "ai";
import { generateObjectResult, getGeminiModel } from "../../lib/model.util";

import type {
  QualityCheckResult,
  QualityCheck,
  GeneratedSection,
  ResearchData,
  UserInput,
} from "../../types/blog";

export class QualityChecker {
  /**
   * Checks quality of a generated section
   * @param section - The generated section to check
   * @param researchData - The research data for similarity comparison
   * @param validatedInput - The validated blog generation input
   * @returns QualityCheckResult with all checks and regeneration flag
   */
  async checkQuality(
    section: GeneratedSection,
    researchData: ResearchData,
    validatedInput: UserInput,
  ): Promise<QualityCheckResult> {
    // Run all quality checks in parallel
    const [similarity, repetition, clarity, hallucination] = await Promise.all([
      this.checkSimilarity(section, researchData),
      this.checkRepetition(section),
      this.checkClarity(section, validatedInput),
      this.checkHallucination(section),
    ]);

    // Determine if regeneration is needed
    const checks = { similarity, repetition, clarity, hallucination };
    const overallPassed =
      similarity.passed &&
      repetition.passed &&
      clarity.passed &&
      hallucination.passed;

    let regenerationNeeded = false;
    let regenerationReason: string | undefined;

    if (!similarity.passed) {
      regenerationNeeded = true;
      regenerationReason = `Similarity check failed: ${similarity.details}`;
    } else if (!repetition.passed) {
      regenerationNeeded = true;
      regenerationReason = `Repetition check failed: ${repetition.details}`;
    } else if (!clarity.passed) {
      regenerationNeeded = true;
      regenerationReason = `Clarity check failed: ${clarity.details}`;
    } else if (!hallucination.passed) {
      regenerationNeeded = true;
      regenerationReason = `Hallucination check failed: ${hallucination.details}`;
    }

    return {
      section,
      checks,
      overallPassed,
      regenerationNeeded,
      regenerationReason,
    };
  }

  /**
   * Checks similarity against SERP results
   * Flags if >70% similar to any competitor page
   */
  private async checkSimilarity(
    section: GeneratedSection,
    researchData: ResearchData,
  ): Promise<QualityCheck> {
    const model = await getGeminiModel();

    // Prepare competitor content summaries
    const competitorSummaries = researchData.serpAnalysis.topPages
      .map(
        (page) =>
          `URL: ${page.url}
Title: ${page.title}
Key Points: ${page.keyPoints.join(", ")}`,
      )
      .join("\n\n");

    const schema = Output.object({
      schema: z.object({
        similarityScore: z
          .number()
          .min(0)
          .max(100)
          .describe("Similarity score as percentage (0-100)"),
        isSimilar: z
          .boolean()
          .describe("Whether content is >70% similar to competitors"),
        explanation: z.string().describe("Explanation of similarity findings"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: `Analyze the similarity of this blog section to competitor content.

Section Title: ${section.title}
Section Content:
${section.content}

Competitor Content Summaries:
${competitorSummaries}

Determine:
1. Similarity score (0-100) - how much of this content is similar to competitors
2. Whether it's >70% similar (flag for regeneration)
3. Explanation of findings

Consider:
- Similar structure or outline
- Overlapping key points
- Similar examples or explanations
- Unique angles or perspectives

Be strict: if the content covers the same ground as competitors, mark it as similar.`,
    });

    const passed = !result.object.isSimilar;
    const details = `Similarity: ${result.object.similarityScore}%. ${result.object.explanation}`;

    return {
      score: result.object.similarityScore,
      passed,
      details,
    };
  }

  /**
   * Checks for repetition within the section
   * Flags if same phrase appears >2 times
   */
  private async checkRepetition(
    section: GeneratedSection,
  ): Promise<QualityCheck> {
    const model = await getGeminiModel();
    const schema = Output.object({
      schema: z.object({
        hasRepetition: z
          .boolean()
          .describe("Whether the section has problematic repetition"),
        repeatedPhrases: z
          .array(
            z.object({
              phrase: z.string(),
              count: z.number(),
            }),
          )
          .describe("Phrases that appear more than twice"),
        explanation: z.string().describe("Explanation of repetition findings"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: `Analyze this blog section for repetitive phrases.

Section Title: ${section.title}
Section Content:
${section.content}

Find:
1. Phrases that appear more than 2 times
2. Whether repetition is problematic
3. Explanation of findings

Consider:
- Exact phrase repetition
- Similar phrases with slight variations
- Repeated concepts or ideas
- Natural vs. awkward repetition

Flag as problematic if:
- Same phrase appears >2 times
- Repetition disrupts readability
- Repetition suggests poor writing quality`,
    });

    const passed = !result.object.hasRepetition;
    const repeatedPhrasesStr =
      result.object.repeatedPhrases.length > 0
        ? result.object.repeatedPhrases
            .map((p) => `"${p.phrase}" (${p.count}x)`)
            .join(", ")
        : "None";

    const details = `Repeated phrases: ${repeatedPhrasesStr}. ${result.object.explanation}`;

    return {
      score: result.object.hasRepetition ? 0 : 100,
      passed,
      details,
    };
  }

  /**
   * Checks clarity for the target audience
   * Ensures reading level is appropriate
   */
  private async checkClarity(
    section: GeneratedSection,
    validatedInput: UserInput,
  ): Promise<QualityCheck> {
    const model = await getGeminiModel();

    const audienceDescriptions = {
      beginner: "Complete beginners with no prior knowledge",
      intermediate: "Developers with some experience",
      expert: "Advanced developers with deep expertise",
    };

    const schema = Output.object({
      schema: z.object({
        clarityScore: z
          .number()
          .min(0)
          .max(100)
          .describe("Clarity score (0-100)"),
        isAppropriate: z
          .boolean()
          .describe("Whether clarity is appropriate for audience"),
        issues: z.array(z.string()).describe("Clarity issues found"),
        explanation: z.string().describe("Explanation of clarity assessment"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: `Assess the clarity of this blog section for the target audience.

Target Audience: ${validatedInput.audience} (${audienceDescriptions[UserInput.audience]})

Section Title: ${section.title}
Section Content:
${section.content}

Evaluate:
1. Clarity score (0-100)
2. Whether it's appropriate for the audience
3. Any clarity issues (jargon, complexity, etc.)
4. Explanation

Consider:
- Use of unexplained jargon
- Sentence complexity
- Paragraph length
- Logical flow
- Accessibility for the audience level

Flag as inappropriate if:
- Too technical for beginners
- Too simplistic for experts
- Unclear explanations
- Poor organization`,
    });

    const passed = result.object.isAppropriate;
    const issuesStr =
      result.object.issues.length > 0
        ? result.object.issues.join("; ")
        : "None";

    const details = `Clarity: ${result.object.clarityScore}/100. Issues: ${issuesStr}. ${result.object.explanation}`;

    return {
      score: result.object.clarityScore,
      passed,
      details,
    };
  }

  /**
   * Checks for hallucinations (fake APIs, wrong versions, false claims)
   */
  private async checkHallucination(
    section: GeneratedSection,
  ): Promise<QualityCheck> {
    const model = await getGeminiModel();

    const schema = Output.object({
      schema: z.object({
        hasHallucinations: z
          .boolean()
          .describe("Whether hallucinations were detected"),
        hallucinations: z
          .array(
            z.object({
              claim: z.string(),
              issue: z.string(),
            }),
          )
          .describe("Specific hallucinations found"),
        explanation: z
          .string()
          .describe("Explanation of hallucination findings"),
      }),
    });

    const result = await generateObjectResult({
      model,
      schema,
      prompt: `Check this blog section for hallucinations (false claims, fake APIs, wrong versions).

Section Title: ${section.title}
Section Content:
${section.content}

Look for:
1. Fake or non-existent APIs or libraries
2. Incorrect version numbers
3. False claims about functionality
4. Misattributed features
5. Incorrect syntax or examples

For each hallucination found, explain:
- The false claim
- Why it's incorrect
- What the correct information should be

Be thorough: hallucinations damage credibility.`,
    });

    const passed = !result.object.hasHallucinations;
    const hallucinationsStr =
      result.object.hallucinations.length > 0
        ? result.object.hallucinations
            .map((h: any) => `"${h.claim}" - ${h.issue}`)
            .join("; ")
        : "None detected";

    const details = `Hallucinations: ${hallucinationsStr}. ${result.object.explanation}`;

    return {
      score: result.object.hasHallucinations ? 0 : 100,
      passed,
      details,
    };
  }
}
