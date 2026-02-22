import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

import {
  researchSchemaOutput,
  BlogContent,
  BlogOutlineStepOutputSchema,
  userInputSchema,
  BlogOutput,
  SEOMetadata,
} from "../types/blog";

import {
  research,
  generateContent,
  generateOutline,
  formatOutput,
  generateSEO,
} from "../helpers/blog";

const researchStep = createStep({
  id: "research",
  description: "research about topic and prepare a outline",
  inputSchema: userInputSchema,
  outputSchema: researchSchemaOutput,
  stateSchema: z.object({
    userInput: userInputSchema,
  }),
  execute: async ({ inputData, setState }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }
    const { topic } = inputData;
    await setState({ userInput: inputData });

    // return ResearchStepREsult;

    const result = await research(topic);
    return result;
  },
});

const outlineStep = createStep({
  id: "outline",
  description:
    "generate blog outlines for blog generation using research and userInput",
  outputSchema: BlogOutlineStepOutputSchema,
  execute: async ({ getStepResult, state }) => {
    const researchData = getStepResult("research");

    if (!state.userInput || !researchData) {
      throw new Error("Input data not found");
    }
    const result = await generateOutline(researchData, state.userInput);
    return result;
  },
});

const contentStep = createStep({
  id: "content",
  description:
    "generate content section by section using outline and researchData",
  outputSchema: BlogContent,
  execute: async ({ inputData, getStepResult, state }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }
    const outline = getStepResult("outline");
    const researchData = getStepResult("research");
    const result = await generateContent(
      outline,
      researchData,
      state.userInput,
    );
    return result;
  },
});

const seoOptimize = createStep({
  id: "seo",
  description: "this step is to optimize blog content for SEO",
  outputSchema: SEOMetadata,
  execute: async ({ inputData, getStepResult, state }) => {
    const researchData = getStepResult("research");
    const outline = getStepResult("outline");
    const blogContent = getStepResult("content");
    if (!inputData || !outline || !researchData || !blogContent) {
      throw new Error("Invalid Input");
    }
    const result = await generateSEO(
      blogContent,
      outline,
      researchData,
      state.userInput,
    );

    return result;
  },
});

const formatResult = createStep({
  id: "formatted-content",
  description: "this step is to format blog content",
  outputSchema: BlogOutput,
  execute: async ({ getStepResult, state }) => {
    const blogContent = getStepResult("content");
    const seoMetadata = getStepResult("seo");

    if (!blogContent) {
      throw new Error("Blog content not found");
    }
    const result = await formatOutput(
      blogContent,
      seoMetadata,
      state.userInput,
    );
    return result;
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
  .then(seoOptimize)
  .then(formatResult)
  .commit();

export default blogWorkflow;
