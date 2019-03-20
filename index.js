const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

var date = '20180201__20190301';
//let id = '128838707';
//let edition = 'fr-fr';
var key = '6e7f71b0fa1b4f3f98c4e7299b804a61';
var token = 'fe52d00f06904e26a1cb2c0ad9791fa3';

const url = 'https://api.ozae.com/gnw/articles?date=20190317__20190317&key=6e7f71b0fa1b4f3f98c4e7299b804a61&edition=fr-fr&query=paris&hard_limit=50&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';


var app = express();


app.use(cors());

app.get('/requestAll/:keyword/:date', function(req, res)
{
    const keyword = req.params.keyword;
    const date = req.params.date;

    const edition = 'fr-fr';

    const url = 'https://api.ozae.com/gnw/articles?date='+date+'&key='+key+'&edition='+edition+'&query='+keyword+'&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';

    console.log(url);

    axios.get(url)
        .then(function (response) {
            res.send(response.data.articles);
            // handle success
            console.log('REPONSE SERVER');
            console.log(response.data.articles);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
});


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
