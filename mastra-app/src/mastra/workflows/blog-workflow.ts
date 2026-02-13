import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { searchWeb } from "../tools/blog-tools";
import { research } from "../helpers/blog";
import { create } from "node:domain";

//  this topic will reserch find gaps quation mining,
//  copetitors keyword, top keywords for top 10 results

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

export const BlogOutline = z.object({
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

const researchStep = createStep({
  id: "research",
  description: "research about topic and prepare a outline",
  inputSchema: z.object({
    topic: z.string().describe("the topic to research about"),
  }),

  outputSchema: researchSchemaOutput,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }
    const { topic } = inputData;

    const result = await research(topic);
    return result;
  },
});

const generateOutlineStep = createStep({
  id: "blog-outline",
  description:
    "generate blog outlines for blog generation using research and userInput",
  inputSchema: z.object({
    researchData: researchSchemaOutput,
    topic: z.string(),
  }),
  execute: async ({ inputData }) => {
    return {};
  },
});

const generateContentStep = createStep({
  id: "content-generation",
  description:
    "generate content section by section using outline and researchData",
  inputSchema: z.object({
    outline: OutlineSection,
    researchData: researchSchemaOutput,
    userInput: z
      .string()
      .optional()
      .describe("user input to guide the content"),
  }),
  execute: async ({ inputData }) => {
    return {};
  },
});

const seoOptimize = createStep({
  id: "seo-optimized",
  description: "",
  inputSchema: z.object({
    blogContent: BlogContent,
    outline: OutlineSection,
    researchData: researchSchemaOutput,
    userInput: z
      .string()
      .optional()
      .describe("user input to guide the content"),
  }),
  execute: async ({ inputData }) => {
    return {};
  },
});

const blogWorkflow = createWorkflow({
  id: "blog-workflow",
  inputSchema: z.object({
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
  }),
  outputSchema: z.object({
    blog: z.string(),
  }),
})
  .then(researchStep)
  .then(generateOutlineStep)
  .then(generateContentStep)
  // .then(seoOptimize)
  .commit();

export default blogWorkflow;
