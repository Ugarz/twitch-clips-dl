const puppeteer = require('puppeteer');

async function getVideo(url, title, index) {
  // TODO: dl clips in folder
  const browserOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `clips/${index}-${title}.png` })

  await browser.close();
}

module.exports = {
  getVideo
}