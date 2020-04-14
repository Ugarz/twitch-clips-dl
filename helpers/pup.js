const puppeteer = require('puppeteer');

async function getVideo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
}

module.exports = {
  getVideo
}