package format

import (
	"strings"
	"testing"
	"time"

	"standup-summary/internal/summary"
)

func TestRenderMarkdownConditionalNext(t *testing.T) {
	report := summary.Report{
		Date:              time.Date(2026, 4, 6, 0, 0, 0, 0, time.Local),
		UseYesterdayLabel: true,
		Work:              []string{"Implemented feature work in api (1 commit)."},
		Blockers:          []string{"None"},
	}

	out, err := Render(report, "markdown")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if strings.Contains(out, "## Next") {
		t.Fatalf("expected no next section, got:\n%s", out)
	}
	if !strings.Contains(out, "## Yesterday (2026-04-06)") {
		t.Fatalf("expected yesterday heading with date, got:\n%s", out)
	}

	report.Next = []string{"Follow up on: feat: add report endpoint (part 1)"}
	out, err = Render(report, "markdown")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.Contains(out, "## Next") {
		t.Fatalf("expected next section, got:\n%s", out)
	}
}

func TestRenderTextAlwaysBlockers(t *testing.T) {
	report := summary.Report{
		Date:              time.Date(2026, 4, 5, 0, 0, 0, 0, time.Local),
		UseYesterdayLabel: false,
		Work:              []string{"Worked on repository updates."},
		Blockers:          []string{"None"},
	}

	out, err := Render(report, "text")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.Contains(out, "Blockers: None") {
		t.Fatalf("missing blockers line: %s", out)
	}
	if !strings.Contains(out, "On 2026-04-05 I worked on:") {
		t.Fatalf("missing date heading: %s", out)
	}
}
