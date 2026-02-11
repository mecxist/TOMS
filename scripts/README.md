# Scripts (TOMS)

Changelog and versioning automation for TOMS.

## Scripts

### `generate-changelog.js`

Automatically generates changelog entries from git commits using conventional commit format.

**Usage:**
```bash
node scripts/generate-changelog.js --version v2.1.0 --since 2024-01-01
```

**Options:**
- `--version <ver>` - Version number (required)
- `--since <date>` - Only include commits since this date (YYYY-MM-DD)
- `--until <date>` - Only include commits until this date
- `--release-date <date>` - Release date (defaults to today)
- `--author <name>` - Author name (defaults to "System")
- `--output <file>` - Output file path
- `--dry-run` - Preview without writing to file

**Conventional Commit Format:**
```
feat: Add new feature
fix: Fix bug description
perf: Performance improvement
security: Security update
deprecate: Deprecate feature
```

**Examples:**
```bash
# Generate from all commits since Jan 1
node scripts/generate-changelog.js --version v2.1.0 --since 2024-01-01

# Preview without saving
node scripts/generate-changelog.js --version v2.1.0 --since 2024-01-01 --dry-run

# Custom author and release date
node scripts/generate-changelog.js --version v2.1.0 --author "John Doe" --release-date 2024-01-15
```

### `changelog-cli.js`

Interactive CLI tool for managing changelog entries manually.

**Usage:**
```bash
node scripts/changelog-cli.js <command>
```

**Commands:**
- `add` - Create a new changelog entry interactively
- `list` - List all changelog entries
- `update` - Update an existing entry
- `publish` - Change entry status to "released"
- `stats` - Show changelog statistics

**Examples:**
```bash
# Create new entry
node scripts/changelog-cli.js add

# List all entries
node scripts/changelog-cli.js list

# Publish a draft entry
node scripts/changelog-cli.js publish

# View statistics
node scripts/changelog-cli.js stats
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Generate Changelog

on:
  release:
    types: [created]

jobs:
  changelog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Generate Changelog
        run: |
          node scripts/generate-changelog.js \
            --version ${{ github.event.release.tag_name }} \
            --since $(git describe --tags --abbrev=0) \
            --author "${{ github.actor }}"
      
      - name: Commit Changelog
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add changelog/changelog.json
          git commit -m "chore: update changelog for ${{ github.event.release.tag_name }}" || exit 0
          git push
```

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Validate conventional commit format
commit_msg=$(cat "$1")
if ! echo "$commit_msg" | grep -qE "^(feat|fix|perf|security|deprecate|docs|style|test|chore)(\(.+\))?:"; then
    echo "Error: Commit message must follow conventional commit format"
    echo "Example: feat: Add new feature"
    exit 1
fi
```

## Best Practices

1. **Use Conventional Commits**: Always use the conventional commit format for automatic parsing
2. **Regular Updates**: Generate changelog entries after each release
3. **Review Before Publishing**: Use `--dry-run` to preview before committing
4. **Link to Roadmap**: Manually link entries to roadmap items when creating
5. **Keep Descriptions Clear**: Write user-friendly descriptions that explain the impact

## Troubleshooting

**No commits found:**
- Check date range with `--since` and `--until`
- Verify you're in a git repository
- Ensure commits follow conventional format

**Entry not appearing in UI:**
- Check that status is "released" (not "draft")
- Verify JSON is valid
- Check browser console for errors

**Script permission errors:**
```bash
chmod +x scripts/*.js
```
