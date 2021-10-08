const axios = require('axios');
const cheerio = require('cheerio');

const app = require('express')();
const PORT = 8080;

url = 'https://world.openfoodfacts.org';
var productsList;
var products = []
var count = 0;
var $;

async function getProductsList(){
    return await axios.get(url).then(response => {
        html = response.data;
        $ = cheerio.load(html);
        return $('.products > li');
    }).catch(err => console.log(err));
}

function getProductData(productUrl){
    return await axios.get(url).then(response => {
        html = response.data;
        //TODO: Return product with all info
    });
}

function getProductJson(position){
    const a = $(productsList[position]).children('a');
    const title = a.attr('title');
    const url = a.attr('href');
    const status = 'draft';
    
    products.push({title, url, status});

    if (count < 99) getProductJson(count++);
}

getProductsList().then((list) => {
    productsList = list;
    getProductJson(0);
    console.log(products);
}).catch(err => console.log(err))


app.listen(
    PORT,
    () => console.log(`Running on port: ${PORT}`)
)

