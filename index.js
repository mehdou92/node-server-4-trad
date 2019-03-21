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

app.get('/requestAll/:keyword/:date', function (req, res) {
    const keyword = req.params.keyword;
    const date = req.params.date;

    const editionFr = 'fr-fr';
    const editionFrBe = 'fr-be';
    const editionNlBe = 'nl-be';
    const editionUsNy = 'en-us-ny';
    const editionUsSf = 'en-us-sf';
    const editionUk = 'en-gb';
    const editionIt = 'it-it';
    const editionGe = 'ge-ge';
    const editionSp = 'es-es';
    const editionTr = 'tr-tr';
    const editionBr = 'pt-br';

    const urlFr = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionFr + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlFrBe = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionFrBe + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlNlbe = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionNlBe + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlUsNy = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionUsNy + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlUsSf = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionUsSf + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlUk = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionUk + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlIt = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionIt + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlGe = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionGe + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlSp = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionSp + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlTr = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionTr + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';
    const urlBr = 'https://api.ozae.com/gnw/articles?date=' + date + '&key=' + key + '&edition=' + editionBr + '&query=' + keyword + '&hard_limit=0&order%5Bcol%5D=article_score&order%5Bsrt%5D=DESC';

    function getEditionFr() {
        return axios.get(urlFr);
    }

    function getEditionFrBe() {
        return axios.get(urlFrBe);
    }

    function getEditionNlBe() {
        return axios.get(urlNlbe);
    }

    function getEditionUsNy() {
        return axios.get(urlUsNy)
    }
    function getEditionUsSf() {
        return axios.get(urlUsSf)
    }
    function getEditionUk(){
        return axios.get(urlUk);
    }
    function getEditionIt(){
        return axios.get(urlIt);
    }
    function getEditionGe(){
        return axios.get(urlGe);
    }
    function getEditionSp(){
        return axios.get(urlSp);
    }
    function getEditionTr(){
        return axios.get(urlTr);
    }
    function getEditionBr(){
        return axios.get(urlBr);
    }

    function customDataRequestAll(dataArticle) {
        if (dataArticle.data.articles[0]) {
            const objData = {
                id: dataArticle.data.articles[0].id,
                title: dataArticle.data.articles[0].name,
                date_first_seen: dataArticle.data.articles[0].date_first_seen,
                audience: dataArticle.data.articles[0].show_interval,
                country: dataArticle.data.articles[0].edition
            };
            return objData;
        }
    }

    axios.all([getEditionFr(), getEditionFrBe(), getEditionNlBe(), getEditionUsNy(), getEditionUsSf(), getEditionUk(), getEditionIt(), getEditionGe(), getEditionSp(), getEditionTr(), getEditionBr()])
        .then(function (response) {
            let tab = [];
            for(let i = 0; i < response.length; i+=1) {
                tab.push(customDataRequestAll(response[i]));
            }
            res.send(tab);
        })
        .catch(function (error) {
            console.log(error);
        })

});


app.get('/trad/:words', function (req, res) {
    const words = req.params.words;

    res.send('get the correct route');

    async function run(keyword, fromLanguage, toLanguage) {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false});
        const page = await browser.newPage();

        const paramsUrl = keyword.replace(/\s+/g, '%20');

        const base = 'https://translate.google.fr/#view=home&op=translate&sl=';
        const url = base.concat(fromLanguage, '&tl=', toLanguage, '&text=', paramsUrl);

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
            './json/result-' + toLanguage + '.json',
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
