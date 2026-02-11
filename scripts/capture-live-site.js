const { chromium } = require('playwright');

async function captureLiveSite() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  // Navigate to live site
  console.log('Loading live site...');
  await page.goto('https://talentos-recruitmen-47.aura.build/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Take initial screenshot to see what's on the page
  await page.screenshot({ path: 'screenshots/live-home.png', fullPage: false });
  console.log('Captured: Home page');

  // Try to find and click Projects - look for button or link containing "Projects"
  console.log('Looking for Projects link...');

  // Try different selectors
  const projectsSelectors = [
    'button:has-text("Projects")',
    'a:has-text("Projects")',
    '[id*="project"]',
    'text=Projects',
    'span:has-text("Projects")'
  ];

  let clicked = false;
  for (const selector of projectsSelectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        await element.click();
        clicked = true;
        console.log(`Clicked using selector: ${selector}`);
        break;
      }
    } catch (e) {
      // Continue to next selector
    }
  }

  if (!clicked) {
    // Try navigating directly to projects URL
    console.log('Trying direct URL navigation...');
    await page.goto('https://talentos-recruitmen-47.aura.build/projects', { waitUntil: 'networkidle', timeout: 60000 });
  }

  await page.waitForTimeout(2000);

  // Capture the projects page
  await page.screenshot({ path: 'screenshots/live-projects-initial.png', fullPage: false });
  console.log('Captured: Projects initial view');

  // Now try to click through the tabs
  const tabs = ['Timeline', 'Gantt Chart', 'Calendar', 'Kanban Board', 'Roadmap'];

  for (const tab of tabs) {
    try {
      console.log(`Looking for ${tab} tab...`);

      // Try clicking the tab
      const tabSelectors = [
        `button:has-text("${tab}")`,
        `text="${tab}"`,
        `span:has-text("${tab}")`
      ];

      for (const selector of tabSelectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            await element.click();
            await page.waitForTimeout(800);
            break;
          }
        } catch (e) {
          // Continue
        }
      }

      const filename = tab.toLowerCase().replace(' ', '-');
      await page.screenshot({ path: `screenshots/live-${filename}.png`, fullPage: false });
      console.log(`Captured: ${tab}`);
    } catch (e) {
      console.log(`Failed to capture ${tab}: ${e.message}`);
    }
  }

  // Get the page HTML for the projects section
  console.log('\nGetting page HTML structure...');
  const html = await page.content();

  // Save the HTML
  const fs = require('fs');
  fs.writeFileSync('screenshots/live-page.html', html);
  console.log('Saved page HTML to screenshots/live-page.html');

  await browser.close();
  console.log('\nDone!');
}

captureLiveSite().catch(console.error);
