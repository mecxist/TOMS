const { chromium } = require('playwright');
const path = require('path');

async function captureViews() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to match typical desktop
  await page.setViewportSize({ width: 1440, height: 900 });

  // Load the Aura source HTML
  const htmlPath = path.join(__dirname, '..', 'tomsv1.html');
  await page.goto(`file://${htmlPath}`);

  // Wait for page to load
  await page.waitForTimeout(1000);

  // Navigate to Projects
  await page.click('#nav-projects');
  await page.waitForTimeout(500);

  // Capture Timeline view (default)
  await page.screenshot({ path: 'screenshots/aura-timeline.png', fullPage: false });
  console.log('Captured: Timeline');

  // Capture Gantt view
  await page.click('#tab-btn-gantt');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/aura-gantt.png', fullPage: false });
  console.log('Captured: Gantt');

  // Capture Calendar view
  await page.click('#tab-btn-calendar');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/aura-calendar.png', fullPage: false });
  console.log('Captured: Calendar');

  // Capture Kanban view
  await page.click('#tab-btn-kanban');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/aura-kanban.png', fullPage: false });
  console.log('Captured: Kanban');

  // Capture Roadmap view
  await page.click('#tab-btn-roadmap');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/aura-roadmap.png', fullPage: false });
  console.log('Captured: Roadmap');

  await browser.close();
  console.log('\nAll screenshots saved to ./screenshots/');
}

captureViews().catch(console.error);
