const express = require('express')
const router = express.Router()
const{Genre} = require('../models/genre')
const auth = require('../middleware/auth')

//const asyncMiddleware = require('../middleware/async')

router.get('/', async (req, res) =>{
    const genre = await Genre.find().sort('name')
    res.send(genre)
})

router.post('/', auth, async (req, res) =>{
    const genre = new Genre({
        name: req.body.name
    })

    await genre.save()
    res.send(genre);
    
})

module.exports = router