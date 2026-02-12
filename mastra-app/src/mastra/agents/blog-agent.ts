import { Agent } from "@mastra/core";
import { Memory } from "@mastra/memory";
import blogWorkflow from "../workflows/blog-workflow";
import { searchWeb } from "../tools/blog-tools";
import { BLOG_AGENT } from "../prompts/blog";

export const blogAgent = new Agent({
  id: "blog-agent",
  name: "Blog Agent",
  instructions: BLOG_AGENT,
  model: "google/gemini-2.5-flash",
  tools: {},
  workflows: { blogWorkflow },
  memory: new Memory(),
});
