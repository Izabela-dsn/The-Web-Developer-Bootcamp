const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => { console.log('MONGO CONNECTION OPEN!!!') })
    .catch(err => {
        console.log('OH NO MONGO CONNECTION ERROR!!!!')
        console.log(err)
    });

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive!']
        },
        onSale: {
            type: Boolean,
            default: false,
        },
        categories: [String],
        qty: {
            online: {
                type: Number,
                default: 0
            },
            inStore: {
                type: Number,
                default: 0
            }
        }
    })

const Product = mongoose.model('Product', productSchema)
// const product = new Product({ name: 'Mountain Bike', price: 1099 })
// const product = new Product({ name: 'Mountain Bike', price: 1099, color: 'purple' })
// in the price its not exactly a number but a type that can be cast as Number
// const product = new Product({ name: 'Mountain Bike', price: "1099" })
// const product = new Product({  price: 1099 })

// const product = new Product({ name: 'Bike Helmet', price: 29 })
/*
shopApp> db.products.find()
[
    {
        _id: ____,
        name: 'Mountain Bike',
        price: 1099,
        __v: 0
        },
        {
            _id: ____,
            name: 'Bike Helmet',
            price: 29,
            onSale: false,
            __v: 0
            }
            ]*/

// const product = new Product({ name: 'Bike Gloves', price: 29, categories: ['Cycling', 'Safety', 'Accessories'] })
/*
  {
    _id: ____,
    name: 'Bike Gloves',
    price: 29,
    onSale: false,
    categories: [ 'Cycling', 'Safety', 'Accessories' ],
    __v: 0
  }
*/

// const product = new Product({ name: 'Pedals', price: 19, categories: ['Cycling', 'Accessories'] })
/*
categories: [ 'Cycling', 'Accessories' ],
qty: { online: 0, inStore: 0 },

*/
// product.save()
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('OH NO ERROR!');
//         console.log(err);
//     })

Product.findOneAndUpdate({ name: 'Mountain Bike' }, { price: 899 }, { new: true, runValidators: true })
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log('OH NO ERROR!');
        console.log(err);
    })