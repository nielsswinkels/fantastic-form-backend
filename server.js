const port = 3000;

console.log('js start')
const puppeteer = require('puppeteer');
const express = require('express');
const { ReadableStream } = require('web-streams-polyfill');
global.ReadableStream = ReadableStream;


const app = express();

app.get('/', async (req, res) => {
  let emoji = getHappyEmoji();
  console.log('Sending greeting ' + emoji);
  res.send('Have a nice day! '+ emoji);
});

app.get('/pdf/:report_id/', async (req, res) => {
  //const report_id = req.params.report_id;
  const report_id = 'ufaiFlheLF';


  console.log('function start')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Loading page');
  // =========================================
  // TODO !!! INJECTION SECURITY HOLE HERE?
  // =========================================
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
  return pdfBuffer.toString('base64');
});

const happyEmojis = ['🌞', '✨', '🌼', '🤸‍♂️', '☕', '🐶', '🍌', '🤠', '🤓', '👽', '🦄', '🦚'];

function getHappyEmoji() {
    return happyEmojis[Math.floor(Math.random()*happyEmojis.length)];
}

app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port} ` + getHappyEmoji());
});