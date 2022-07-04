const winston = require('winston')

function exceptionError(err, req, res, next){
    winston.error(err.message, err)

    // Logs Available to use
    // 1.error
    // 2.warn
    // 3.info
    // 4.verbos
    // 5.debug
    // 6.silly

    res.status(500).send(err.message)
}

module.exports = exceptionError