import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { research } from "../helpers/blog";
import {
  researchSchemaOutput,
  OutlineSection,
  BlogContent,
  BlogOutlineStepOutputSchema,
} from "./blog-workflow/schema";

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
  outputSchema: BlogOutlineStepOutputSchema,
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
  // outputSchema: BlogContent,
  execute: async ({ inputData }) => {
    return {};
  },
});

// const qualityCheck = createStep({
//   id: "quality-check",
//   description: "check generated content quality",
// });

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
