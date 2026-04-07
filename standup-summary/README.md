# standup

A small Go CLI that generates yesterday's standup update from git logs for the current repository.

## Features

- Summarizes one day of committed work from git history
- Filters by author (auto-detected from git config, or passed with `--author`)
- Supports plain text and Slack-friendly markdown output
- Always includes blockers with `None` by default
- Includes `Next` only when follow-up is inferred from commit messages (`wip`, `todo`, `part 1`, etc.)

## Build

```bash
go build -o standup ./cmd/standup
```

## Usage

```bash
# default: summarize yesterday, print markdown output
./standup

# explicit date
./standup --date 2026-04-06

# explicit yesterday
./standup --yesterday

# output format
./standup --format text
./standup --format markdown
./standup --format both

# override author
./standup --author "you@example.com"
```

## Example Output

Text:

```text
Yesterday I worked on:
- Implemented internal, cmd (2 commits).
- Fixed internal (1 commit).
Blockers: None
```

Markdown:

```markdown
## Yesterday
- Implemented internal, cmd (2 commits).
- Fixed internal (1 commit).

## Blockers
- None
```

With inferred follow-up:

```markdown
## Yesterday
- Implemented internal (1 commit).

## Blockers
- None

## Next
- Follow up on: feat: add report endpoint (part 1)
```

## Notes

- This tool summarizes committed work only.
- Uncommitted local changes are not included.
- Merge commits are ignored by default.
