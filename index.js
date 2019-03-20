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
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false});
        const page = await browser.newPage();

        const paramsUrl = keyword.replace(/\s+/g, '%20');

        const base = 'https://translate.google.fr/#view=home&op=translate&sl=';
        const url = base.concat(fromLanguage,'&tl=',toLanguage,'&text=',paramsUrl);

        await page.goto(url);

        await page.waitFor(5000);

        const resultTrad = await page.$eval('.tlid-translation > span:nth-child(1)', el => el.innerHTML);

        const obj = {
            lang: toLanguage,
            result: resultTrad,
        };

        const json = JSON.stringify(obj);

        console.log(json);

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
    run(words, 'fr', 'tr');


});
app.listen('8081');
