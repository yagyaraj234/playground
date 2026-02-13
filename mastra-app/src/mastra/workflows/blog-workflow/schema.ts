import { z } from "zod";

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

// content generation

export const GeneratedSection = z.object({
  level: 1 | 2 | 3, // H1, H2, H3
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

// ============================================================================
// Quality Checker Types
// ============================================================================

export const QualityCheck = z.object({
  score: z.number(),
  passed: z.boolean(),
  details: z.string(),
});

const QualityCheckSchema = z.object({
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

export type InternalLinkType = z.infer<typeof InternalLink>;
export type FAQItemType = z.infer<typeof FAQItem>;
export type ArticleSchemaType = z.infer<typeof ArticleSchema>;
export type SEOMetadataType = z.infer<typeof SEOMetadata>;
export type BonusOutputsType = z.infer<typeof BonusOutputs>;
export type SectionsCopyableType = z.infer<typeof SectionsCopyable>;
export type BlogOutputType = z.infer<typeof BlogOutput>;
export type GenerationLogType = z.infer<typeof GenerationLog>;
export type BlogGenerationResultType = z.infer<typeof BlogGenerationResult>;
