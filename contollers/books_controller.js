const express = require('express');
const { get } = require('express/lib/response');

const books = express.Router();
const Book = require('../models/book.js')
// seed data 
// books.get('/seed', (req, res) => {
//     Book.insertMany([{
//         "title": "The Shinobi Initiative",
//         "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
//         "year": 2014,
//         "quantity": 10,
//         "imageURL": "https://imgur.com/LEqsHy5.jpeg"
//       },
//       {
//         "title": "Tess the Wonder Dog",
//         "description": "The tale of a dog who gets super powers",
//         "year": 2007,
//         "quantity": 3,
//         "imageURL": "https://imgur.com/cEJmGKV.jpg"
//       },
//       {
//         "title": "The Annals of Arathrae",
//         "description": "This anthology tells the intertwined narratives of six fairy tales.",
//         "year": 2016,
//         "quantity": 8,
//         "imageURL": "https://imgur.com/VGyUtrr.jpeg"
//       },
//       {
//         "title": "W∀RP",
//         "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
//         "year": 2010,
//         "quantity": 4,
//         "imageURL": "https://imgur.com/qYLKtPH.jpeg"
//       }])
//         .then(res.status(200).json({
//             message: 'Seed successful'
//         }))
//         .catch(res.status(400).json({
//             message: 'Seed unsuccessful'
//         }))
// })

books.get('/', (req, res) => {
    Book.find()
    .then((foundBooks) => res.json(foundBooks))
    .catch(err => {
        res.status('404').json('404')
    })
})



// random cause why not 
books.get('/random', async (req, res) => {
    let count = Book.countDocuments()
    let random = Math.floor(Math.random * count)
    Book.findOne().skip(random).then(
        foundBooks => {res.json(foundBooks)}
    )
})
//add book
books.post('/', (req, res) => {
    Book.create(req.params)
    .then(() => {
        res.status('202').json("Book added")
    }).catch(err => {
        res.json(`Creation Error:${err}`)
    })
}) 
// find and update 
books.patch('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id)
})


// Delete 
books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(()=>{res.status('202').json('Deleted')})
    .catch(err => {res.status('404').json(`Error on Delete:${err}`)})
})



module.exports = books;