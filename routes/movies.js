const express = require('express')
const router = express.Router()
const {Movies, validateMovie} = require('../models/movie')
const{Genre} = require('../models/genre')

router.get('/', async (req, res) =>{
    const movies = await Movies.find().sort('-numberInStock')
    res.send(movies)
})

router.post('/', async (req, res) =>{
    const {error} = validateMovie(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.body.genreId)
    if(!genre){
        return res.status(404).send('Genre Id Invalid')
    }
    const movie = new Movies({
        title: req.body.title,
        genre: {
            _id : genre._id,
            name : genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save()
    res.send(movie);
    
})

module.exports = router