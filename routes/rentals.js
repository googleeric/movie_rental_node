const express = require('express')
const router = express.Router()
const {Rental, validate} = require('../models/rental')
const{Customer} = require('../models/customer')
const { Movies } = require('../models/movie')
const Fawn = require('fawn')

Fawn.init("mongodb://localhost:27017/playground")

router.get('/', async (req, res) =>{
    const rentals = await Rental.find()
    res.send(rentals)
})

router.post('/', async (req, res) =>{
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        return res.status(400).send('Invalid Customer')
    }
    const movie = await Movies.findById(req.body.movieId)
    if(!movie){
        return res.status(404).send('Invalid Movie')
    }
    if(movie.numberInStock === 0){
        return res.status(400).send('Movie Out of Stock')
    } 
    let rental = new Rental({
        customer:{
            _id : customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie:{
            _id: movie._id,
            title:movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    //TWO PHASE COMMIT (FAWN METHOD)
    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id},{
                $inc: {numberInStock : -1}
            })
            .run()
        res.send(rental)
    }
    catch(ex){  
        res.status(500).send('Something Failed')
    }
    
    // rental = await rental.save()
    // movie.numberInStock--;
    // movie.save()
    // res.send(rental)
})

module.exports = router