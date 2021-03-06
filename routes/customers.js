const express = require('express')
const router = express.Router()
const {Customer, validateCustomer} = require('../models/customer')

router.get('/', async (req, res) =>{
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

router.post('/', async (req, res) =>{
    const {error} = validateCustomer(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const customer = new Customer({
        name : req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    await customer.save()
    res.send(customer)
})

module.exports = router