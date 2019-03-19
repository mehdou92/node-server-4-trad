const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

var app = express();

app.use(cors());

app.get('/trad/:fromLanguage/:toLanguage/:words', function(req, res) {
   console.log(req.params.words);
   const words = req.params.words;
   const fromLanguage = req.params.fromLanguage;
   const toLanguage = req.params.toLanguage;

   res.send('get the correct route');

    async function run(keyword, fromLanguage, toLanguage) {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false});
        const page = await browser.newPage();

        const paramsUrl = keyword.replace(' ', '%20');
        console.log(paramsUrl);

        const base = 'https://www.deepl.com/translator#';
        const url = base.concat(fromLanguage,'/',toLanguage,'/',words);

        await page.goto(url);

        await page.waitFor(5000);

        const resultTrad = await page.$eval('.lmt__target_textarea', el => el.value);
        console.log(resultTrad);

        await page.screenshot({ path: 'screenshots/github.png' });


        browser.close();
    }

    run(words, fromLanguage, toLanguage);


});
app.listen('8081');
