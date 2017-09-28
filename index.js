const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

  const app = express();
  app.use(bodyParser.json());

  app.post('/',async (request, response) => {
    if (request.headers['content-type'] && !request.headers['content-type'].includes('application/json')) { return response.sendStatus(406); }
    if (!request.body.url) { return response.sendStatus(400); }

    const page = await browser.newPage();
    await page.setRequestInterceptionEnabled(true);
    page.on('request', (request) => {
      if (/Stylesheet|Image|Media|Font/i.test(request.resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });
    await page.goto(request.body.url);
    const title = await page.title();
    const url = await page.url();
    page.close();

    response.json({
      url: url,
      title: title,
    });
  });

  app.listen(8080);
})();
