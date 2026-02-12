import { BLOG_AGENT } from "../agent-config";
import { firecrawlClient } from "../lib/firecrawl";

export class ResearchEngine {
  static async performResearch(topic: string) {
    try {
      // perform serp analysis
    } catch (e) {}
  }

  public static async searchWeb(topic: string, limit: number) {
    const results = await firecrawlClient.search(topic, {
      limit,
    });

    return results.web ?? [];
  }

  private static async performSERPAnalysis(topic: string) {
    // search top result
    const searchResults = await this.searchWeb(topic, BLOG_AGENT.search_limit);

    if (searchResults.length === 0) {
      throw new Error("No search results found");
    }
    const topPages = [];

    for (let i = 0; i < searchResults.length; i++) {
      try {
        const result = searchResults[i];
        if (!result.url) return;
        const content = await firecrawlClient.scrape(result.url, {
          scrapeOptions: { formats: ["markdown"] },
          timeout: 30000,
        });
      } catch (error) {}
    }
  }
}

const searchEngine = new ResearchEngine();
export default searchEngine;
