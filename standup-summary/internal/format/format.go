package format

import (
	"fmt"
	"strings"

	"standup-summary/internal/summary"
)

func Render(report summary.Report, style string) (string, error) {
	switch style {
	case "text":
		return renderText(report), nil
	case "markdown":
		return renderMarkdown(report), nil
	case "both":
		return renderText(report) + "\n\n---\n\n" + renderMarkdown(report), nil
	default:
		return "", fmt.Errorf("unsupported format %q", style)
	}
}

func renderText(report summary.Report) string {
	lines := []string{textHeading(report)}
	for _, item := range report.Work {
		lines = append(lines, fmt.Sprintf("- %s", item))
	}

	blockers := "None"
	if len(report.Blockers) > 0 {
		blockers = strings.Join(report.Blockers, "; ")
	}
	lines = append(lines, fmt.Sprintf("Blockers: %s", blockers))

	if len(report.Next) > 0 {
		lines = append(lines, "Next:")
		for _, item := range report.Next {
			lines = append(lines, fmt.Sprintf("- %s", item))
		}
	}

	return strings.Join(lines, "\n")
}

func renderMarkdown(report summary.Report) string {
	lines := []string{markdownHeading(report)}
	for _, item := range report.Work {
		lines = append(lines, fmt.Sprintf("- %s", item))
	}

	lines = append(lines, "", "## Blockers")
	if len(report.Blockers) == 0 {
		lines = append(lines, "- None")
	} else {
		for _, item := range report.Blockers {
			lines = append(lines, fmt.Sprintf("- %s", item))
		}
	}

	if len(report.Next) > 0 {
		lines = append(lines, "", "## Next")
		for _, item := range report.Next {
			lines = append(lines, fmt.Sprintf("- %s", item))
		}
	}

	return strings.Join(lines, "\n")
}

func textHeading(report summary.Report) string {
	dateLabel := report.Date.Format("2006-01-02")
	if report.UseYesterdayLabel {
		return fmt.Sprintf("Yesterday (%s) I worked on:", dateLabel)
	}
	return fmt.Sprintf("On %s I worked on:", dateLabel)
}

func markdownHeading(report summary.Report) string {
	dateLabel := report.Date.Format("2006-01-02")
	if report.UseYesterdayLabel {
		return fmt.Sprintf("## Yesterday (%s)", dateLabel)
	}
	return fmt.Sprintf("## %s", dateLabel)
}
