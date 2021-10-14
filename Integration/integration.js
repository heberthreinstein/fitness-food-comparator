const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require('../API/mongodb');

url = 'https://world.openfoodfacts.org';
var productsList;
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
        const packaging = $('#field_packaging_value', html).text();
        const image = $('#og_image', html).attr('src');
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

        return {barcode, quantity, packaging, image, brands, categories, imported_t, status}
    });
}

async function getProductJson(position){
    if (position < productsList.length) { 
        const a = $(productsList[position]).children('a');
        const title = a.attr('title');
        const productUrl = a.attr('href');
        const status = 'draft';
        console.log('Getting data of ' + title);
        product = await getProductData(url + productUrl).then((productData) => {
            console.log('Successful aquired product data')
            return {title, productUrl, ...productData};
        }).catch((err) => {
            console.log('Error aquiring product data')
            console.log(err);
            return {title, productUrl, status};
        });
        await saveProduct(product);
    }
    if (count < 10) await getProductJson(++count);
}

async function saveProduct(product) {
    var query = { barcode: product.barcode }
    await mongodb.collection.findOneAndReplace(query, product, { upsert: true })
        .then(() => console.log('Saved product ' + product.title))
        .catch(err => console.log(err))

}

const run = () => {
    getProductsList().then((list) => {
    productsList = list;
    getProductJson(0).then( () => 
        console.log("======Importation Finished======"));
    }).catch(err => console.log(err))
}

module.exports = {run}