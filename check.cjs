const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push('[CONSOLE] ' + msg.text()); });
  await page.goto('https://f39b86e7.netwit.pages.dev', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // Check computed styles of animated elements
  const styles = await page.evaluate(() => {
    const checks = [];
    ['.hero-eyebrow', '.hero-sub', '.hero-cta', '.hero-h1 .line', '.stat-card', '.step-card', '.metric-card'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        const s = window.getComputedStyle(el);
        checks.push({ sel, opacity: s.opacity, transform: s.transform, display: s.display });
      } else {
        checks.push({ sel, found: false });
      }
    });
    return checks;
  });
  
  // Check if GSAP is loaded
  const gsapLoaded = await page.evaluate(() => typeof window.gsap !== 'undefined' || document.querySelector('script[src*="gsap"]') !== null);
  
  console.log('Errors:', errors);
  console.log('Styles:', JSON.stringify(styles, null, 2));
  console.log('GSAP loaded:', gsapLoaded);
  await browser.close();
})();
