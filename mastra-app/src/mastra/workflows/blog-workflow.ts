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
import { BlogOutput, SEOMetadata } from "../types/blog";
import { generateSEO } from "../helpers/blog/seo-metadata";
import { phaseFormatOutput } from "../helpers/blog/format-output";
import { OutlineStepResult, ResearchStepREsult } from "../helpers/response";

const contentResponse: any = {
  sections: [
    {
      level: 1,
      title: "Core Web Vitals Explained: A Simple Guide to LCP, CLS, and INP",
      content:
        "ever clicked a link and waited. and waited? or perhaps you've seen content suddenly jump around as you were about to click something? these frustrating experiences are more than annoying; they're key indicators google uses to measure how users perceive your website. understanding these technical signals is crucial for building a good user experience. this guide will introduce you to core web vitals, a set of specific metrics google uses to evaluate page experience. we'll break down each vital: largest contentful paint (LCP), cumulative layout shift (CLS), and interaction to next paint (INP), explaining them in simple, clear language without the jargon. by the end of this post, you'll gain a clear understanding of what these metrics are, why they're important for both your users and your site's visibility, and how to begin thinking about improving them. you'll learn how these technical measurements directly translate into a smoother, more reliable experience for everyone visiting your pages.",
      wordCount: 158,
      tokensUsed: 1518,
      generationTime: 7409,
    },
  ],
  totalWordCount: 158,
  totalTokensUsed: 16959,
  totalGenerationTime: 96964,
};

const seoResponse: any = {
  metaTitle: "Core Web Vitals Guide: LCP, CLS, INP Explained Simply",
  metaDescription:
    "Struggling with slow sites or content shifts? Master Core Web Vitals (LCP, CLS, INP) simply. Understand Google's key metrics to improve UX & SEO.",
  internalLinks: [
    {
      anchor: "your overall SEO strategy",
      url: "/blog/how-google-uses-core-web-vitals-for-ranking",
      context:
        "After the sentence 'these frustrating experiences are more than annoying; they're key', linking to how these metrics are crucial for search engine optimization and user retention.",
    },
    {
      anchor: "an in-depth look at Cumulative Layout Shift (CLS)",
      url: "/blog/understanding-and-fixing-cumulative-layout-shift",
      context:
        "Within the 'Understanding Core Web Vitals' section, when Cumulative Layout Shift (CLS) is first introduced or briefly defined, offering a dedicated resource for readers wanting more detail.",
    },
    {
      anchor: "tools for measuring and improving web performance",
      url: "/blog/top-tools-for-core-web-vitals-analysis",
      context:
        "After the general introduction of Core Web Vitals but before diving into the specifics of LCP, suggesting 'Before we dive into each metric, let's look at [link: tools for measuring and improving web performance] so you can audit your own site.'",
    },
  ],
  faqSchema: [
    {
      question:
        "What are the most effective performance monitoring tools for an intermediate developer to track Core Web Vitals beyond basic Lighthouse audits?",
      answer:
        "The provided blog content does not specify effective performance monitoring tools for tracking Core Web Vitals beyond basic Lighthouse audits.",
    },
    {
      question:
        "Can you provide a practical, prioritized checklist for an intermediate developer to begin optimizing an existing website's LCP, CLS, and INP?",
      answer:
        "The provided blog content does not contain a practical, prioritized checklist for optimizing an existing website's LCP, CLS, and INP.",
    },
    {
      question:
        "Why do common LCP optimization techniques like lazy loading sometimes lead to worse LCP scores, and what are the best practices to avoid this?",
      answer:
        "The provided blog content does not explain why lazy loading might worsen LCP scores or offer best practices to avoid this issue.",
    },
    {
      question:
        "What are the typical JavaScript execution patterns or third-party script integrations that most frequently cause high INP scores, even on well-optimized sites?",
      answer:
        "The provided blog content does not detail typical JavaScript execution patterns or third-party script integrations that frequently cause high INP scores.",
    },
    {
      question:
        "When should an intermediate developer prioritize other performance metrics over Core Web Vitals, especially for highly interactive applications or specific user journeys?",
      answer:
        "The provided blog content does not address when to prioritize other performance metrics over Core Web Vitals for highly interactive applications or specific user journeys.",
    },
  ],
  articleSchema: {
    headline: "Core Web Vitals Explained: A Simple Guide to LCP, CLS, and INP",
    description:
      "Struggling with slow sites or content shifts? Master Core Web Vitals (LCP, CLS, INP) simply. Understand Google's key metrics to improve UX & SEO.",
    author: "AI Blog Generator",
    datePublished: "2026-02-22",
    wordCount: 158,
  },
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
    // return OutlineStepResult;
    // return outLineResponse;
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
    // return contentResponse;

    const result = await phaseGenerateContent(
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
    // remove this return
    // return seoResponse;
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
    const result = await phaseFormatOutput(
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
