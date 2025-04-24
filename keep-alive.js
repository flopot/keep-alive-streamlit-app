const puppeteer = require('puppeteer');
const PAGE_LOAD_GRACE_PERIOD_MS = 20000; // Increased further to 20 sec
const WAKE_UP_BUTTON_TEXT = "Yes, get this app back up!"; // Correct button text

const urls = [
  'https://bulk-seo-content-brief-generator.streamlit.app/',
  'https://csv-merger.streamlit.app/',
  'https://semrush-keyword-gap-automation.streamlit.app/',
  'https://sitemaps-scraper.streamlit.app/',
  'https://bulk-chatgpt.streamlit.app/',
  'https://status-code-checker.streamlit.app/',
  'https://huggingface.co/spaces/Flopot2/keyword-clusterizer'
];

(async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  for (const url of urls) {
    const page = await browser.newPage();
    console.log(`Visiting ${url}`);
    await page.goto(url);
    await page.waitForTimeout(PAGE_LOAD_GRACE_PERIOD_MS);

    const checkForHibernation = async (target) => {
      console.log(`Checking for hibernation button on ${url}`);
      const [button] = await target.$x(`//button[contains(., '${WAKE_UP_BUTTON_TEXT}')]`);
      if (button) {
        console.log(`Found hibernation button on ${url}. Attempting to wake up!`);
        await button.click();
        // Wait for a few seconds after clicking
        await page.waitForTimeout(5000);
      } else {
        console.log(`No hibernation button found on ${url}`);
      }
    };

    await checkForHibernation(page);
    for (const frame of page.frames()) {
      await checkForHibernation(frame);
    }
    await page.close();
  }

  await browser.close();
})();
