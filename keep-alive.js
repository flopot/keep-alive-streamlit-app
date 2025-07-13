const puppeteer = require('puppeteer');
const WAIT_MS = 10_000;
const BTN_TEXT = 'Yes, get this app back up!';

const urls = [
  'https://bulk-seo-content-brief-generator.streamlit.app/',
  'https://csv-merger.streamlit.app/',
  'https://semrush-keyword-gap-automation.streamlit.app/',
  'https://sitemaps-scraper.streamlit.app/',
  'https://bulk-chatgpt.streamlit.app/',
  'https://status-code-checker.streamlit.app/',
  'https://huggingface.co/spaces/Flopot2/keyword-clusterizer',
  'https://huggingface.co/spaces/Flopot2/404-redirect-mapper'
];

console.time('⏱ run');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  await Promise.all(urls.map(async (url) => {
    const page = await browser.newPage();
    console.time(`⏳ ${url}`);
    try {
      await page.goto(url, { timeout: 20_000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(WAIT_MS);

      const findAndClick = async (ctx) => {
        const [btn] = await ctx.$x(`//button[contains(., '${BTN_TEXT}')]`);
        if (btn) { await btn.click(); await page.waitForTimeout(3_000); }
      };

      await findAndClick(page);
      for (const frame of page.frames()) await findAndClick(frame);
      console.log(`✅ ${url}`);
    } catch (e) {
      console.error(`❌ ${url} – ${e.message}`);
    } finally {
      console.timeEnd(`⏳ ${url}`);
      await page.close();
    }
  }));

  await browser.close();
  console.timeEnd('⏱ run');
})();
