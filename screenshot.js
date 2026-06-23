const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://ekovym.vercel.app/', { waitUntil: 'networkidle' });
  
  // Wait for 5 seconds to ensure any loading animations or skeleton screens are finished
  await page.waitForTimeout(5000);
  
  await page.screenshot({ path: 'C:\\Users\\cosmo\\job-apply\\Mohit_Portfolio_2026\\public\\images\\mockup-ekovym-desktop.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  // Wait another 2 seconds just in case responsive layout changes trigger animations
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'C:\\Users\\cosmo\\job-apply\\Mohit_Portfolio_2026\\public\\images\\mockup-ekovym-mobile.png' });

  await browser.close();
})();
