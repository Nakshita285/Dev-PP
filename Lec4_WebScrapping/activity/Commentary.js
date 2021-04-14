const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');



let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";


// match-comment-long-text match-comment-padder 5 

request(url, callBack);

function callBack(error, response, data){
    // let writeHtmlFile = fs.writeFileSync('./commentry.html', data);
    // console.log(data);
    parseBody(data);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let selector ='#main-container > div.match-page-wrapper.commentary-page-wrapper > div.container > div.row > div.col-16.col-md-16.col-lg-12.main-content-x > div.match-body > div.comment-container > div.mb-5 > div > div:nth-child(1) > div.match-comment > div:nth-child(1) > div > p:nth-child(3)';
    let pTag = ch(selector);
    // console.log(pTag);
    console.log(ch(pTag['0']).text());

}



