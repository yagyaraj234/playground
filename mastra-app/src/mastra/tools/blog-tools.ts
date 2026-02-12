import { z } from "zod";
import Firecrawl from "@mendable/firecrawl-js";
import { researchSchemaOutput } from "../workflows/blog-workflow";
const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
import { BLOG_AGENT } from "../agent-config";
const researchSchema = z.object({
  topic: z.string().describe("The topic to research"),
});
type ResearchInput = z.infer<typeof researchSchema>;

const researchTool = (inputData: ResearchInput) => {};

const scrapeWebsiteSchema = z.object({
  urls: z.array(z.string()).describe("The urls to scrape"),
});
type ScrapeWebsiteInput = z.infer<typeof scrapeWebsiteSchema>;

const scrapeWebsiteTool = async (inputData: ScrapeWebsiteInput) => {
  const doc = await firecrawl.scrape("https://firecrawl.dev", {
    formats: ["markdown", "html"],
  });
  console.log(doc);
};

//  gap_questions: z.array(z.string()),
//   copetitors_keywords: z.array(z.string()),
//   top_keywords: z.array(z.string()),
//   is_researched: z.boolean(),
//   is_saturated: z.boolean(),



export const 

export const searchWeb = async ({
  topic,
}: {
  topic: string;
}): Promise<z.infer<typeof researchSchemaOutput>> => {
  const response = await firecrawl.search(topic, {
    limit: parseInt(BLOG_AGENT.search_limit),
    scrapeOptions: { formats: ["markdown"] },
  });

  if (!response.web) {
    searchWeb({ topic });
  }


  const topPages=[]

  debugger;
  const result = {
    gap_questions: ["fdsjknfd"],
    copetitors_keywords: ["fsdjkfd"],
    top_keywords: ["mnfdd"],
    is_researched: true,
    is_saturated: false,
  };
  return result;
};
