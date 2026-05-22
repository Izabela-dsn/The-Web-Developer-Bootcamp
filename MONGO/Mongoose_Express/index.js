const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = 3000;
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/shoppingApp', {
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log('products', { products });
        res.render('products/index', { products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
});

app.get('/products/new', (req, res) => {
    res.render('products/new');
});

app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log('Created new product:', newProduct);
        res.redirect(`/products`);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).send('Error creating product');
    } 
});

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('products/show', { product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product');
    }
});

app.get('/products/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('products/edit', { product });
    } catch (err) {
        console.error('Error fetching product for editing:', err);
        res.status(500).send('Error fetching product for editing');
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new : true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect(`/products/${id}`);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Error updating product');
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/products');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});