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

async function getProductData(productUrl){
    return await axios.get(productUrl).then(response => {
        html = response.data;
        const barcode = $('#barcode', html).text();
        const quantity = $('#field_quantity_value', html).text();
        const packaging = $('#field_packaging_value', html).text();;
        var brands = [];
        $('#field_brands_value > a', html).each((index, value) => {
            brands.push($(value).text());
        });
        var categories = [];
        $('#field_categories_value > a', html).each((index, value) => {
            categories.push($(value).text());
        });
        const imported_t = new Date();
        const status = 'imported';

        return {barcode, quantity, packaging, brands, categories, imported_t, status}
    });
}

async function getProductJson(position){
    const a = $(productsList[position]).children('a');
    const title = a.attr('title');
    const productUrl = a.attr('href');
    const status = 'draft';
    console.log('Getting data of ' + title);
    await getProductData(url + productUrl).then((productData) => {
        products.push({title, productUrl, ...productData});
        console.log('Successful aquired product data')
    }).catch((err) => {
        console.log('Error aquiring product data')
        console.log(err);
        products.push({title, productUrl, status});
    });

    if (count < 5) await getProductJson(++count);
}

getProductsList().then((list) => {
    productsList = list;
    getProductJson(0).then( () => {
        console.log(products);
    });
}).catch(err => console.log(err))


app.listen(
    PORT,
    () => console.log(`Running on port: ${PORT}`)
)

