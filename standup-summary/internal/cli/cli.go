package cli

import (
	"flag"
	"fmt"
	"strings"
	"time"
)

type Options struct {
	Day          time.Time
	Format       string
	Author       string
	DateProvided bool
}

func Parse(args []string) (Options, error) {
	return parseWithNow(args, time.Now)
}

func parseWithNow(args []string, nowFn func() time.Time) (Options, error) {
	fs := flag.NewFlagSet("standup", flag.ContinueOnError)
	fs.Usage = func() {}

	var dateStr string
	var yesterday bool
	var format string
	var author string

	fs.StringVar(&dateStr, "date", "", "date to summarize in YYYY-MM-DD")
	fs.BoolVar(&yesterday, "yesterday", false, "summarize previous date")
	fs.StringVar(&format, "format", "markdown", "output format: text|markdown|both")
	fs.StringVar(&author, "author", "", "git author name or email override")

	if err := fs.Parse(args); err != nil {
		return Options{}, fmt.Errorf("failed parsing flags: %w", err)
	}

	if dateStr != "" && yesterday {
		return Options{}, fmt.Errorf("use either --date or --yesterday, not both")
	}

	day, err := resolveDay(dateStr, yesterday, nowFn)
	if err != nil {
		return Options{}, err
	}

	format = strings.ToLower(strings.TrimSpace(format))
	if format != "text" && format != "markdown" && format != "both" {
		return Options{}, fmt.Errorf("invalid --format %q (allowed: text|markdown|both)", format)
	}

	return Options{
		Day:          day,
		Format:       format,
		Author:       strings.TrimSpace(author),
		DateProvided: dateStr != "",
	}, nil
}

func resolveDay(dateStr string, yesterday bool, nowFn func() time.Time) (time.Time, error) {
	now := nowFn().In(time.Local)

	if dateStr != "" {
		d, err := time.ParseInLocation("2006-01-02", dateStr, time.Local)
		if err != nil {
			return time.Time{}, fmt.Errorf("invalid --date %q: use YYYY-MM-DD", dateStr)
		}
		return d, nil
	}

	if yesterday || dateStr == "" {
		y := now.AddDate(0, 0, -1)
		return time.Date(y.Year(), y.Month(), y.Day(), 0, 0, 0, 0, time.Local), nil
	}

	return time.Time{}, fmt.Errorf("failed to resolve date")
}
