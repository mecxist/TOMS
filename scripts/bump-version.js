#!/usr/bin/env node

/**
 * Version Bump Script
 * 
 * Automatically bumps version in package.json and creates a changelog entry.
 * Follows semantic versioning: MAJOR.MINOR.PATCH
 * 
 * Usage:
 *   node scripts/bump-version.js [major|minor|patch] [--message "description"]
 * 
 * Examples:
 *   node scripts/bump-version.js patch --message "Bug fixes"
 *   node scripts/bump-version.js minor --message "New features"
 *   node scripts/bump-version.js major --message "Breaking changes"
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_PATH = path.join(__dirname, '../package.json');
const CHANGELOG_PATH = path.join(__dirname, '../changelog/changelog.json');

// Parse version string
function parseVersion(version) {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!match) {
        throw new Error(`Invalid version format: ${version}`);
    }
    return {
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
        patch: parseInt(match[3])
    };
}

// Format version string
function formatVersion(parts) {
    return `${parts.major}.${parts.minor}.${parts.patch}`;
}

// Bump version
function bumpVersion(currentVersion, type) {
    const version = parseVersion(currentVersion);
    
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
        default:
            throw new Error(`Invalid bump type: ${type}. Use major, minor, or patch`);
    }
    
    return formatVersion(version);
}

// Load package.json
function loadPackage() {
    try {
        return JSON.parse(fs.readFileSync(PACKAGE_PATH, 'utf-8'));
    } catch (error) {
        throw new Error(`Failed to load package.json: ${error.message}`);
    }
}

// Save package.json
function savePackage(pkg) {
    fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
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
        metadata: {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            totalEntries: 0
        },
        entries: []
    };
}

// Save changelog
function saveChangelog(changelog) {
    changelog.metadata.lastUpdated = new Date().toISOString();
    changelog.metadata.totalEntries = changelog.entries.length;
    fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2) + '\n', 'utf-8');
}

// Generate entry ID
function generateEntryId(year) {
    const random = Math.floor(Math.random() * 1000);
    return `CHG-${year}-${String(random).padStart(3, '0')}`;
}

// Get quarter from date
function getQuarter(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const quarter = Math.ceil(month / 3);
    return `Q${quarter} ${year}`;
}

// Determine category from version bump type
function getCategoryFromBumpType(type) {
    switch (type) {
        case 'major':
            return 'feature'; // Major usually means significant features or breaking changes
        case 'minor':
            return 'feature'; // Minor usually means new features
        case 'patch':
            return 'bugfix'; // Patch usually means bug fixes
        default:
            return 'improvement';
    }
}

// Create changelog entry
function createChangelogEntry(oldVersion, newVersion, type, message) {
    const releaseDate = new Date().toISOString().split('T')[0];
    const year = new Date(releaseDate).getFullYear();
    
    const category = getCategoryFromBumpType(type);
    
    // Generate title based on bump type and message
    let title = message || '';
    if (!title) {
        switch (type) {
            case 'major':
                title = `Major Release ${newVersion}`;
                break;
            case 'minor':
                title = `New Features in ${newVersion}`;
                break;
            case 'patch':
                title = `Bug Fixes and Improvements in ${newVersion}`;
                break;
        }
    }
    
    const summary = message || `Version ${newVersion} release`;
    const description = message 
        ? `**Version ${newVersion}**\n\n${message}`
        : `**Version ${newVersion}**\n\nThis release includes updates and improvements. See individual changelog entries for details.`;
    
    return {
        id: generateEntryId(year),
        version: `v${newVersion}`,
        releaseDate: releaseDate,
        status: 'released',
        category: category,
        area: 'api',
        title: title,
        summary: summary,
        description: description,
        roadmapQuarter: getQuarter(releaseDate),
        roadmapItemId: '',
        relatedProjects: [],
        author: process.env.USER || 'System',
        contributors: [],
        tags: [type, 'release'],
        impact: type === 'major' ? 'high' : type === 'minor' ? 'medium' : 'low',
        affectedUsers: 'all',
        breakingChanges: type === 'major',
        migrationRequired: type === 'major',
        documentationUrl: '',
        releaseNotesUrl: '',
        apiChanges: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
    };
}

// Main function
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        console.log(`
Version Bump Script

Usage:
  node scripts/bump-version.js <type> [options]

Types:
  major    Bump major version (X.0.0) - Breaking changes
  minor    Bump minor version (0.X.0) - New features
  patch    Bump patch version (0.0.X) - Bug fixes

Options:
  --message "text"    Description for the changelog entry
  --no-changelog       Skip creating changelog entry
  --dry-run           Preview changes without applying

Examples:
  node scripts/bump-version.js patch
  node scripts/bump-version.js minor --message "Added new dashboard features"
  node scripts/bump-version.js major --message "API v2 with breaking changes"
        `);
        process.exit(0);
    }
    
    const bumpType = args[0];
    if (!['major', 'minor', 'patch'].includes(bumpType)) {
        console.error(`Error: Invalid bump type "${bumpType}". Use major, minor, or patch.`);
        process.exit(1);
    }
    
    // Parse options
    const options = {
        message: null,
        noChangelog: false,
        dryRun: false
    };
    
    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--message' && args[i + 1]) {
            options.message = args[++i];
        } else if (args[i] === '--no-changelog') {
            options.noChangelog = true;
        } else if (args[i] === '--dry-run') {
            options.dryRun = true;
        }
    }
    
    // Load package.json
    const pkg = loadPackage();
    const currentVersion = pkg.version;
    const newVersion = bumpVersion(currentVersion, bumpType);
    
    console.log(`\n📦 Version Bump: ${currentVersion} → ${newVersion}\n`);
    
    if (options.dryRun) {
        console.log('🔍 Dry run mode - no changes will be made\n');
        console.log('Would update package.json:');
        console.log(`  version: "${currentVersion}" → "${newVersion}"`);
        
        if (!options.noChangelog) {
            const entry = createChangelogEntry(currentVersion, newVersion, bumpType, options.message);
            console.log('\nWould create changelog entry:');
            console.log(JSON.stringify(entry, null, 2));
        }
        
        return;
    }
    
    // Update package.json
    pkg.version = newVersion;
    savePackage(pkg);
    console.log(`✓ Updated package.json: ${currentVersion} → ${newVersion}`);
    
    // Create changelog entry
    if (!options.noChangelog) {
        const changelog = loadChangelog();
        const entry = createChangelogEntry(currentVersion, newVersion, bumpType, options.message);
        
        // Check if version already exists
        const existingIndex = changelog.entries.findIndex(e => e.version === `v${newVersion}`);
        if (existingIndex >= 0) {
            console.log(`⚠️  Version v${newVersion} already exists in changelog. Updating entry...`);
            changelog.entries[existingIndex] = entry;
        } else {
            changelog.entries.unshift(entry); // Add to beginning
        }
        
        saveChangelog(changelog);
        console.log(`✓ Created changelog entry: ${entry.id}`);
    }
    
    console.log(`\n✅ Version bumped successfully to ${newVersion}\n`);
}

if (require.main === module) {
    main();
}

module.exports = { bumpVersion, parseVersion, formatVersion };
