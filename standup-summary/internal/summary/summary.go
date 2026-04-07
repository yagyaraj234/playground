package summary

import (
	"fmt"
	"sort"
	"strings"
	"time"

	"standup-summary/internal/gitlog"
)

type Report struct {
	Date              time.Time
	UseYesterdayLabel bool
	Work              []string
	Blockers          []string
	Next              []string
}

func Build(commits []gitlog.Commit, day time.Time, useYesterdayLabel bool) Report {
	report := Report{
		Date:              day,
		UseYesterdayLabel: useYesterdayLabel,
		Blockers:          []string{"None"},
	}

	if len(commits) == 0 {
		report.Work = []string{fmt.Sprintf("No committed changes found for %s.", day.Format("2006-01-02"))}
		return report
	}

	areaSet := map[string]struct{}{}
	nextSet := map[string]struct{}{}
	work := make([]string, 0, len(commits)+1)

	for _, commit := range commits {
		areas := inferAreas(commit.Files)
		for _, area := range areas {
			areaSet[area] = struct{}{}
		}

		work = append(work, formatCommitDescription(commit))

		if line := inferNext(commit.Subject + "\n" + commit.Body); line != "" {
			nextSet[line] = struct{}{}
		}
	}

	areas := sortedSet(areaSet)
	work = append([]string{fmt.Sprintf("Summary: %d commit%s across %s.", len(commits), plural(len(commits)), strings.Join(areas, ", "))}, work...)

	report.Work = work
	report.Next = sortedSet(nextSet)
	return report
}

func inferAreas(files []string) []string {
	if len(files) == 0 {
		return []string{"repository"}
	}

	set := map[string]struct{}{}
	for _, file := range files {
		parts := strings.Split(strings.TrimSpace(file), "/")
		if len(parts) == 0 || parts[0] == "" {
			continue
		}
		if len(parts) == 1 {
			set["repository root"] = struct{}{}
			continue
		}
		set[parts[0]] = struct{}{}
	}

	out := make([]string, 0, len(set))
	for area := range set {
		out = append(out, area)
	}
	if len(out) == 0 {
		return []string{"repository"}
	}
	sort.Strings(out)
	return out
}

func inferNext(text string) string {
	t := strings.ToLower(strings.TrimSpace(text))
	keywords := []string{"wip", "todo", "part 1", "follow up", "next step", "temporary", "temp", "quick fix"}

	for _, k := range keywords {
		if strings.Contains(t, k) {
			first := strings.TrimSpace(strings.Split(strings.TrimSpace(text), "\n")[0])
			if first == "" {
				return "Continue follow-up work from ongoing changes."
			}
			return fmt.Sprintf("Follow up on: %s", first)
		}
	}

	return ""
}

func formatCommitDescription(commit gitlog.Commit) string {
	s := strings.TrimSpace(commit.Subject)
	if s == "" {
		if commit.Hash == "" {
			return "commit"
		}
		return fmt.Sprintf("%s", shortHash(commit.Hash))
	}

	prefixes := []string{"feat:", "fix:", "refactor:", "chore:", "docs:", "test:"}
	lower := strings.ToLower(s)
	for _, p := range prefixes {
		if strings.HasPrefix(lower, p) {
			s = strings.TrimSpace(s[len(p):])
			break
		}
	}

	return fmt.Sprintf("%s %s", shortHash(commit.Hash), strings.TrimSpace(s))
}

func shortHash(hash string) string {
	h := strings.TrimSpace(hash)
	if len(h) >= 7 {
		return h[:7]
	}
	if h == "" {
		return "commit"
	}
	return h
}

func sortedSet(set map[string]struct{}) []string {
	if len(set) == 0 {
		return nil
	}
	out := make([]string, 0, len(set))
	for s := range set {
		out = append(out, s)
	}
	sort.Strings(out)
	return out
}

func plural(n int) string {
	if n == 1 {
		return ""
	}
	return "s"
}
