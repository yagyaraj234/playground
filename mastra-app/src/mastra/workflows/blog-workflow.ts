import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { searchWeb } from "../tools/blog-tools";

//  this topic will reserch find gaps quation mining,
//  copetitors keyword, top keywords for top 10 results

export const researchSchemaOutput = z.object({
  gap_questions: z.array(z.string()),
  copetitors_keywords: z.array(z.string()),
  top_keywords: z.array(z.string()),
  is_researched: z.boolean(),
  is_saturated: z.boolean(),
});

const researchStep = createStep({
  id: "research-step",
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

    const result = await searchWeb({ topic });
    return result;
  },
});

const structureStep = createStep({
  id: "structure-step",
  description: "define a blog structure sections",
});

const blogWorkflow = createWorkflow({
  id: "blog-workflow",
  inputSchema: z.object({
    topic: z.string().min(40).describe("The topic to research"),
    audience: z
      .enum(["beginner", "intermediate", "expert"])
      .describe("The audience for the blog"),
    length: z
      .enum(["short", "medium", "long"])
      .describe("The length of the blog"),
    tone: z
      .enum(["formal", "informal", "technical"])
      .describe("The tone of the blog"),

    refrence_urls: z
      .array(z.string())
      .describe("The reference urls for the blog")
      .optional(),
  }),
  outputSchema: z.object({
    blog: z.string(),
  }),
}).then(researchStep);

export default blogWorkflow;
