require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')

module.exports = function(){

    winston.add(
        // new winston.transports.Console({
        //     colorize: true,
        //     prettyPrint: true
        // }),
        new winston.transports.File({ 
            filename: 'logfile.log',
            handleExceptions : true
        }));
    
    winston.add(new winston.transports.MongoDB( {
        db: 'mongodb+srv://animeal-eric:animeal123@cluster0.vbmrm63.mongodb.net/?retryWrites=true&w=majority',
        level: 'error',
        options: { useUnifiedTopology: true }
    }))
    
    process.on('unhandledRejection', (ex) =>{
        throw(ex);
    })    
}