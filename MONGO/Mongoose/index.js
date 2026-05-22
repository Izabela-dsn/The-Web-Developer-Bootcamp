const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookStore')
    .then(() => { console.log('MONGO CONNECTION OPEN!!!') })
    .catch(err => {
        console.log('OH NO MONGO CONNECTION ERROR!!!!')
        console.log(err)
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//Schema
const bookSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        rating: String,
        score: Number
    }
)
// singular and capitalized the first letter model name
// if we do one instance we need to use .save() method to save it to the database
const Book = mongoose.model('Book', bookSchema)
// const newBook1 = new Book({ title: 'The Great Gatsby', year: 1925, rating: 'PG-13', score: 8.5 })
// const newBook2 = new Book({ title: 'Sapiens', year: 2023, rating: 'PG-13', score: 9 })

Book.insertMany([
    { title: 'The Catcher in the Rye', year: 1951, rating: 'PG-13', score: 7.5 },
    { title: 'To Kill a Mockingbird', year: 1960, rating: 'PG-13', score: 9.5 },
    { title: '1984', year: 1949, rating: 'PG-13', score: 9 },
    { title: 'The Lord of the Rings', year: 1954, rating: 'PG-13', score: 9.5 },
    { title: 'Court of Thorns and Roses', year: 2015, rating: 'PG-16', score: 8.5 },
    { title: 'Throne of Glass', year: 2012, rating: 'PG-16', score: 8 },
])
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log('OH NO ERROR!');
        console.log(err);
    })

// to see in mongo db: type db.books.find() in the mongo shell

// In mongo shell

// updating one book
// Book.updateOne({title: 'The Catcher in the Rye'}, {$set: {score: 8}})

// deleting one book
// Book.deleteOne({title: 'The Catcher in the Rye'})

// deleting all books with rating PG-16
// Book.deleteMany({rating: 'PG-16'})

// get data back .then(b => console.log(b)) in the mongo shell