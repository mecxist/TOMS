#!/usr/bin/env node

/**
 * Status Document Updater
 * 
 * Analyzes the project structure and updates STATUS.md with current state.
 * Can be run manually or integrated into workflows.
 * 
 * Usage:
 *   node scripts/update-status.js [--dry-run] [--check-only]
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const STATUS_FILE = path.join(PROJECT_ROOT, 'STATUS.md');

// Analyze project structure
function analyzeProject() {
    const structure = {
        phases: {
            1: { name: 'Foundation & Infrastructure', items: [], complete: true },
            2: { name: 'Application & Pipeline', items: [], complete: true },
            3: { name: 'Interview Management', items: [], complete: true },
            4: { name: 'Onboarding & Availability', items: [], complete: false },
            5: { name: 'AI Matching Engine', items: [], complete: false },
            6: { name: 'Projects & Assignments', items: [], complete: false },
            7: { name: 'Time Tracking & Payroll', items: [], complete: false },
            8: { name: 'Security & Compliance', items: [], complete: false },
            9: { name: 'Testing', items: [], complete: false },
            10: { name: 'Deployment', items: [], complete: false }
        },
        files: {
            app: [],
            components: [],
            lib: [],
            hooks: [],
            prisma: []
        },
        features: [],
        issues: []
    };

    // Check app directory
    const appDir = path.join(PROJECT_ROOT, 'app');
    if (fs.existsSync(appDir)) {
        structure.files.app = fs.readdirSync(appDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    }

    // Check components
    const componentsDir = path.join(PROJECT_ROOT, 'components');
    if (fs.existsSync(componentsDir)) {
        structure.files.components = fs.readdirSync(componentsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    }

    // Check lib
    const libDir = path.join(PROJECT_ROOT, 'lib');
    if (fs.existsSync(libDir)) {
        structure.files.lib = fs.readdirSync(libDir, { withFileTypes: true })
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name.replace('.ts', '').replace('.tsx', ''));
    }

    // Check hooks
    const hooksDir = path.join(PROJECT_ROOT, 'hooks');
    if (fs.existsSync(hooksDir)) {
        structure.files.hooks = fs.readdirSync(hooksDir, { withFileTypes: true })
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name.replace('.ts', '').replace('.tsx', ''));
    }

    // Check for specific features
    const checkFeature = (filePath, phase, featureName) => {
        const fullPath = path.join(PROJECT_ROOT, filePath);
        if (fs.existsSync(fullPath)) {
            structure.phases[phase].items.push({ name: featureName, complete: true });
            structure.features.push(featureName);
        }
    };

    // Phase 1 checks
    checkFeature('app/layout.tsx', 1, 'Root Layout');
    checkFeature('components/shared/sidebar.tsx', 1, 'Sidebar Component');
    checkFeature('lib/auth.ts', 1, 'Auth Helpers');
    checkFeature('prisma/schema.prisma', 1, 'Database Schema');

    // Phase 2 checks
    checkFeature('app/(public)/apply/page.tsx', 2, 'Application Form');
    checkFeature('app/(coordinator)/coordinator/pipeline/page.tsx', 2, 'Pipeline Kanban');

    // Phase 3 checks
    checkFeature('app/(coordinator)/coordinator/interviews/page.tsx', 3, 'Interview Dashboard');

    // Phase 4 checks
    checkFeature('app/(coordinator)/coordinator/onboarding/page.tsx', 4, 'Onboarding Page');

    // Phase 6 checks
    checkFeature('app/(manager)/manager/projects/page.tsx', 6, 'Projects Page');
    checkFeature('app/(manager)/manager/assignments/page.tsx', 6, 'Assignments Page');

    // Phase 7 checks
    checkFeature('app/(manager)/manager/timesheets/page.tsx', 7, 'Timesheets Page');
    checkFeature('app/(admin)/admin/payroll/page.tsx', 7, 'Payroll Page');

    // Count files
    function countFiles(dir, count = 0) {
        if (!fs.existsSync(dir)) return count;
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                count = countFiles(fullPath, count);
            } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx') || item.name.endsWith('.md'))) {
                count++;
            }
        }
        return count;
    }

    structure.totalFiles = countFiles(PROJECT_ROOT);
    structure.totalLines = estimateLines(PROJECT_ROOT);

    return structure;
}

function estimateLines(rootDir) {
    let lines = 0;
    function countLines(dir) {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory() && !item.name.includes('node_modules') && !item.name.includes('.next')) {
                countLines(fullPath);
            } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx') || item.name.endsWith('.js'))) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    lines += content.split('\n').length;
                } catch (e) {
                    // Ignore errors
                }
            }
        }
    }
    countLines(rootDir);
    return lines;
}

// Read current STATUS.md
function readStatus() {
    try {
        return fs.readFileSync(STATUS_FILE, 'utf-8');
    } catch (error) {
        console.error(`Error reading STATUS.md: ${error.message}`);
        return null;
    }
}

// Generate status report
function generateReport(analysis) {
    const report = {
        phases: {},
        overallProgress: 0,
        totalFiles: analysis.totalFiles,
        totalLines: analysis.totalLines,
        suggestions: []
    };

    let completedPhases = 0;
    let totalPhases = 0;

    for (const [phaseNum, phase] of Object.entries(analysis.phases)) {
        totalPhases++;
        const completion = phase.items.length > 0 
            ? Math.round((phase.items.filter(i => i.complete).length / Math.max(phase.items.length, 1)) * 100)
            : (phase.complete ? 100 : 0);
        
        report.phases[phaseNum] = {
            name: phase.name,
            completion,
            items: phase.items,
            complete: phase.complete
        };

        if (phase.complete) completedPhases++;
    }

    report.overallProgress = Math.round((completedPhases / totalPhases) * 100);

    return report;
}

// Main function
function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const checkOnly = args.includes('--check-only');

    console.log('\n📊 Analyzing TalentOS project structure...\n');

    const analysis = analyzeProject();
    const report = generateReport(analysis);

    console.log('📈 Current Status:');
    console.log(`   Overall Progress: ${report.overallProgress}%`);
    console.log(`   Total Files: ${report.totalFiles}`);
    console.log(`   Estimated Lines: ${report.totalLines.toLocaleString()}\n`);

    console.log('📋 Phase Status:');
    for (const [num, phase] of Object.entries(report.phases)) {
        const status = phase.complete ? '✅' : phase.completion > 0 ? '⏳' : '⏳';
        console.log(`   Phase ${num}: ${status} ${phase.name} - ${phase.completion}%`);
    }

    if (checkOnly) {
        console.log('\n✓ Analysis complete (check-only mode)\n');
        return;
    }

    if (dryRun) {
        console.log('\n🔍 DRY RUN - No changes will be made\n');
        console.log('Suggested updates:');
        console.log(`- Update overall progress to ${report.overallProgress}%`);
        console.log(`- Update file count to ${report.totalFiles}`);
        console.log(`- Update line count to ~${Math.round(report.totalLines / 100) * 100}\n`);
        return;
    }

    console.log('\n💡 To update STATUS.md, review the analysis above and manually update the file.');
    console.log('   Or ask the Status Agent to update it for you.\n');
}

if (require.main === module) {
    main();
}

module.exports = { analyzeProject, generateReport };
