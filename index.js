const express = require('express');
const app = express();

const products = [
    { id: 1, name: 'Iphone 15', price : '520' },  
    { id: 2, name: 'Samsung S21', price : '500' },  
    { id: 3, name: 'Nokia L3', price : '370' },  
];

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/product/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The Product with the given ID was not found.');
    res.send(product);
});
  

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listiening on port ${port}....`))