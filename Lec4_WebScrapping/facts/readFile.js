const fs = require ('fs');
const cheerio = require ('cheerio');

let fileKaData = fs.readFileSync("./index.html");
// console.log(fileKaData+'');

let ch = cheerio.load(fileKaData);
// console.log(ch);

let pTags = ch('.main');
// console.log(pTags);

// The text derived from the object created by the cheerio 
console.log(ch(pTags['0']).text());
