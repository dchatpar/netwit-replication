const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('https://f356f6e3.netwit.pages.dev', { waitUntil: 'networkidle', timeout: 30000 });
  
  const title = await page.title();
  const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
  
  // Check all sections exist
  const sections = await page.evaluate(() => {
    const ids = ['hero','about','features','how','metrics','testimonials','contact'];
    return ids.map(id => {
      const el = document.getElementById(id);
      const rect = el?.getBoundingClientRect();
      return { id, exists: !!el, height: rect?.height, visible: rect?.top < window.innerHeight };
    });
  });
  
  // Check elements are visible (not opacity:0)
  const visibleElements = await page.evaluate(() => {
    const checks = [];
    const h1 = document.querySelector('h1');
    if (h1) {
      const style = window.getComputedStyle(h1);
      checks.push({ el: 'h1', opacity: style.opacity, display: style.display, visibility: style.visibility });
    }
    // Check hero text
    const heroText = document.querySelector('.hero-eyebrow');
    if (heroText) {
      const style = window.getComputedStyle(heroText);
      checks.push({ el: '.hero-eyebrow', opacity: style.opacity });
    }
    // Check nav
    const nav = document.querySelector('nav');
    if (nav) {
      const style = window.getComputedStyle(nav);
      checks.push({ el: 'nav', display: style.display, position: style.position });
    }
    // Check footer
    const footer = document.querySelector('footer');
    if (footer) {
      const style = window.getComputedStyle(footer);
      checks.push({ el: 'footer', display: style.display });
    }
    return checks;
  });
  
  // Count videos and images
  const counts = await page.evaluate(() => ({
    videos: document.querySelectorAll('video').length,
    images: document.querySelectorAll('img').length,
    sections: document.querySelectorAll('section').length,
    forms: document.querySelectorAll('form').length,
    buttons: document.querySelectorAll('button').length,
  }));
  
  // Page height
  const bodyH = await page.evaluate(() => document.body.scrollHeight);
  
  console.log(JSON.stringify({ title, h1, bodyHeight: bodyH, errors, sections, visibleElements, counts }, null, 2));
  await browser.close();
})();
