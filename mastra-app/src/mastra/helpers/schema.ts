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
