import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";

// local
import { firecrawlClient } from "../lib/firecrawl";
import { SearchWebResponse } from "./types";
import { pageStructureSchema, questionMiningSchema } from "./schema";
import {
  BlogOutlineType,
  BlogContentType,
  researchDataType,
  userInputType,
  QualityCheckType,
} from "../workflows/blog-workflow/schema";
import { ContentGenerator } from "./blog/content-generator";
import { QualityChecker } from "./blog/quality-checker";

export async function searchWeb(
  topic: string,
  limit: number,
): Promise<SearchWebResponse> {
  const results = await firecrawlClient.search(topic, {
    limit,
  });

  return results.web ?? [];
}

export async function scrapeWeb(url: string): Promise<string> {
  const response = await firecrawlClient.scrape(url, {
    formats: ["markdown"],
  });

  return response.markdown || "";
}

async function calculateSaturationScore(pages: any) {
  if (pages.length < 2) return 0;

  // Calculate overlap based on shared headings and key points
  let totalOverlap = 0;
  let comparisons = 0;

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const page1 = pages[i];
      const page2 = pages[j];

      // Count shared H2s
      const sharedH2s = page1.h2s.filter((h2) =>
        page2.h2s.some(
          (h2b) =>
            h2.toLowerCase().includes(h2b.toLowerCase()) ||
            h2b.toLowerCase().includes(h2.toLowerCase()),
        ),
      ).length;

      // Count shared key points
      const sharedKeyPoints = page1.keyPoints.filter((kp) =>
        page2.keyPoints.some(
          (kp2) =>
            kp.toLowerCase().includes(kp2.toLowerCase()) ||
            kp2.toLowerCase().includes(kp.toLowerCase()),
        ),
      ).length;

      // Calculate overlap percentage for this pair
      const maxShared = Math.max(page1.h2s.length, page2.h2s.length);
      const overlapPercentage =
        maxShared > 0
          ? ((sharedH2s + sharedKeyPoints) / (maxShared + 5)) * 100
          : 0;

      totalOverlap += overlapPercentage;
      comparisons++;
    }
  }

  // Average overlap across all comparisons
  const averageOverlap = comparisons > 0 ? totalOverlap / comparisons : 0;

  // Normalize to 0-100 scale
  return Math.min(100, Math.round(averageOverlap));
}

async function performSERPAnalysis(topic: string) {
  const searchResults = await searchWeb(topic, 1);

  const itemsLen = searchResults.length;

  if (itemsLen === 0) {
    throw new Error("No SERP results found");
  }

  // anaylyze top pages
  const topPages = [];

  for (let it = 0; it < itemsLen; it++) {
    try {
      const result = searchResults[it];
      const content = await scrapeWeb(result.url);

      const page = await extractPageStructure(
        result.url,
        result.title,
        content,
      );
      topPages.push(page);
    } catch (error) {
      console.warn(
        `Failed to fetch page ${searchResults[it].url}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  if (topPages.length === 0) {
    throw new Error("Failed to fetch top search results");
  }

  // Calculate saturation score based on content overlap
  const saturationScore = await calculateSaturationScore(topPages);

  return {
    topPages,
    saturationScore,
  };
}

async function extractPageStructure(
  url: string,
  title: string,
  content: string,
) {
  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({
      schema: pageStructureSchema,
    }),
    prompt: `Analyze this web page content and extract the structure.

        URL: ${url}
        Title: ${title}

        Content:
        ${content.substring(0, 5000)}

        Extract:
        1. The main H1 heading
        2. All H2 headings
        3. All H3 headings
        4. Approximate word count
        5. Content angle (tutorial, opinion, documentation, or comparison)
        6. Key points or main topics covered (3-5 points)`,
  });

  return {
    url,
    title,
    h1: output.h1,
    h2s: output.h2s,
    h3s: output.h3s,
    wordCount: output.wordCount,
    angle: output.angle,
    keyPoints: output.keyPoints,
  };
}

async function performGapDetection(serpAnalysis: any, topic: string) {
  // Prepare page summaries for analysis
  const pageSummaries = serpAnalysis.topPages
    .map(
      (page: any) =>
        `URL: ${page.url}
        Title: ${page.title}
        H1: ${page.h1}
        H2s: ${page.h2s.join(", ")}
        Key Points: ${page.keyPoints.join(", ")}`,
    )
    .join("\n\n");

  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({
      schema: pageStructureSchema,
    }),
    prompt: `Analyze these competitor pages for the topic "${topic}" and identify gaps.
        ${pageSummaries}
        Identify:
        1. What all competitors say (common themes)
        2. What is repeated across pages
        3. What is missing or barely mentioned
        4. What is covered but only superficially

        For each category, provide 3-5 specific items.`,
  });

  return output;
}

async function performQuestionMining(serpAnalysis: any, topic: string) {
  // Extract confusion points from page titles and key points
  const confusionPoints = serpAnalysis.topPages
    .flatMap((page: any) => [
      ...page.keyPoints,
      page.title,
      page.h1,
      ...page.h2s.slice(0, 3),
    ])
    .filter((point) => point.length > 0)
    .slice(0, 20);

  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({
      schema: questionMiningSchema,
    }),
    prompt: `Generate questions users ask about "${topic}" for audience level "intermediate".

    Based on these content points:
    ${confusionPoints.join("\n")}

    Generate:
    1. 3-4 beginner questions (what is it, how do I start, etc.)
    2. 3-4 "why does this break" questions (common failures, errors)
    3. 3-4 "when NOT to use" questions (limitations, alternatives)
    4. 3-4 real-world confusion points (extracted from the content analysis)

    Make questions specific and practical.`,
  });

  return output;
}

export async function research(topic: string): Promise<any> {
  try {
    //  perform SERP analysis
    const serpAnalysis = await performSERPAnalysis(topic);

    //    perform gap detection
    const gapAnalysis = await performGapDetection(serpAnalysis, topic);

    // Perform question mining
    const questionMining = await performQuestionMining(serpAnalysis, topic);

    // Collect warnings
    const warnings: string[] = [];
    if (serpAnalysis.saturationScore > 80) {
      warnings.push(
        `Topic is highly saturated (${serpAnalysis.saturationScore}% overlap). Consider a unique angle.`,
      );
    }

    return {
      topic,
      serpAnalysis,
      gapAnalysis,
      questionMining,
      warnings,
    };
  } catch (error) {
    throw {
      type: "ResearchError",
      message: `Failed to perform research for topic "${topic}": ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
