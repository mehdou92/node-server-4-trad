const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

var app = express();

app.use(cors());

app.get('/trad/:words', function(req, res) {
   const words = req.params.words;

   res.send('get the correct route');

    async function run(keyword, fromLanguage, toLanguage) {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
        const page = await browser.newPage();

        const paramsUrl = keyword.replace(/\s+/g, '%20');
        console.log(paramsUrl);

        const base = 'https://www.deepl.com/translator#';
        const url = base.concat(fromLanguage,'/',toLanguage,'/',paramsUrl);

        await page.goto(url);

        await page.waitFor(1500);

        const resultTrad = await page.$eval('.lmt__target_textarea', el => el.value);
        console.log(resultTrad);

        const obj = {
            lang: toLanguage,
            result: resultTrad,
        };

        const json = JSON.stringify(obj);

        fs.writeFile(
            './json/result-'+toLanguage+'.json',
            json,
            'utf-8',
            (err) => err ? console.error('Data not written!', err) : console.log('Data written')
        );

        browser.close();
    }

    run(words, 'fr', 'en');
    run(words, 'fr', 'de');
    run(words, 'fr', 'es');
    run(words, 'fr', 'it');
    run(words, 'fr', 'nl');
    run(words, 'fr', 'pt');


});
app.listen('8081');
