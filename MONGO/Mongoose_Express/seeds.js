const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/shoppingApp', {
})
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const seedProducts = [
    {
        name: 'Apple',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Broccoli',
        price: 2.49,
        category: 'vegetable'
    },
    {
        name: 'Milk',
        price: 3.49,
        category: 'dairy'
    },
    {
        name: 'Banana',
        price: 0.99,
        category: 'fruit'
    },
    {
        name: 'Carrot',
        price: 1.29,
        category: 'vegetable'
    }
];


Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res);
        console.log('Products seeded successfully');
    })
    .catch((err) => {
        console.error('Error seeding products:', err);
    })
    .finally(() => {
        mongoose.connection.close();
    });