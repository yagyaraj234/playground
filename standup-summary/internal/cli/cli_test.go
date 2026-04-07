package cli

import (
	"testing"
	"time"
)

func TestParseDefaultsToYesterday(t *testing.T) {
	loc := time.Local
	now := func() time.Time {
		return time.Date(2026, 4, 7, 14, 30, 0, 0, loc)
	}

	opts, err := parseWithNow(nil, now)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	want := time.Date(2026, 4, 6, 0, 0, 0, 0, loc)
	if !opts.Day.Equal(want) {
		t.Fatalf("day mismatch, got=%v want=%v", opts.Day, want)
	}
	if opts.Format != "markdown" {
		t.Fatalf("format mismatch, got=%q", opts.Format)
	}
	if opts.DateProvided {
		t.Fatal("expected DateProvided=false for default run")
	}
}

func TestParseDate(t *testing.T) {
	opts, err := Parse([]string{"--date", "2026-04-05", "--format", "markdown"})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if got := opts.Day.Format("2006-01-02"); got != "2026-04-05" {
		t.Fatalf("day mismatch, got=%q", got)
	}
	if opts.Format != "markdown" {
		t.Fatalf("format mismatch, got=%q", opts.Format)
	}
	if !opts.DateProvided {
		t.Fatal("expected DateProvided=true when --date is passed")
	}
}

func TestParseRejectsDateAndYesterday(t *testing.T) {
	_, err := Parse([]string{"--date", "2026-04-05", "--yesterday"})
	if err == nil {
		t.Fatal("expected error, got nil")
	}
}

func TestParseRejectsFormat(t *testing.T) {
	_, err := Parse([]string{"--format", "xml"})
	if err == nil {
		t.Fatal("expected error, got nil")
	}
}
