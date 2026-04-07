package main

import (
	"context"
	"fmt"
	"os"

	"standup-summary/internal/cli"
	"standup-summary/internal/format"
	"standup-summary/internal/gitlog"
	"standup-summary/internal/summary"
)

func main() {
	ctx := context.Background()

	opts, err := cli.Parse(os.Args[1:])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	author := opts.Author
	if author == "" {
		author, err = gitlog.ResolveAuthor(ctx, ".")
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to resolve git author: %v\n", err)
			os.Exit(1)
		}
	}

	commits, err := gitlog.CollectDay(ctx, ".", opts.Day, author)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to collect git log: %v\n", err)
		os.Exit(1)
	}

	report := summary.Build(commits, opts.Day, !opts.DateProvided)
	out, err := format.Render(report, opts.Format)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	fmt.Println(out)
}
