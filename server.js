console.log('js start')
const puppeteer = require('puppeteer');
const { ReadableStream } = require('web-streams-polyfill');
global.ReadableStream = ReadableStream;


// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto('https://developer.chrome.com/');

//   // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

//   // Type into search box
//   await page.type('.devsite-search-field', 'automate beyond recorder');

//   // Wait and click on first result
//   const searchResultSelector = '.devsite-result-item-link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate',
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);

//   await browser.close();
// })();

(async () => {
  console.log('function start')
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto('https://tiigbg.se', { waitUntil: 'networkidle0' });
  // await page.pdf({ path: 'example.pdf', format: 'A4' });

  // console.log('PDF successfully created!');
  // await browser.close();  
  

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate the page to a URL.
  // await page.goto('https://tiigbg.se/', {
  //   waitUntil: 'networkidle2',
  // });
  console.log('Loading page');
  await page.goto('https://form.betaversion.se/#/report/ufaiFlheLF', {
    waitUntil: 'networkidle0',
  });
  
  console.log('Generating pdf');
  await page.pdf({
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

  // console.log('Going to save file.');
  // const file = new Parse.File('document.pdf', { base64: pdfBuffer.toString('base64') });
  // await file.save();

  // console.log('File saved!');
  // console.log(file.url());
})();

// Parse.Cloud.define("generatePdf", async (request) => {
//   const puppeteer = require('puppeteer');
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://your-quasar-website.com');
//   const pdfBuffer = await page.pdf({ format: 'A4' });
//   await browser.close();

//   const file = new Parse.File('document.pdf', { base64: pdfBuffer.toString('base64') });
//   await file.save();

//   return file.url(); // Return the URL of the saved PDF
// });