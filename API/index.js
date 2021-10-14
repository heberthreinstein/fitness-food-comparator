const app = require('express')();
const mongodb = require('../API/mongodb');
const integration = require('../Integration/integration');

const PORT = 8080;

var cron = require('node-cron');

cron.schedule('0 3 * * *', function(){
    console.log('Running integration');
    integration.run();
});

app.listen(PORT, () => console.log(`API Running on port ${PORT}`))

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('Fullstack Challenge 2021!')
})

app.get('/products', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const products = await mongodb.collection.find().toArray();
    res.send(products);
})

app.get('/products/:code', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    querry = {barcode: req.params.code}
    const products = await mongodb.collection.findOne(querry);
    res.send(products);
})