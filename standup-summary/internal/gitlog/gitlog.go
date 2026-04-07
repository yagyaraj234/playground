package gitlog

import (
	"bytes"
	"context"
	"fmt"
	"os/exec"
	"sort"
	"strings"
	"time"
)

type Commit struct {
	Hash    string
	Date    time.Time
	Subject string
	Body    string
	Files   []string
}

func ResolveAuthor(ctx context.Context, repoPath string) (string, error) {
	name, _ := runGit(ctx, repoPath, "config", "user.name")
	email, _ := runGit(ctx, repoPath, "config", "user.email")

	name = strings.TrimSpace(name)
	email = strings.TrimSpace(email)

	switch {
	case name != "" && email != "":
		return fmt.Sprintf("%s <%s>", name, email), nil
	case email != "":
		return email, nil
	case name != "":
		return name, nil
	default:
		return "", fmt.Errorf("git user.name/user.email not configured and --author not provided")
	}
}

func CollectDay(ctx context.Context, repoPath string, day time.Time, author string) ([]Commit, error) {
	start := time.Date(day.Year(), day.Month(), day.Day(), 0, 0, 0, 0, time.Local)
	end := start.AddDate(0, 0, 1)

	args := []string{
		"log",
		"--no-merges",
		"--since", start.Format(time.RFC3339),
		"--until", end.Format(time.RFC3339),
		"--date=iso-strict",
		"--name-only",
		"--pretty=format:%x1e%H%x1f%ad%x1f%s%x1f%b%x1d",
	}

	if strings.TrimSpace(author) != "" {
		args = append(args, "--author", strings.TrimSpace(author))
	}

	out, err := runGit(ctx, repoPath, args...)
	if err != nil {
		return nil, err
	}

	return parseGitLog(out)
}

func runGit(ctx context.Context, repoPath string, args ...string) (string, error) {
	cmd := exec.CommandContext(ctx, "git", append([]string{"-C", repoPath}, args...)...)
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		return "", fmt.Errorf("git %s failed: %w (%s)", strings.Join(args, " "), err, strings.TrimSpace(stderr.String()))
	}

	return stdout.String(), nil
}

func parseGitLog(raw string) ([]Commit, error) {
	records := strings.Split(raw, "\x1e")
	commits := make([]Commit, 0, len(records))

	for _, rec := range records {
		rec = strings.TrimSpace(rec)
		if rec == "" {
			continue
		}

		splitIdx := strings.Index(rec, "\x1d")
		if splitIdx == -1 {
			return nil, fmt.Errorf("failed parsing git log record")
		}

		meta := rec[:splitIdx]
		filesPart := rec[splitIdx+1:]

		fields := strings.SplitN(meta, "\x1f", 4)
		if len(fields) != 4 {
			return nil, fmt.Errorf("unexpected git log metadata shape")
		}

		dt, err := time.Parse(time.RFC3339, strings.TrimSpace(fields[1]))
		if err != nil {
			return nil, fmt.Errorf("failed parsing commit date: %w", err)
		}

		commit := Commit{
			Hash:    strings.TrimSpace(fields[0]),
			Date:    dt,
			Subject: strings.TrimSpace(fields[2]),
			Body:    strings.TrimSpace(fields[3]),
			Files:   uniqueNonEmptyLines(filesPart),
		}

		commits = append(commits, commit)
	}

	sort.Slice(commits, func(i, j int) bool {
		return commits[i].Date.Before(commits[j].Date)
	})

	return commits, nil
}

func uniqueNonEmptyLines(input string) []string {
	seen := map[string]struct{}{}
	out := []string{}

	for _, line := range strings.Split(input, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		if _, ok := seen[line]; ok {
			continue
		}
		seen[line] = struct{}{}
		out = append(out, line)
	}

	return out
}
