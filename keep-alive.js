const puppeteer = require('puppeteer');
const PAGE_LOAD_GRACE_PERIOD_MS = 10000;
const WAKE_UP_BUTTON_TEXT = "Yes, get this app back up!";

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

console.time("⏱ Total run time");

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  await Promise.all(urls.map(async (url) => {
    const page = await browser.newPage();
    console.time(`⏳ ${url}`);

    try {
      console.log(`🔗 Visiting: ${url}`);
      await page.goto(url, {
        timeout: 20000,
        waitUntil: 'domcontentloaded'
      });

      await page.waitForTimeout(PAGE_LOAD_GRACE_PERIOD_MS);

      const checkForHibernation = async (target) => {
        const [button] = await target.$x(`//button[contains(., '${WAKE_UP_BUTTON_TEXT}')]`);
        if (button) {
          console.log(`🟡 Hibernation button found on ${url}. Clicking...`);
          await button.click();
          await page.waitForTimeout(3000);
        } else {
          console.log(`✅ No hibernation button found on ${url}`);
        }
      };

      await checkForHibernation(page);
      for (const frame of page.frames()) {
        await checkForHibernation(frame);
      }

    } catch (err) {
      console.error(`❌ Error on ${url}: ${err.message}`);
    } finally {
      console.timeEnd(`⏳ ${url}`);
      await page.close();
    }
  }));

  await browser.close();
  console.timeEnd("⏱ Total run time");
})();
