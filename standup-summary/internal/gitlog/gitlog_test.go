package gitlog

import "testing"

func TestParseGitLog(t *testing.T) {
	raw := "\x1eabc123\x1f2026-04-06T09:12:00+05:30\x1ffeat: add report endpoint\x1fBody line\x1d\ninternal/api/report.go\nREADME.md\n\x1edef456\x1f2026-04-06T11:00:00+05:30\x1ffix: nil panic\x1f\x1d\ninternal/summary/build.go\n"

	commits, err := parseGitLog(raw)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(commits) != 2 {
		t.Fatalf("expected 2 commits, got %d", len(commits))
	}

	if commits[0].Hash != "abc123" {
		t.Fatalf("hash mismatch: %s", commits[0].Hash)
	}
	if commits[0].Subject != "feat: add report endpoint" {
		t.Fatalf("subject mismatch: %s", commits[0].Subject)
	}
	if len(commits[0].Files) != 2 {
		t.Fatalf("file count mismatch: %d", len(commits[0].Files))
	}
}

func TestUniqueNonEmptyLines(t *testing.T) {
	got := uniqueNonEmptyLines("a\n\na\n b \n")
	if len(got) != 2 {
		t.Fatalf("unexpected len: %d", len(got))
	}
	if got[0] != "a" || got[1] != "b" {
		t.Fatalf("unexpected content: %#v", got)
	}
}
