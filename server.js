const port = 3000;

console.log('js start')
const puppeteer = require('puppeteer');
const express = require('express');
const validator = require('validator');
const { ReadableStream } = require('web-streams-polyfill');
global.ReadableStream = ReadableStream;


const app = express();

app.get('/', async (req, res) => {
  let emoji = getHappyEmoji();
  console.log('Sending greeting ' + emoji);
  res.send('Have a nice day! '+ emoji);
});

app.get('/pdf/:report_id/', async (req, res) => {
  //const report_id = validator.escape(req.params.report_id);
  const report_id = 'ufaiFlheLF';


  console.log('function start')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Loading page');
  await page.goto('https://form.betaversion.se/#/report/'+report_id, {
    waitUntil: 'networkidle0',
  });
  
  console.log('Generating pdf');
  const pdfBuffer = await page.pdf({
    path: 'test.pdf',
    displayHeaderFooter: false,
    format: 'A4',
    landscape: true,
    printBackground: true,
    outline: true // experimental
  });

  console.log('Browser has ' + (await browser.pages()).length + ' pages');
  console.log((await browser.pages()));
  await browser.close();
  console.log('Browser is closed, going to send respone.');
  res.contentType('application/pdf');
  res.send(pdfBuffer);
});

const happyEmojis = ['🌞', '✨', '🌼', '🤸‍♂️', '☕', '🐶', '🍌', '🤠', '🤓', '👽', '🦄', '🦚'];

function getHappyEmoji() {
    return happyEmojis[Math.floor(Math.random()*happyEmojis.length)];
}

app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port} ` + getHappyEmoji());
});