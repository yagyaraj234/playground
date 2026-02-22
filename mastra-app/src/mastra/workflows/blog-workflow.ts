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
import { phaseGenerateContent } from "../helpers/blog/content-generator";

const response: any = {
  topic: "Complete Guide to Core Web Vitals (LCP, CLS, INP Explained Simply)",
  serpAnalysis: {
    topPages: [
      {
        url: "https://medium.com/@ignatovich.dm/a-quick-guide-to-core-web-vitals-96ee4d8c1dfe",
        title: "A Quick Guide to Core Web Vitals",
        h1: "A Quick Guide to Core Web Vitals",
        h2s: [
          "Why Performance Metrics Matter",
          "Understanding Core Web Vitals: The Restaurant Analogy",
        ],
        h3s: ["👉 Largest Contentful Paint (LCP)"],
        wordCount: 360,
        angle: "tutorial",
        keyPoints: [
          "The importance of web performance metrics for user experience, SEO, conversion rates, and accessibility.",
          "An analogy-based explanation of Core Web Vitals using a restaurant scenario.",
          "A detailed breakdown of Largest Contentful Paint (LCP), including its definition, impact, and common code issues with optimization examples.",
        ],
      },
    ],
    saturationScore: 0,
  },
  gapAnalysis: {
    h1: "A Quick Guide to Core Web Vitals",
    h2s: [
      "Why Performance Metrics Matter",
      "Understanding Core Web Vitals: The Restaurant Analogy",
    ],
    h3s: [],
    wordCount: 1200,
    angle: "tutorial",
    keyPoints: [
      "The importance of web performance metrics for user experience, SEO, conversion rates, and accessibility.",
      "An analogy-based explanation of Core Web Vitals using a restaurant scenario.",
      "A detailed breakdown of Largest Contentful Paint (LCP), including its definition, impact, and common code issues with optimization examples.",
    ],
  },
  questionMining: {
    beginnerQuestions: [
      "What are the most effective performance monitoring tools for an intermediate developer to track Core Web Vitals beyond basic Lighthouse audits?",
      "Can you provide a practical, prioritized checklist for an intermediate developer to begin optimizing an existing website's LCP, CLS, and INP?",
      "How do Core Web Vitals influence SEO rankings and user engagement from a developer's perspective, and how can I demonstrate this impact?",
    ],
    whyDoesThisBreak: [
      "Why do common LCP optimization techniques like lazy loading sometimes lead to worse LCP scores, and what are the best practices to avoid this?",
      "What are the typical JavaScript execution patterns or third-party script integrations that most frequently cause high INP scores, even on well-optimized sites?",
      "Beyond obvious layout shifts, what subtle CSS changes or dynamic content injections are common culprits for unexpected CLS increases?",
      "My Core Web Vitals scores fluctuate significantly across different user devices and network conditions; what diagnostic approaches should I use to pinpoint the underlying causes?",
    ],
    whenNotToUse: [
      "When should an intermediate developer prioritize other performance metrics over Core Web Vitals, especially for highly interactive applications or specific user journeys?",
      "Are there scenarios where aggressive preloading or render-blocking resource optimization for LCP can negatively impact other crucial performance aspects or user experience?",
      "What are the limitations of Core Web Vitals as a sole measure of user experience, and when might a holistic performance strategy need to incorporate additional metrics?",
    ],
    realWorldConfusion: [
      'How does the "restaurant analogy" for Core Web Vitals practically guide the debugging process for complex LCP or INP issues in a real-world web application?',
      "What are the specific challenges and common pitfalls when trying to identify and optimize the true LCP element in pages with dynamic content or A/B testing variations?",
      "How can I effectively communicate the business impact of Core Web Vitals improvements to non-technical stakeholders, considering the nuances of user experience, SEO, and conversions?",
      "Given that Core Web Vitals are based on field data, what are the most common reasons for a disconnect between local lab test results and actual user experience data (CrUX) for an intermediate developer?",
    ],
  },
  warnings: [],
};
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
    console.log("input", inputData);
    await setState({ userInput: inputData });
    // return response;

    const result = await research(topic);
    return result;
  },
});

const outlineStep = createStep({
  id: "outline",
  description:
    "generate blog outlines for blog generation using research and userInput",
  outputSchema: BlogOutlineStepOutputSchema,
  execute: async ({ inputData, getStepResult, state }) => {
    console.log("inputData", inputData, state, getStepResult("research"));

    const researchData = getStepResult("research");

    if (!state.userInput || !researchData) {
      throw new Error("Input data not found");
    }
    const result = await generateOutline(researchData, state.userInput);
    return result;
  },
});

const contentStep = createStep({
  id: "content-generation",
  description:
    "generate content section by section using outline and researchData",
  inputSchema: BlogContentInputSchema,
  outputSchema: BlogContent,
  execute: async ({ inputData, getStepResult, state }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }

    const result = await phaseGenerateContent(
      inputData.outline,
      getStepResult("research"),
      state.userInput,
    );
    return result;
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
