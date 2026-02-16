import { z } from "zod";

// userInputSchema
export const userInputSchema = z.object({
  topic: z.string().min(20).describe("The topic to research"),
  audience: z
    .enum(["beginner", "intermediate", "expert"])
    .describe("The audience for the blog")
    .default("beginner")
    .optional(),
  length: z
    .enum(["short", "medium", "long"])
    .describe("The length of the blog")
    .default("medium")
    .optional(),
  tone: z
    .enum(["formal", "informal", "technical"])
    .describe("The tone of the blog")
    .default("technical")
    .optional(),

  refrence_urls: z
    .array(z.string())
    .describe("The reference urls for the blog")
    .optional(),
});

// research data
export const SERPPage = z.object({
  url: z.string(),
  title: z.string(),
  h1: z.string(),
  h2s: z.array(z.string()),
  h3s: z.array(z.string()),
  wordCount: z.number(),
  angle: z.enum(["tutorial", "opinion", "documentation", "comparison"]),
  keyPoints: z.array(z.string()),
});

export const SERPAnalysis = z.object({
  topPages: z.array(SERPPage),
  saturationScore: z.number(), // 0-100, >80 = saturated
});

export const GapAnalysis = z.object({
  whatCompetitorsSay: z.array(z.string()),
  whatIsRepeated: z.array(z.string()),
  whatIsMissing: z.array(z.string()),
  whatIsShallow: z.array(z.string()),
});

export const QuestionMining = z.object({
  beginnerQuestions: z.array(z.string()),
  whyDoesThisBreak: z.array(z.string()),
  whenNotToUse: z.array(z.string()),
  realWorldConfusion: z.array(z.string()),
});

const ResearchData = z.object({
  topic: z.string(),
  serpAnalysis: SERPAnalysis,
  gapAnalysis: GapAnalysis,
  questionMining: QuestionMining,
  warnings: z.array(z.string()),
});

// research step schena
export const researchSchemaOutput = z.object({
  gap_questions: z.array(z.string()),
  copetitors_keywords: z.array(z.string()),
  top_keywords: z.array(z.string()),
  is_researched: z.boolean(),
  is_saturated: z.boolean(),
});

// Outline Generator types
export const OutlineSection = z.object({
  level: z.union([z.literal(1), z.literal(2)]),
  title: z.string(),
  description: z.string(),
  relatedQuestions: z.array(z.string()).optional(),
  shouldIncludeExample: z.boolean().optional(),
});

export const MandatorySections = z.object({
  howItWorks: z.boolean(),
  commonMistakes: z.boolean(),
  whenNotToUse: z.boolean(),
  realWorldExample: z.boolean(),
});

export const BlogOutlineStepOutputSchema = z.object({
  h1: z.string(),
  sections: z.array(OutlineSection),
  internalLinkSuggestions: z.array(z.string()),
  tradeOffsToDiscuss: z.array(z.string()),
  mandatorySections: MandatorySections,
});

export const generateOutlineInputSchema = z.object({
  reserchData: researchSchemaOutput,
  userInput: userInputSchema,
});

// content generation

const GeneratedSection = z.object({
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  title: z.string(),
  content: z.string(),
  wordCount: z.number(),
  tokensUsed: z.number(),
  generationTime: z.number(),
});

export const BlogContent = z.object({
  sections: z.array(GeneratedSection),
  totalWordCount: z.number(),
  totalTokensUsed: z.number(),
  totalGenerationTime: z.number(),
});

export const BlogContentInputSchema = z.object({
  outline: BlogOutlineStepOutputSchema,
  researchData: researchSchemaOutput,
  userInput: userInputSchema,
});

// ============================================================================
// Quality Checker Types
// ============================================================================

const QualityCheck = z.object({
  score: z.number(),
  passed: z.boolean(),
  details: z.string(),
});

export const QualityCheckOutputSchema = z.object({
  section: GeneratedSection,
  checks: z.object({
    similarity: QualityCheck,
    repetition: QualityCheck,
    clarity: QualityCheck,
    hallucination: QualityCheck,
  }),
  overallPassed: z.boolean(),
  regenerationNeeded: z.boolean(),
  regenerationReason: z.string().optional(),
});

// ============================================================================
// SEO Layer Types
// ============================================================================

export const InternalLink = z.object({
  anchor: z.string(),
  url: z.string(),
  context: z.string(),
});

export const FAQItem = z.object({
  question: z.string(),
  answer: z.string(),
});

export const ArticleSchema = z.object({
  headline: z.string(),
  description: z.string(),
  author: z.string(),
  datePublished: z.string(),
  wordCount: z.number(),
});

export const SEOMetadata = z.object({
  metaTitle: z.string().max(60), // ≤60 chars
  metaDescription: z.string().max(155), // ≤155 chars
  internalLinks: z.array(InternalLink),
  faqSchema: z.array(FAQItem),
  articleSchema: ArticleSchema,
});

// ============================================================================
// Output Formatter Types
// ============================================================================

export const BonusOutputs = z.object({
  tweetSummary: z.string(),
  newsletterVersion: z.string(),
  linkedinPost: z.string(),
});

export const SectionsCopyable = z.record(z.string(), z.string());

export const BlogOutput = z.object({
  markdown: z.string(),
  mdx: z.string(),
  html: z.string(),
  sectionsCopyable: SectionsCopyable,
  bonusOutputs: BonusOutputs,
  metadata: SEOMetadata,
});

// ============================================================================
// Orchestrator Types
// ============================================================================

export const GenerationLog = z.object({
  phase: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  duration: z.number(),
  tokensUsed: z.number(),
  cost: z.number(),
  status: z.enum(["success", "failed", "regenerated"]),
  details: z.string(),
});

export const BlogGenerationResult = z.object({
  output: BlogOutput,
  logs: z.array(GenerationLog),
  totalTokensUsed: z.number(),
  totalCost: z.number(),
  generationTime: z.number(),
});

// ============================================================================
// Type Exports (for TypeScript inference)
// ============================================================================
export type userInputType = z.infer<typeof userInputSchema>;
export type BlogOutlineType = z.infer<typeof BlogOutlineStepOutputSchema>;
export type BlogContentType = z.infer<typeof BlogContent>;
export type researchDataType = z.infer<typeof researchSchemaOutput>;
export type QualityCheckType = z.infer<typeof QualityCheckOutputSchema>;
export type generatedSectionType = z.infer<typeof GeneratedSection>;
export type GeneratedSection = z.infer<typeof GeneratedSection>;
export type QualityCheckResult = z.infer<typeof QualityCheckOutputSchema>;
export type QualityCheck = z.infer<typeof QualityCheck>;
export type ResearchData = z.infer<typeof ResearchData>;
export type UserInput = z.infer<typeof userInputSchema>;
export type SERPPageType = z.infer<typeof SERPPage>;
export type SERPAnalysisType = z.infer<typeof SERPAnalysis>;
export type GapAnalysisType = z.infer<typeof GapAnalysis>;
export type QuestionMiningType = z.infer<typeof QuestionMining>;
