# Simple Nodejs Express Restful Api

A comprehensive and beginner-friendly guide to creating RESTful APIs with the popular Node.js framework, Express.js. This project provides a step-by-step tutorial, code samples, and best practices for designing and implementing robust APIs. Whether you're a novice or an experienced developer, get started quickly and efficiently with ExpressRESTAPIs and streamline your API development workflow.


1. Start project with 'npm init' and enter basic details about project.

2. Create 'index.js' file in folder.

3. Install express modules in folder with command 'npm i express'. you can also install nodemon 'npm i nodemon' for live changes to to run server. 

### 1. Create First Route

In we create simple route for get all products using GET request. 

```
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

```

### 2. Handle Route Params

With params we can use addional paramter to request for filter and other uses.

```
app.get('/api/product/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The Product with the given ID was not found.');
    res.send(product);
});

```

### 3. Handle POST Request to Add Product 

Using POST request to add more product, I using JSON data with POST request.

```
app.use(express.json());

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


// Validate Request Data

function validateProduct(product) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      price: Joi.number().min(1).required()
    });
  
    return schema.validate(product);
}

```

### 4. Handle PUT Request and Update Product With ID

Using JSON data to update products with specific ID

```
app.put('/api/product/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The product with the given ID was not found.');
  
    const { error } = validateProduct(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    product.name = req.body.name; 
    product.price = req.body.price; 
    res.send(product);
});

```

### 4. Handle DELETE Request and DELETE Product With ID


```
app.delete('/api/product/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The Product with the given ID was not found.');
  
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(products);
});

```

### 5. Basic Middleware 