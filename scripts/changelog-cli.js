#!/usr/bin/env node

/**
 * Changelog CLI Tool
 * 
 * Interactive command-line tool for managing changelog entries.
 * 
 * Usage:
 *   node scripts/changelog-cli.js <command> [options]
 * 
 * Commands:
 *   add       Create a new changelog entry
 *   list      List all changelog entries
 *   update    Update an existing entry
 *   publish   Change entry status to "released"
 *   delete    Delete an entry (or mark as cancelled)
 *   stats     Show changelog statistics
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CHANGELOG_PATH = path.join(__dirname, '../changelog/changelog.json');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Question helper
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

// Load changelog
function loadChangelog() {
    try {
        if (fs.existsSync(CHANGELOG_PATH)) {
            return JSON.parse(fs.readFileSync(CHANGELOG_PATH, 'utf-8'));
        }
    } catch (error) {
        console.error('Error loading changelog:', error.message);
    }
    return {
        metadata: { version: '1.0.0', lastUpdated: new Date().toISOString(), totalEntries: 0 },
        entries: []
    };
}

// Save changelog
function saveChangelog(changelog) {
    changelog.metadata.lastUpdated = new Date().toISOString();
    changelog.metadata.totalEntries = changelog.entries.length;
    fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2), 'utf-8');
    console.log('✓ Changelog saved');
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

// Add new entry
async function addEntry() {
    console.log('\n📝 Create New Changelog Entry\n');
    
    const version = await question('Version (e.g., v2.1.0): ');
    const releaseDate = await question(`Release Date (YYYY-MM-DD) [${new Date().toISOString().split('T')[0]}]: `) || new Date().toISOString().split('T')[0];
    const category = await question('Category (feature/improvement/bugfix/security/deprecation) [feature]: ') || 'feature';
    const area = await question('Area (pipeline/matching/projects/analytics/payroll/api/ui) [api]: ') || 'api';
    const title = await question('Title: ');
    const summary = await question('Summary (one line): ');
    const description = await question('Description (multi-line, end with empty line):\n');
    
    const author = await question(`Author [${process.env.USER || 'System'}]: `) || process.env.USER || 'System';
    const impact = await question('Impact (low/medium/high/critical) [medium]: ') || 'medium';
    const affectedUsers = await question('Affected Users (all/admins/contractors/recruiters) [all]: ') || 'all';
    
    const tagsInput = await question('Tags (comma-separated): ');
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
    
    const roadmapQuarter = getQuarter(releaseDate);
    const roadmapItemId = await question('Roadmap Item ID (optional): ') || '';
    
    const year = new Date(releaseDate).getFullYear();
    const entry = {
        id: generateEntryId(year),
        version,
        releaseDate,
        status: 'draft',
        category,
        area,
        title,
        summary,
        description: description.trim(),
        roadmapQuarter,
        roadmapItemId: roadmapItemId || '',
        relatedProjects: [],
        author,
        contributors: [],
        tags,
        impact,
        affectedUsers,
        breakingChanges: false,
        migrationRequired: false,
        documentationUrl: '',
        releaseNotesUrl: '',
        apiChanges: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: null
    };
    
    const changelog = loadChangelog();
    changelog.entries.push(entry);
    saveChangelog(changelog);
    
    console.log(`\n✓ Entry created: ${entry.id}`);
    rl.close();
}

// List entries
function listEntries() {
    const changelog = loadChangelog();
    const entries = changelog.entries;
    
    if (entries.length === 0) {
        console.log('No entries found.');
        rl.close();
        return;
    }
    
    console.log(`\n📋 Changelog Entries (${entries.length} total)\n`);
    
    entries.forEach((entry, index) => {
        console.log(`${index + 1}. [${entry.id}] ${entry.version} - ${entry.title}`);
        console.log(`   Status: ${entry.status} | Category: ${entry.category} | Date: ${entry.releaseDate}`);
        console.log('');
    });
    
    rl.close();
}

// Update entry
async function updateEntry() {
    const changelog = loadChangelog();
    const entries = changelog.entries;
    
    if (entries.length === 0) {
        console.log('No entries found.');
        rl.close();
        return;
    }
    
    console.log('\n📝 Update Changelog Entry\n');
    console.log('Available entries:');
    entries.forEach((entry, index) => {
        console.log(`${index + 1}. [${entry.id}] ${entry.version} - ${entry.title}`);
    });
    
    const index = parseInt(await question('\nEnter entry number: ')) - 1;
    if (index < 0 || index >= entries.length) {
        console.log('Invalid entry number.');
        rl.close();
        return;
    }
    
    const entry = entries[index];
    console.log(`\nUpdating: ${entry.id}\n`);
    
    const title = await question(`Title [${entry.title}]: `) || entry.title;
    const summary = await question(`Summary [${entry.summary}]: `) || entry.summary;
    const status = await question(`Status (draft/scheduled/released/cancelled) [${entry.status}]: `) || entry.status;
    
    entry.title = title;
    entry.summary = summary;
    entry.status = status;
    entry.updatedAt = new Date().toISOString();
    
    if (status === 'released' && !entry.publishedAt) {
        entry.publishedAt = new Date().toISOString();
    }
    
    saveChangelog(changelog);
    console.log(`\n✓ Entry updated: ${entry.id}`);
    rl.close();
}

// Publish entry
async function publishEntry() {
    const changelog = loadChangelog();
    const draftEntries = changelog.entries.filter(e => e.status === 'draft' || e.status === 'scheduled');
    
    if (draftEntries.length === 0) {
        console.log('No draft entries found.');
        rl.close();
        return;
    }
    
    console.log('\n🚀 Publish Changelog Entry\n');
    draftEntries.forEach((entry, index) => {
        console.log(`${index + 1}. [${entry.id}] ${entry.version} - ${entry.title}`);
    });
    
    const index = parseInt(await question('\nEnter entry number: ')) - 1;
    if (index < 0 || index >= draftEntries.length) {
        console.log('Invalid entry number.');
        rl.close();
        return;
    }
    
    const entry = draftEntries[index];
    entry.status = 'released';
    entry.publishedAt = new Date().toISOString();
    entry.updatedAt = new Date().toISOString();
    
    saveChangelog(changelog);
    console.log(`\n✓ Entry published: ${entry.id}`);
    rl.close();
}

// Show statistics
function showStats() {
    const changelog = loadChangelog();
    const entries = changelog.entries;
    
    if (entries.length === 0) {
        console.log('No entries found.');
        rl.close();
        return;
    }
    
    const byCategory = {};
    const byStatus = {};
    const byQuarter = {};
    
    entries.forEach(entry => {
        byCategory[entry.category] = (byCategory[entry.category] || 0) + 1;
        byStatus[entry.status] = (byStatus[entry.status] || 0) + 1;
        byQuarter[entry.roadmapQuarter] = (byQuarter[entry.roadmapQuarter] || 0) + 1;
    });
    
    console.log('\n📊 Changelog Statistics\n');
    console.log(`Total Entries: ${entries.length}`);
    console.log(`\nBy Category:`);
    Object.entries(byCategory).forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count}`);
    });
    console.log(`\nBy Status:`);
    Object.entries(byStatus).forEach(([status, count]) => {
        console.log(`  ${status}: ${count}`);
    });
    console.log(`\nBy Quarter:`);
    Object.entries(byQuarter).forEach(([quarter, count]) => {
        console.log(`  ${quarter}: ${count}`);
    });
    
    rl.close();
}

// Main
function main() {
    const command = process.argv[2];
    
    switch (command) {
        case 'add':
            addEntry();
            break;
        case 'list':
            listEntries();
            break;
        case 'update':
            updateEntry();
            break;
        case 'publish':
            publishEntry();
            break;
        case 'stats':
            showStats();
            break;
        default:
            console.log(`
Changelog CLI Tool

Usage:
  node scripts/changelog-cli.js <command>

Commands:
  add       Create a new changelog entry
  list      List all changelog entries
  update    Update an existing entry
  publish   Change entry status to "released"
  stats     Show changelog statistics

Examples:
  node scripts/changelog-cli.js add
  node scripts/changelog-cli.js list
  node scripts/changelog-cli.js publish
            `);
            rl.close();
    }
}

if (require.main === module) {
    main();
}
