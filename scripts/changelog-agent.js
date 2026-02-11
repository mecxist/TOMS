#!/usr/bin/env node

/**
 * Changelog Agent
 * 
 * Automated agent that manages versioning and changelog entries based on git commits.
 * Analyzes commit history and automatically:
 * - Determines appropriate version bump
 * - Creates changelog entries
 * - Updates package.json
 * 
 * Usage:
 *   node scripts/changelog-agent.js [--auto] [--since <date>]
 * 
 * Options:
 *   --auto        Automatically apply changes (default: preview only)
 *   --since       Only analyze commits since this date
 *   --dry-run     Preview changes without applying
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGE_PATH = path.join(__dirname, '../package.json');
const CHANGELOG_PATH = path.join(__dirname, '../changelog/changelog.json');

// Load package.json
function loadPackage() {
    try {
        return JSON.parse(fs.readFileSync(PACKAGE_PATH, 'utf-8'));
    } catch (error) {
        throw new Error(`Failed to load package.json: ${error.message}`);
    }
}

// Load changelog
function loadChangelog() {
    try {
        if (fs.existsSync(CHANGELOG_PATH)) {
            return JSON.parse(fs.readFileSync(CHANGELOG_PATH, 'utf-8'));
        }
    } catch (error) {
        console.warn(`Warning: Could not load changelog: ${error.message}`);
    }
    return {
        metadata: { version: '1.0.0', lastUpdated: new Date().toISOString(), totalEntries: 0 },
        entries: []
    };
}

// Get git commits
function getGitCommits(since = null) {
    let gitCommand = 'git log --pretty=format:"%H|%s|%an|%ad" --date=short';
    
    // Get last version from changelog or package.json
    const changelog = loadChangelog();
    const lastEntry = changelog.entries.find(e => e.status === 'released');
    const lastVersion = lastEntry ? lastEntry.version.replace('v', '') : null;
    
    if (since) {
        gitCommand += ` --since="${since}"`;
    } else if (lastVersion) {
        // Get commits since last version tag
        try {
            execSync(`git tag -l "v${lastVersion}"`, { encoding: 'utf-8', stdio: 'pipe' });
            gitCommand += ` v${lastVersion}..HEAD`;
        } catch (e) {
            // Tag doesn't exist, use date from last entry
            if (lastEntry && lastEntry.releaseDate) {
                gitCommand += ` --since="${lastEntry.releaseDate}"`;
            }
        }
    } else {
        // Get commits from last 7 days if no previous version
        const date = new Date();
        date.setDate(date.getDate() - 7);
        gitCommand += ` --since="${date.toISOString().split('T')[0]}"`;
    }

    try {
        const output = execSync(gitCommand, { encoding: 'utf-8', stdio: 'pipe' });
        return output.trim().split('\n').filter(line => line.trim()).map(line => {
            const [hash, subject, author, date] = line.split('|');
            return { hash, subject, author, date };
        });
    } catch (error) {
        // No commits found or git error
        return [];
    }
}

// Parse conventional commit
function parseCommitMessage(subject) {
    const pattern = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;
    const match = subject.match(pattern);
    
    if (!match) return null;

    const [, type, scope, breaking, description] = match;
    
    const typeMap = {
        'feat': { category: 'feature', bump: 'minor' },
        'fix': { category: 'bugfix', bump: 'patch' },
        'perf': { category: 'improvement', bump: 'patch' },
        'improve': { category: 'improvement', bump: 'patch' },
        'refactor': { category: 'improvement', bump: 'patch' },
        'security': { category: 'security', bump: 'patch' },
        'deprecate': { category: 'deprecation', bump: 'minor' },
        'docs': { category: 'improvement', bump: null },
        'style': { category: 'improvement', bump: null },
        'test': { category: 'improvement', bump: null },
        'chore': { category: 'improvement', bump: null }
    };

    const config = typeMap[type.toLowerCase()];
    if (!config) return null;

    return {
        type: type.toLowerCase(),
        scope: scope || null,
        breaking: !!breaking,
        description: description.trim(),
        category: config.category,
        bump: breaking ? 'major' : config.bump
    };
}

// Analyze commits and determine version bump
function analyzeCommits(commits) {
    if (commits.length === 0) {
        return { bump: null, reason: 'No new commits found' };
    }

    const parsed = commits.map(c => parseCommitMessage(c.subject)).filter(Boolean);
    
    if (parsed.length === 0) {
        return { bump: null, reason: 'No conventional commits found' };
    }

    // Check for breaking changes
    const hasBreaking = parsed.some(p => p.breaking || p.type === 'deprecate');
    if (hasBreaking) {
        return {
            bump: 'major',
            reason: 'Breaking changes detected',
            commits: parsed.filter(p => p.breaking || p.type === 'deprecate')
        };
    }

    // Check for features
    const hasFeatures = parsed.some(p => p.type === 'feat');
    if (hasFeatures) {
        return {
            bump: 'minor',
            reason: 'New features added',
            commits: parsed.filter(p => p.type === 'feat')
        };
    }

    // Default to patch for fixes and improvements
    return {
        bump: 'patch',
        reason: 'Bug fixes and improvements',
        commits: parsed
    };
}

// Generate changelog entry from commits
function generateEntry(commits, version, bumpType) {
    const parsed = commits.map(c => {
        const parsed = parseCommitMessage(c.subject);
        return parsed ? { ...parsed, commit: c } : null;
    }).filter(Boolean);

    if (parsed.length === 0) return null;

    // Group by category
    const grouped = {};
    parsed.forEach(p => {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push(p);
    });

    const primaryCategory = Object.keys(grouped).reduce((a, b) => 
        grouped[a].length > grouped[b].length ? a : b
    );

    const mainCommit = parsed[0];
    const releaseDate = new Date().toISOString().split('T')[0];
    const year = new Date(releaseDate).getFullYear();

    // Generate title
    let title = '';
    if (parsed.length === 1) {
        title = mainCommit.description.charAt(0).toUpperCase() + mainCommit.description.slice(1);
    } else {
        const categoryLabels = {
            feature: 'New Features',
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

    // Get unique contributors
    const contributors = [...new Set(commits.map(c => c.author))];
    const tags = [...new Set(parsed.map(p => p.scope).filter(Boolean))];

    const entryId = `CHG-${year}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    return {
        id: entryId,
        version: `v${version}`,
        releaseDate: releaseDate,
        status: 'released',
        category: primaryCategory,
        area: tags[0] || 'api',
        title: title,
        summary: mainCommit.description,
        description: descriptions,
        roadmapQuarter: getQuarter(releaseDate),
        roadmapItemId: '',
        relatedProjects: [],
        author: process.env.USER || 'Changelog Agent',
        contributors: contributors,
        tags: tags.length > 0 ? tags : [bumpType],
        impact: bumpType === 'major' ? 'high' : bumpType === 'minor' ? 'medium' : 'low',
        affectedUsers: 'all',
        breakingChanges: bumpType === 'major',
        migrationRequired: bumpType === 'major',
        documentationUrl: '',
        releaseNotesUrl: '',
        apiChanges: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
    };
}

function getQuarter(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const quarter = Math.ceil(month / 3);
    return `Q${quarter} ${year}`;
}

// Bump version
function bumpVersion(currentVersion, type) {
    const match = currentVersion.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!match) throw new Error(`Invalid version: ${currentVersion}`);
    
    const [,, major, minor, patch] = match;
    const version = { major: parseInt(major), minor: parseInt(minor), patch: parseInt(patch) };
    
    switch (type) {
        case 'major':
            version.major += 1;
            version.minor = 0;
            version.patch = 0;
            break;
        case 'minor':
            version.minor += 1;
            version.patch = 0;
            break;
        case 'patch':
            version.patch += 1;
            break;
    }
    
    return `${version.major}.${version.minor}.${version.patch}`;
}

// Main function
function main() {
    const args = process.argv.slice(2);
    const auto = args.includes('--auto');
    const dryRun = args.includes('--dry-run');
    const sinceIndex = args.indexOf('--since');
    const since = sinceIndex >= 0 && args[sinceIndex + 1] ? args[sinceIndex + 1] : null;

    console.log('\n🤖 Changelog Agent - Analyzing commits...\n');

    // Get commits
    const commits = getGitCommits(since);
    
    if (commits.length === 0) {
        console.log('✓ No new commits found. Nothing to update.');
        return;
    }

    console.log(`📝 Found ${commits.length} commit(s)\n`);

    // Analyze commits
    const analysis = analyzeCommits(commits);
    
    if (!analysis.bump) {
        console.log(`ℹ️  ${analysis.reason}`);
        console.log('   No version bump needed.\n');
        return;
    }

    // Get current version
    const pkg = loadPackage();
    const currentVersion = pkg.version;
    const newVersion = bumpVersion(currentVersion, analysis.bump);

    console.log('📊 Analysis Results:');
    console.log(`   Current Version: ${currentVersion}`);
    console.log(`   Recommended Bump: ${analysis.bump.toUpperCase()}`);
    console.log(`   New Version: ${newVersion}`);
    console.log(`   Reason: ${analysis.reason}`);
    console.log(`   Commits: ${analysis.commits.length}\n`);

    // Generate changelog entry
    const entry = generateEntry(commits, newVersion, analysis.bump);
    
    if (!entry) {
        console.log('⚠️  Could not generate changelog entry');
        return;
    }

    console.log('📋 Generated Changelog Entry:');
    console.log(`   ID: ${entry.id}`);
    console.log(`   Title: ${entry.title}`);
    console.log(`   Category: ${entry.category}`);
    console.log(`   Impact: ${entry.impact}\n`);

    if (dryRun) {
        console.log('🔍 DRY RUN - No changes applied\n');
        return;
    }

    if (!auto) {
        console.log('💡 Run with --auto to apply these changes automatically\n');
        console.log('   Example: node scripts/changelog-agent.js --auto\n');
        return;
    }

    // Apply changes
    console.log('🚀 Applying changes...\n');

    // Update package.json
    pkg.version = newVersion;
    fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
    console.log(`✓ Updated package.json: ${currentVersion} → ${newVersion}`);

    // Update changelog
    const changelog = loadChangelog();
    changelog.entries.unshift(entry);
    changelog.metadata.lastUpdated = new Date().toISOString();
    changelog.metadata.totalEntries = changelog.entries.length;
    fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2) + '\n', 'utf-8');
    console.log(`✓ Created changelog entry: ${entry.id}`);

    console.log('\n✅ All changes applied successfully!\n');
    console.log('💡 Next steps:');
    console.log(`   1. Review the changes: git diff`);
    console.log(`   2. Commit: git commit -am "chore: bump version to ${newVersion}"`);
    console.log(`   3. Tag: git tag v${newVersion}`);
    console.log(`   4. Push: git push origin main --tags\n`);
}

if (require.main === module) {
    main();
}

module.exports = { analyzeCommits, getGitCommits, generateEntry };
