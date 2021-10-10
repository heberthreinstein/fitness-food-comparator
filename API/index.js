const app = require('express')();
const mongodb = require('../API/mongodb');

const PORT = 8080;

app.listen(PORT, () => console.log(`API Running on port ${PORT}`))

app.get('/', (req, res) => {
    res.status(200).send('Fullstack Challenge 2021!')
})

app.get('/products', async (req, res) => {
    const products = await mongodb.collection.find().toArray();
    res.send(products);
})

app.get('/products/:code', async (req, res) => {
    querry = {barcode: req.params.code}
    const products = await mongodb.collection.findOne(querry);
    res.send(products);
})