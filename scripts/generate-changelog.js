#!/usr/bin/env node

/**
 * Git-based Changelog Generator
 * 
 * Parses git commits using conventional commit format and generates
 * changelog entries automatically.
 * 
 * Usage:
 *   node scripts/generate-changelog.js [options]
 * 
 * Options:
 *   --since <date>     Only include commits since this date (e.g., "2024-01-01")
 *   --until <date>     Only include commits until this date
 *   --version <ver>     Version number for the release (e.g., "v2.1.0")
 *   --release-date <date> Release date (defaults to today)
 *   --author <name>     Author name for the changelog entry
 *   --output <file>     Output file path (defaults to changelog/changelog.json)
 *   --dry-run          Preview changes without writing to file
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load version from package.json
function getPackageVersion() {
    try {
        const packagePath = path.join(__dirname, '../package.json');
        if (fs.existsSync(packagePath)) {
            const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
            return pkg.version;
        }
    } catch (error) {
        // Ignore errors
    }
    return null;
}

// Configuration
const CONFIG = {
    changelogPath: path.join(__dirname, '../changelog/changelog.json'),
    commitTypes: {
        'feat': { category: 'feature', icon: '✨' },
        'fix': { category: 'bugfix', icon: '🐛' },
        'perf': { category: 'improvement', icon: '⚡' },
        'improve': { category: 'improvement', icon: '🔧' },
        'refactor': { category: 'improvement', icon: '♻️' },
        'security': { category: 'security', icon: '🔒' },
        'deprecate': { category: 'deprecation', icon: '⚠️' },
        'docs': { category: 'improvement', icon: '📝' },
        'style': { category: 'improvement', icon: '💄' },
        'test': { category: 'improvement', icon: '✅' },
        'chore': { category: 'improvement', icon: '🔨' }
    },
    defaultArea: 'api',
    defaultImpact: 'medium',
    defaultAffectedUsers: 'all'
};

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        since: null,
        until: null,
        version: null,
        releaseDate: new Date().toISOString().split('T')[0],
        author: 'System',
        output: CONFIG.changelogPath,
        dryRun: false
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--since':
                options.since = args[++i];
                break;
            case '--until':
                options.until = args[++i];
                break;
            case '--version':
                options.version = args[++i];
                break;
            case '--release-date':
                options.releaseDate = args[++i];
                break;
            case '--author':
                options.author = args[++i];
                break;
            case '--output':
                options.output = args[++i];
                break;
            case '--dry-run':
                options.dryRun = true;
                break;
            case '--help':
                console.log(`
Git-based Changelog Generator

Usage:
  node scripts/generate-changelog.js [options]

Options:
  --since <date>        Only include commits since this date (YYYY-MM-DD)
  --until <date>       Only include commits until this date (YYYY-MM-DD)
  --version <ver>       Version number (e.g., v2.1.0)
  --release-date <date> Release date (YYYY-MM-DD, defaults to today)
  --author <name>       Author name (defaults to "System")
  --output <file>       Output file path
  --dry-run            Preview without writing
  --help               Show this help message

Conventional Commit Format:
  feat: Add new feature
  fix: Fix bug description
  perf: Performance improvement
  security: Security update
  deprecate: Deprecate feature

Examples:
  node scripts/generate-changelog.js --version v2.1.0 --since 2024-01-01
  node scripts/generate-changelog.js --version v2.1.0 --author "John Doe" --dry-run
                `);
                process.exit(0);
        }
    }

    // Try to get version from package.json if not provided
    if (!options.version) {
        const pkgVersion = getPackageVersion();
        if (pkgVersion) {
            options.version = `v${pkgVersion}`;
            console.log(`ℹ️  Using version from package.json: ${options.version}`);
        } else {
            console.error('Error: --version is required (or set version in package.json)');
            process.exit(1);
        }
    } else if (!options.version.startsWith('v')) {
        // Ensure version starts with 'v'
        options.version = `v${options.version}`;
    }

    return options;
}

// Get git commits
function getGitCommits(since, until) {
    let gitCommand = 'git log --pretty=format:"%H|%s|%an|%ad" --date=short';
    
    if (since) {
        gitCommand += ` --since="${since}"`;
    }
    if (until) {
        gitCommand += ` --until="${until}"`;
    }

    try {
        const output = execSync(gitCommand, { encoding: 'utf-8' });
        return output.trim().split('\n').filter(line => line.trim()).map(line => {
            const [hash, subject, author, date] = line.split('|');
            return { hash, subject, author, date };
        });
    } catch (error) {
        console.error('Error fetching git commits:', error.message);
        return [];
    }
}

// Parse conventional commit message
function parseCommitMessage(subject) {
    // Pattern: type(scope): description
    // Examples:
    //   feat: Add new feature
    //   fix(api): Fix authentication bug
    //   perf(matching): Improve algorithm speed
    
    const pattern = /^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/;
    const match = subject.match(pattern);
    
    if (!match) {
        return null;
    }

    const [, type, scope, description] = match;
    const typeConfig = CONFIG.commitTypes[type.toLowerCase()];
    
    if (!typeConfig) {
        return null;
    }

    return {
        type: type.toLowerCase(),
        scope: scope || null,
        description: description.trim(),
        category: typeConfig.category,
        icon: typeConfig.icon
    };
}

// Generate changelog entry from commits
function generateChangelogEntry(commits, options) {
    if (commits.length === 0) {
        console.log('No commits found matching criteria');
        return null;
    }

    // Group commits by category
    const grouped = {};
    commits.forEach(commit => {
        const parsed = parseCommitMessage(commit.subject);
        if (parsed) {
            if (!grouped[parsed.category]) {
                grouped[parsed.category] = [];
            }
            grouped[parsed.category].push({
                ...parsed,
                author: commit.author,
                date: commit.date
            });
        }
    });

    // Determine primary category (most commits)
    const primaryCategory = Object.keys(grouped).reduce((a, b) => 
        grouped[a].length > grouped[b].length ? a : b
    );

    // Generate title
    const primaryCommits = grouped[primaryCategory];
    const mainCommit = primaryCommits[0];
    let title = mainCommit.description;
    
    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    // If multiple commits, make it plural/generic
    if (commits.length > 1) {
        const categoryLabels = {
            feature: 'Features',
            bugfix: 'Bug Fixes',
            improvement: 'Improvements',
            security: 'Security Updates',
            deprecation: 'Deprecations'
        };
        title = `${categoryLabels[primaryCategory]} and Updates`;
    }

    // Generate description
    const descriptions = Object.entries(grouped).map(([category, items]) => {
        const categoryLabels = {
            feature: 'Features',
            bugfix: 'Bug Fixes',
            improvement: 'Improvements',
            security: 'Security Updates',
            deprecation: 'Deprecations'
        };
        
        const itemsList = items.map(item => {
            const scope = item.scope ? `(${item.scope})` : '';
            return `- ${item.description}${scope}`;
        }).join('\n');
        
        return `**${categoryLabels[category]}:**\n${itemsList}`;
    }).join('\n\n');

    // Generate entry ID
    const year = new Date(options.releaseDate).getFullYear();
    const entryId = `CHG-${year}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    // Determine impact based on commit count and types
    let impact = 'medium';
    if (commits.length > 10 || grouped.security || grouped.deprecation) {
        impact = 'high';
    } else if (commits.length < 3 && !grouped.feature) {
        impact = 'low';
    }

    // Extract tags from commit scopes
    const tags = [...new Set(commits.map(c => {
        const parsed = parseCommitMessage(c.subject);
        return parsed?.scope;
    }).filter(Boolean))];

    // Get unique contributors
    const contributors = [...new Set(commits.map(c => c.author))];

    return {
        id: entryId,
        version: options.version,
        releaseDate: options.releaseDate,
        status: 'draft',
        category: primaryCategory,
        area: tags[0] || CONFIG.defaultArea,
        title: title,
        summary: mainCommit.description,
        description: descriptions,
        roadmapQuarter: getQuarter(options.releaseDate),
        roadmapItemId: '',
        relatedProjects: [],
        author: options.author,
        contributors: contributors,
        tags: tags,
        impact: impact,
        affectedUsers: CONFIG.defaultAffectedUsers,
        breakingChanges: commits.some(c => c.subject.toLowerCase().includes('breaking')),
        migrationRequired: false,
        documentationUrl: '',
        releaseNotesUrl: '',
        apiChanges: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: null
    };
}

// Get quarter from date
function getQuarter(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const quarter = Math.ceil(month / 3);
    return `Q${quarter} ${year}`;
}

// Load existing changelog
function loadChangelog(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.error('Error loading changelog:', error.message);
    }
    
    return {
        metadata: {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            totalEntries: 0
        },
        entries: []
    };
}

// Save changelog
function saveChangelog(changelog, filePath) {
    changelog.metadata.lastUpdated = new Date().toISOString();
    changelog.metadata.totalEntries = changelog.entries.length;
    
    const content = JSON.stringify(changelog, null, 2);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Changelog saved to ${filePath}`);
}

// Main function
function main() {
    const options = parseArgs();
    
    console.log('🔍 Fetching git commits...');
    const commits = getGitCommits(options.since, options.until);
    
    if (commits.length === 0) {
        console.log('No commits found.');
        return;
    }
    
    console.log(`✓ Found ${commits.length} commit(s)`);
    
    // Filter to conventional commits only
    const conventionalCommits = commits.filter(c => parseCommitMessage(c.subject));
    console.log(`✓ ${conventionalCommits.length} conventional commit(s) found`);
    
    if (conventionalCommits.length === 0) {
        console.log('No conventional commits found. Use format: type(scope): description');
        console.log('Examples: feat: Add feature, fix: Fix bug, perf: Improve performance');
        return;
    }
    
    console.log('\n📝 Generating changelog entry...');
    const entry = generateChangelogEntry(conventionalCommits, options);
    
    if (!entry) {
        return;
    }
    
    console.log('\n📋 Generated Entry:');
    console.log(JSON.stringify(entry, null, 2));
    
    if (options.dryRun) {
        console.log('\n✓ Dry run complete. No changes written.');
        return;
    }
    
    // Load existing changelog
    const changelog = loadChangelog(options.output);
    
    // Check if version already exists
    const existingIndex = changelog.entries.findIndex(e => e.version === entry.version);
    if (existingIndex >= 0) {
        console.log(`\n⚠️  Version ${entry.version} already exists. Updating entry...`);
        changelog.entries[existingIndex] = entry;
    } else {
        changelog.entries.push(entry);
    }
    
    // Save changelog
    saveChangelog(changelog, options.output);
    console.log(`\n✓ Changelog entry added for version ${entry.version}`);
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateChangelogEntry, parseCommitMessage, getGitCommits };
