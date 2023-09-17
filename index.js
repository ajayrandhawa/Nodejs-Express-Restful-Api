const express = require('express');
const app = express();

const products = [
    { id: 1, name: 'Iphone 15', price : '520' },  
    { id: 2, name: 'Samsung S21', price : '500' },  
    { id: 3, name: 'Nokia L3', price : '370' },  
];

app.get('/api/products', (req, res) => {
    res.send(products);
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listiening on port ${port}....`))