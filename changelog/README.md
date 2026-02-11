# Changelog

This directory holds changelog entries and templates for TOMS.

## Layout

- **changelog.json** — Changelog entries
- **templates/** — Entry templates (feature, bugfix, improvement)

## Usage

- **Add entry:** `npm run changelog:add`
- **List entries:** `npm run changelog:list`
- **Version bump:** `npm run version:patch` | `version:minor` | `version:major`
- **Changelog agent:** `npm run changelog:agent` (analyzes commits and suggests bumps)

See `scripts/README.md` for full script documentation.
