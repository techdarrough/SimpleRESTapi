// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log(`Connected to ${process.env.MONGO_URI}`) }
)

app.use('/books', require('./contollers/books_controller'))

app.get ('/', (req, res) => {
    res.send('Welcome to the books API')
})

app.listen(PORT, () => {
    console.log(`App listening on port:${PORT}`)
})