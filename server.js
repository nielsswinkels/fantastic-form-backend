const port = 3000;

console.log('js start')
const puppeteer = require('puppeteer');
const express = require('express');
const validator = require('validator');
const cors = require('cors');
const { ReadableStream } = require('web-streams-polyfill');
global.ReadableStream = ReadableStream;


const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'https://form.betaversion.se']
}));

app.get('/', async (req, res) => {
  let emoji = getHappyEmoji();
  console.log('Sending greeting ' + emoji);
  res.send('Have a nice day! '+ emoji);
});

app.get('/pdf/:report_id/', async (req, res) => {
  //const report_id = validator.escape(req.params.report_id);
  const report_id = 'ufaiFlheLF';


  console.log('function start')
  // const browser = await puppeteer.launch(); // for running locally
  const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'}); // for docker
  const page = await browser.newPage();
  
  console.log('Loading page');
  const url = 'https://form.betaversion.se/#/report/'+report_id;
  console.log('going to url ' + url);
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });
  
  console.log('Generating pdf');
  
  const pdfBuffer = await page.pdf({
    // path: 'test.pdf',
    displayHeaderFooter: false,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: 0,
    timeout: 30000,
    outline: true // experimental
  });
  console.log('PDF Buffer Size:', pdfBuffer.length);
  console.log('Browser has ' + (await browser.pages()).length + ' pages');
  console.log((await browser.pages()));
  await browser.close();
  console.log('Browser is closed, going to send respone.');
  // Save PDF locally for inspection
  // const fs = require('fs');
  // fs.writeFileSync('test.pdf', pdfBuffer);

  // res.contentType('application/pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', pdfBuffer.length);
  // res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  res.end(pdfBuffer, 'binary');
});

const happyEmojis = ['🌞', '✨', '🌼', '🤸‍♂️', '☕', '🐶', '🍌', '🤠', '🤓', '👽', '🦄', '🦚'];

function getHappyEmoji() {
    return happyEmojis[Math.floor(Math.random()*happyEmojis.length)];
}

app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port} ` + getHappyEmoji());
});