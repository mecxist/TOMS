import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  const page = await context.newPage();

  const screenshotsDir = path.join(__dirname, '../screenshots/current');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const pages = [
    { path: '/', name: 'pipeline' },
    { path: '/applications', name: 'applications' },
    { path: '/interviews', name: 'interviews' },
    { path: '/onboarding', name: 'onboarding' },
    { path: '/projects', name: 'projects' },
    { path: '/matching', name: 'ai-matching' },
    { path: '/assignments', name: 'assignments' },
    { path: '/timesheets', name: 'timesheets' },
    { path: '/analytics', name: 'analytics' },
    { path: '/payroll', name: 'payroll' },
    { path: '/resource-planning', name: 'resources' },
  ];

  for (const p of pages) {
    try {
      await page.goto(`http://localhost:3000${p.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(screenshotsDir, `${p.name}.png`),
        fullPage: false
      });
      console.log(`Captured: ${p.name}`);
    } catch (error) {
      console.error(`Failed to capture ${p.name}:`, error);
    }
  }

  await browser.close();
  console.log('All screenshots captured!');
}

captureScreenshots().catch(console.error);
