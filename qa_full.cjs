const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => pageErrors.push(err.message));

  console.log('=== QA STARTED ===\n');

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const title = await page.title();
  const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
  console.log('Page title:', title);
  console.log('H1 text:', h1);

  const sections = ['hero', 'about', 'features', 'how', 'metrics', 'testimonials', 'contact'];
  const sectionResults = {};
  for (const id of sections) {
    const el = await page.$('#' + id);
    const rect = el ? await el.boundingBox() : null;
    sectionResults[id] = { exists: !!el, height: rect?.height, width: rect?.width, visible: rect ? rect.height > 0 : false };
  }
  console.log('\n--- Sections ---');
  console.log(JSON.stringify(sectionResults, null, 2));

  await page.waitForTimeout(2500);
  const heroStyles = await page.evaluate(() => {
    const checks = [];
    ['.hero-eyebrow', '.hero-sub', '.hero-cta', '.hero-h1 .line', '.hero-clip'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        const s = window.getComputedStyle(el);
        checks.push({ sel, opacity: parseFloat(s.opacity), transform: s.transform, display: s.display });
      } else {
        checks.push({ sel, found: false });
      }
    });
    return checks;
  });
  console.log('\n--- Hero Animation Styles (after 2.5s) ---');
  console.log(JSON.stringify(heroStyles, null, 2));

  const libsLoaded = await page.evaluate(() => ({
    gsap: typeof window.gsap !== 'undefined',
    scrollTrigger: typeof window.ScrollTrigger !== 'undefined'
  }));
  console.log('\n--- Libraries (global) ---');
  console.log(JSON.stringify(libsLoaded));

  // GSAP is bundled in production; check via React component mounted
  const reactMounted = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root && root.children.length > 0;
  });
  console.log('React mounted:', reactMounted);

  console.log('\n--- Scroll Animation Checks ---');
  const scrollResults = {};

  for (const id of sections) {
    const exists = await page.evaluate((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return true;
      }
      return false;
    }, id);

    if (!exists) { scrollResults[id] = { exists: false }; continue; }
    
    await page.waitForTimeout(1000); // let scroll-trigger animations fire
    
    const keyEls = await page.evaluate((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return null;
      const selectors = ['[class*="eyebrow"]', '[class*="title"]', '[class*="card"]', '[class*="feat-"]'];
      let results = [];
      selectors.forEach(sel => {
        section.querySelectorAll(sel).forEach(el2 => {
          if (results.length < 4) {
            results.push({
              class: el2.className.substring(0, 40),
              opacity: window.getComputedStyle(el2).opacity
            });
          }
        });
      });
      return results.slice(0, 4);
    }, id);
    
    scrollResults[id] = { exists: true, keyElements: keyEls };
    console.log('Section #' + id + ':', JSON.stringify(scrollResults[id]));
  }

  console.log('\n--- Console Errors ---');
  console.log('Count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log('Errors:', consoleErrors);

  console.log('\n--- Page Errors ---');
  console.log('Count:', pageErrors.length);
  if (pageErrors.length > 0) console.log('Errors:', pageErrors);

  console.log('\n=== QA SUMMARY ===');
  const allSectionsExist = Object.values(sectionResults).every(s => s.exists);
  const noErrors = consoleErrors.length === 0 && pageErrors.length === 0;
  const heroAnimated = heroStyles.length > 0 && heroStyles.every(s => s.found === false || parseFloat(s.opacity) > 0);
  
  console.log('All sections exist:', allSectionsExist);
  console.log('Zero console/page errors:', noErrors);
  console.log('Hero elements animated (opacity > 0):', heroAnimated);
  console.log('Total console errors:', consoleErrors.length);
  console.log('Total page errors:', pageErrors.length);
  console.log('RESULT:', noErrors && allSectionsExist ? 'PASS' : 'FAIL');

  await browser.close();
  process.exit(noErrors && allSectionsExist ? 0 : 1);
})();
