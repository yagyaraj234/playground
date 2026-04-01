import { generateText } from "ai";
import { CURRENT_PROVIDER, getCurrentModel } from "../../lib/model-config";
import type {
  BlogContent,
  SEOMetadata,
  UserInput,
  BlogOutput,
  SectionsCopyable,
  BonusOutputs,
} from "../../types/blog";

export class OutputFormatter {
  static async formatOutput(
    blogContent: BlogContent,
    seoMetadata: SEOMetadata,
    userInput?: UserInput,
  ): Promise<BlogOutput> {
    // Generate markdown format
    const markdown = OutputFormatter.generateMarkdown(blogContent, seoMetadata);

    // Generate MDX and HTML formats
    const mdx = OutputFormatter.generateMDX(blogContent, seoMetadata);
    const html = OutputFormatter.generateHTML(blogContent, seoMetadata);

    // Generate section-level copyable content
    const sectionsCopyable =
      OutputFormatter.generateSectionsCopyable(blogContent);

    const SampleInput = {
      topic:
        userInput?.topic ||
        "How to create Workflows using Mastra in 10 minutes",
      length: userInput?.length || "medium",
      audience: userInput?.audience || "beginner",
      intent: userInput?.intent || "informational",
      tone: userInput?.tone || "technical",
    };

    // Generate bonus outputs
    const bonusOutputs = await OutputFormatter.generateBonusOutputs(
      blogContent,
      userInput || SampleInput,
    );

    return {
      markdown,
      mdx,
      html,
      sectionsCopyable,
      bonusOutputs,
      metadata: seoMetadata,
    };
  }

  /**
   * Generates Markdown format
   */
  private static generateMarkdown(
    blogContent: BlogContent,
    seoMetadata: SEOMetadata,
  ): string {
    let markdown = "";

    markdown += "---\n";
    markdown += `title: "${seoMetadata.articleSchema.headline}"\n`;
    markdown += `description: "${seoMetadata.metaDescription}"\n`;
    markdown += `date: "${seoMetadata.articleSchema.datePublished}"\n`;
    markdown += `wordCount: ${seoMetadata.articleSchema.wordCount}\n`;
    markdown += "---\n\n";

    for (const section of blogContent.sections) {
      const heading = "#".repeat(section.level);
      markdown += `${heading} ${section.title}\n\n`;
      markdown += `${section.content}\n\n`;
    }

    if (seoMetadata.internalLinks.length > 0) {
      markdown += "## Related Articles\n\n";
      for (const link of seoMetadata.internalLinks) {
        markdown += `- [${link.anchor}](${link.url})\n`;
      }
      markdown += "\n";
    }

    if (seoMetadata.faqSchema.length > 0) {
      markdown += "## FAQ\n\n";
      for (const faq of seoMetadata.faqSchema) {
        markdown += `**Q: ${faq.question}**\n\n`;
        markdown += `${faq.answer}\n\n`;
      }
    }

    return markdown;
  }

  /**
   * Generates MDX format (Markdown with JSX components)
   */
  private static generateMDX(
    blogContent: BlogContent,
    seoMetadata: SEOMetadata,
  ): string {
    let mdx = "";

    // Add imports for common components
    mdx += "import { Alert, CodeBlock, Callout } from '@/components';\n\n";

    // Add metadata as front matter
    mdx += "export const metadata = {\n";
    mdx += `  title: "${seoMetadata.articleSchema.headline}",\n`;
    mdx += `  description: "${seoMetadata.metaDescription}",\n`;
    mdx += `  date: "${seoMetadata.articleSchema.datePublished}",\n`;
    mdx += `  wordCount: ${seoMetadata.articleSchema.wordCount},\n`;
    mdx += "};\n\n";

    // Add content sections
    for (const section of blogContent.sections) {
      const heading = "#".repeat(section.level);
      mdx += `${heading} ${section.title}\n\n`;

      // Wrap code blocks in CodeBlock component
      let content = section.content;
      content = content.replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<CodeBlock language="$1">\n$2\n</CodeBlock>',
      );

      mdx += `${content}\n\n`;
    }

    // Add internal links section as Callout
    if (seoMetadata.internalLinks.length > 0) {
      mdx += '<Callout type="info">\n';
      mdx += "## Related Articles\n\n";
      for (const link of seoMetadata.internalLinks) {
        mdx += `- [${link.anchor}](${link.url})\n`;
      }
      mdx += "</Callout>\n\n";
    }

    // Add FAQ section
    if (seoMetadata.faqSchema.length > 0) {
      mdx += "## FAQ\n\n";
      for (const faq of seoMetadata.faqSchema) {
        mdx += `<Callout type="question">\n`;
        mdx += `**Q: ${faq.question}**\n\n`;
        mdx += `${faq.answer}\n`;
        mdx += `</Callout>\n\n`;
      }
    }

    return mdx;
  }

  /**
   * Generates CMS-ready HTML format
   */
  private static generateHTML(
    blogContent: BlogContent,
    seoMetadata: SEOMetadata,
  ): string {
    let html = "";

    // Add HTML head with metadata
    html += "<!DOCTYPE html>\n";
    html += '<html lang="en">\n';
    html += "<head>\n";
    html += '  <meta charset="UTF-8">\n';
    html +=
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += `  <title>${OutputFormatter.escapeHtml(seoMetadata.metaTitle)}</title>\n`;
    html += `  <meta name="description" content="${OutputFormatter.escapeHtml(seoMetadata.metaDescription)}">\n`;
    html += `  <meta property="og:title" content="${OutputFormatter.escapeHtml(seoMetadata.articleSchema.headline)}">\n`;
    html += `  <meta property="og:description" content="${OutputFormatter.escapeHtml(seoMetadata.metaDescription)}">\n`;
    html += `  <meta property="article:published_time" content="${seoMetadata.articleSchema.datePublished}">\n`;

    // Add JSON-LD schema
    html += '  <script type="application/ld+json">\n';
    html += JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: seoMetadata.articleSchema.headline,
        description: seoMetadata.articleSchema.description,
        author: {
          "@type": "Person",
          name: seoMetadata.articleSchema.author,
        },
        datePublished: seoMetadata.articleSchema.datePublished,
        wordCount: seoMetadata.articleSchema.wordCount,
      },
      null,
      2,
    );
    html += "\n  </script>\n";

    // Add FAQ schema if present
    if (seoMetadata.faqSchema.length > 0) {
      html += '  <script type="application/ld+json">\n';
      html += JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: seoMetadata.faqSchema.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
        null,
        2,
      );
      html += "\n  </script>\n";
    }

    html += "</head>\n";
    html += "<body>\n";
    html += "  <article>\n";

    // Add content sections
    for (const section of blogContent.sections) {
      const tag = `h${section.level}`;
      html += `    <${tag}>${OutputFormatter.escapeHtml(section.title)}</${tag}>\n`;
      html += `    <p>${OutputFormatter.markdownToHtml(section.content)}</p>\n`;
    }

    // Add internal links section
    if (seoMetadata.internalLinks.length > 0) {
      html += '    <section class="related-articles">\n';
      html += "      <h2>Related Articles</h2>\n";
      html += "      <ul>\n";
      for (const link of seoMetadata.internalLinks) {
        html += `        <li><a href="${OutputFormatter.escapeHtml(link.url)}">${OutputFormatter.escapeHtml(link.anchor)}</a></li>\n`;
      }
      html += "      </ul>\n";
      html += "    </section>\n";
    }

    // Add FAQ section
    if (seoMetadata.faqSchema.length > 0) {
      html += '    <section class="faq">\n';
      html += "      <h2>FAQ</h2>\n";
      for (const faq of seoMetadata.faqSchema) {
        html += "      <details>\n";
        html += `        <summary>${OutputFormatter.escapeHtml(faq.question)}</summary>\n`;
        html += `        <p>${OutputFormatter.escapeHtml(faq.answer)}</p>\n`;
        html += "      </details>\n";
      }
      html += "    </section>\n";
    }

    html += "  </article>\n";
    html += "</body>\n";
    html += "</html>\n";

    return html;
  }

  /**
   * Generates section-level copyable content
   */
  private static generateSectionsCopyable(
    blogContent: BlogContent,
  ): SectionsCopyable {
    const copyable: SectionsCopyable = {};

    for (const section of blogContent.sections) {
      // Create a key from the section title
      const key = section.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      // Store the section content with heading
      const heading = "#".repeat(section.level);
      copyable[key] = `${heading} ${section.title}\n\n${section.content}`;
    }

    return copyable;
  }

  /**
   * Generates bonus outputs: tweet, newsletter, LinkedIn post
   */
  private static async generateBonusOutputs(
    blogContent: BlogContent,
    userInput: UserInput,
  ): Promise<BonusOutputs> {
    const model = await getCurrentModel(CURRENT_PROVIDER);

    // Get content summary for bonus outputs
    const contentSummary = blogContent.sections
      ?.slice(0, 3)
      .map((s) => s.content.substring(0, 200))
      .join(" ");

    // Generate tweet summary
    const tweetResult = await generateText({
      model,
      prompt: `Create a compelling tweet (max 280 characters) about this blog post about "${userInput.topic}".

Content summary:
${contentSummary}

Requirements:
- Maximum 280 characters
- Include a call-to-action or hook
- Use relevant hashtags if appropriate
- Be engaging and click-worthy

Return ONLY the tweet, nothing else.`,
      temperature: 0.7,
    });

    // Generate newsletter version
    const newsletterResult = await generateText({
      model,
      prompt: `Create a newsletter-friendly version (150-200 words) of this blog post about "${userInput.topic}".

Content summary:
${contentSummary}

Requirements:
- 150-200 words
- Conversational tone
- Include a "Read more" call-to-action
- Highlight the main value proposition
- Be engaging and scannable

Return ONLY the newsletter version, nothing else.`,
      temperature: 0.7,
    });

    // Generate LinkedIn post
    const linkedinResult = await generateText({
      model,
      prompt: `Create a professional LinkedIn post (200-300 words) about this blog post about "${userInput.topic}".

Content summary:
${contentSummary}

Requirements:
- 200-300 words
- Professional but personable tone
- Include a hook or question to encourage engagement
- Highlight key insights or takeaways
- Include a "Read the full article" call-to-action
- Use line breaks for readability

Return ONLY the LinkedIn post, nothing else.`,
      temperature: 0.7,
    });

    return {
      tweetSummary: tweetResult.text.trim(),
      newsletterVersion: newsletterResult.text.trim(),
      linkedinPost: linkedinResult.text.trim(),
    };
  }

  /**
   * Escapes HTML special characters
   */
  private static escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }

  /**
   * Converts markdown to HTML (basic conversion)
   */
  private static markdownToHtml(markdown: string): string {
    let html = markdown;

    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Convert italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Convert code
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // Convert links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Escape remaining HTML
    html = OutputFormatter.escapeHtml(html);

    return html;
  }
}

export async function formatOutput(
  blogContent: BlogContent,
  seoMetadata: SEOMetadata,
  userInput: UserInput,
): Promise<BlogOutput> {
  const phaseStartTime = Date.now();

  try {
    // const outputFormatter = new OutputFormatter();
    const output = await OutputFormatter.formatOutput(
      blogContent,
      seoMetadata,
      userInput,
    );

    const phaseDuration = Date.now() - phaseStartTime;
    const tokensUsed = 0; // Formatting doesn't use LLM tokens
    // const cost = this.estimateCost(tokensUsed);

    console.log(
      "output-formatting",
      phaseDuration,
      tokensUsed,
      "success",
      `Output formatted. Markdown: ${output.markdown.length} chars. MDX: ${output.mdx?.length ?? 0} chars. HTML: ${output.html?.length ?? 0} chars. Bonus outputs: 3 (tweet, newsletter, LinkedIn)`,
    );

    // this.totalTokensUsed += tokensUsed;
    // this.totalCost += cost;

    return output;
  } catch (error) {
    console.log(
      "output-formatting",
      Date.now() - phaseStartTime,
      0,
      "failed",
      `Output formatting failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error;
  }
}
