const mongoose = require('mongoose')
const winston = require('winston')
const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = function(){    
    
    mongoose.connect(process.env.DB_HOST,{
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    })
    .then(() => winston.info(`Connected To ${process.env.DB_HOST}`))
}