const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const app = express();
app.use(express.json());

app.use(logger);
app.use(express.static('./public'))

const products = [
    { id: 1, name: 'Iphone 15', price : '520' },  
    { id: 2, name: 'Samsung S21', price : '500' },  
    { id: 3, name: 'Nokia L3', price : '370' },  
];

// GET ALL PRODUCTS
app.get('/api/products', (req, res) => {
    res.send(products);
});

// GET SPECIFIC PRODUCT
app.get('/api/product/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The Product with the given ID was not found.');
    res.send(product);
});

// INSERT NEW PRODUCT
app.post('/api/products', (req, res) => {
    const { error } = validateProduct(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const product = {
      id: products.length + 1,
      name: req.body.name,
      price : req.body.price
    };
    products.push(product);
    res.send(product);
});

// UPDATE PRODUCT
app.put('/api/product/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The product with the given ID was not found.');
  
    const { error } = validateProduct(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    product.name = req.body.name; 
    product.price = req.body.price; 
    res.send(product);
});


//DELETE PRODUCT
app.delete('/api/product/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The Product with the given ID was not found.');
  
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(products);
});
  

// VALIDATE REQUEST 
function validateProduct(product) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      price: Joi.number().min(1).required()
    });
  
    return schema.validate(product);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listiening on port ${port}....`))