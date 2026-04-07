package summary

import (
	"strings"
	"testing"
	"time"

	"standup-summary/internal/gitlog"
)

func TestBuildIncludesNextWhenFollowUpDetected(t *testing.T) {
	day := time.Date(2026, 4, 6, 0, 0, 0, 0, time.Local)
	commits := []gitlog.Commit{
		{
			Hash:    "abc1234567",
			Subject: "feat: add report endpoint (part 1)",
			Files:   []string{"internal/api/report.go"},
		},
		{
			Hash:    "def1234567",
			Subject: "fix: avoid nil panic",
			Files:   []string{"internal/summary/build.go"},
		},
	}

	report := Build(commits, day, true)
	if len(report.Work) != 3 {
		t.Fatalf("expected summary + 2 commits, got=%d (%v)", len(report.Work), report.Work)
	}
	if !strings.HasPrefix(report.Work[0], "Summary:") {
		t.Fatalf("expected summary line first, got=%q", report.Work[0])
	}
	if !strings.Contains(report.Work[1], "abc1234 add report endpoint (part 1)") {
		t.Fatalf("unexpected first commit line: %q", report.Work[1])
	}
	if !strings.Contains(report.Work[2], "def1234 avoid nil panic") {
		t.Fatalf("unexpected second commit line: %q", report.Work[2])
	}
	if len(report.Next) == 0 {
		t.Fatal("expected next section to be inferred")
	}
}

func TestBuildOmitsNextWithoutSignals(t *testing.T) {
	day := time.Date(2026, 4, 6, 0, 0, 0, 0, time.Local)
	commits := []gitlog.Commit{
		{
			Hash:    "abc1234567",
			Subject: "feat: add report endpoint",
			Files:   []string{"internal/api/report.go"},
		},
	}

	report := Build(commits, day, false)
	if len(report.Work) != 2 {
		t.Fatalf("expected summary + 1 commit line, got=%d", len(report.Work))
	}
	if len(report.Next) != 0 {
		t.Fatalf("expected next to be empty, got=%v", report.Next)
	}
}

func TestBuildNoCommits(t *testing.T) {
	day := time.Date(2026, 4, 6, 0, 0, 0, 0, time.Local)
	report := Build(nil, day, true)

	if len(report.Work) != 1 {
		t.Fatalf("expected fallback work line, got=%v", report.Work)
	}
	if !strings.Contains(report.Work[0], "No committed changes found") {
		t.Fatalf("unexpected fallback line: %s", report.Work[0])
	}
	if len(report.Blockers) != 1 || report.Blockers[0] != "None" {
		t.Fatalf("unexpected blockers: %v", report.Blockers)
	}
}
