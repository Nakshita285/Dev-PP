const request = require("request");
const fs = require('fs');
const cheerio = require('cheerio');


let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url , function(error , reponse, body){
    // let homeFile = fs.writeFileSync("./home.html" , body+"");
    parseBody(body);
});

function parseBody(html){
    let htmlFile = cheerio.load(html);
    let pTag = htmlFile('a[data-hover="View All Results"]').text();
    console.log(pTag);
}