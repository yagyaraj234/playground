import z from "zod";

export const pageStructureSchema = z.object({
  h1: z.string().describe("The main H1 heading of the page"),
  h2s: z.array(z.string()).describe("Array of H2 headings found on the page"),
  h3s: z.array(z.string()).describe("Array of H3 headings found on the page"),
  wordCount: z.number().describe("Approximate word count of the page"),
  angle: z
    .enum(["tutorial", "opinion", "documentation", "comparison"])
    .describe("The content angle or type"),
  keyPoints: z.array(z.string()).describe("Key points or main topics covered"),
});

export const gapSchema = z.object({
  whatCompetitorsSay: z
    .array(z.string())
    .describe("Common themes all competitors mention"),
  whatIsRepeated: z
    .array(z.string())
    .describe("Repeated phrases or concepts across pages"),
  whatIsMissing: z
    .array(z.string())
    .describe("Important topics not covered or barely mentioned"),
  whatIsShallow: z
    .array(z.string())
    .describe("Topics covered but only superficially"),
});

export const questionMiningSchema = z.object({
  beginnerQuestions: z
    .array(z.string())
    .describe("Questions a beginner would ask"),
  whyDoesThisBreak: z
    .array(z.string())
    .describe("Questions about why things break or fail"),
  whenNotToUse: z
    .array(z.string())
    .describe("Questions about when NOT to use this"),
  realWorldConfusion: z
    .array(z.string())
    .describe("Real-world confusion points extracted from content"),
});
