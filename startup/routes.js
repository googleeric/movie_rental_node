const express = require('express')
const courses = require('../routes/courses')
const home = require('../routes/home')
const customers = require('../routes/customers')
const rentals = require('../routes/rentals')
const movies = require('../routes/movies')
const genres = require('../routes/genres')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middleware/error')

module.exports = function(app){
    app.use(express.json())
    app.use('/',home)
    app.use('/api/courses',courses)
    app.use('/api/customers', customers)
    app.use('/api/rentals', rentals)
    app.use('/api/movies', movies)
    app.use('/api/genres', genres) 
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    //Log Exception
    app.use(error)
}