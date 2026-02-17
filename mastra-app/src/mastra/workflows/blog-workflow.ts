import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { research } from "../helpers/blog";
import {
  researchSchemaOutput,
  OutlineSection,
  BlogContent,
  BlogOutlineStepOutputSchema,
  QualityCheckOutputSchema,
  userInputSchema,
  BlogContentInputSchema,
  generateOutlineInputSchema,
} from "./blog-workflow/schema";
import { generateOutline } from "../helpers/blog/outline-generator";

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

const outlineStep = createStep({
  id: "blog-outline",
  description:
    "generate blog outlines for blog generation using research and userInput",
  inputSchema: generateOutlineInputSchema,
  outputSchema: BlogOutlineStepOutputSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }

    const result = await generateOutline(
      inputData.researchData,
      inputData.userInput,
    );
    return result;
  },
});

const contentStep = createStep({
  id: "content-generation",
  description:
    "generate content section by section using outline and researchData",
  inputSchema: BlogContentInputSchema,
  outputSchema: BlogContent,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }

    const result = await generateCon
    return {};
  },
});

const qualityCheck = createStep({
  id: "quality-check",
  description: "check generated content quality",
  outputSchema: QualityCheckOutputSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }
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
    if (!inputData) {
      throw new Error("Input data not found");
    }
    return {};
  },
});

const blogWorkflow = createWorkflow({
  id: "blog-workflow",
  inputSchema: userInputSchema,
  outputSchema: z.object({
    blog: z.string(),
  }),
})
  .then(researchStep)
  .then(outlineStep)
  .then(contentStep)
  .then(qualityCheck)
  .then(seoOptimize)
  .commit();

export default blogWorkflow;
