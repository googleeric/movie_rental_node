// _id = 62a9902b827fc379063b4b4c
// 12 Bytes
    // 4 Bytes: timestamp
    // 3 Bytes: machine identifier
    // 2 Bytes: process identifier
    // 3 Bytes: counter 

const mongoose = require('mongoose')

const id = mongoose.Types.ObjectId()
console.log(id)

// Timestamp Through Id
console.log(id.getTimestamp().toLocaleDateString())
console.log(id.getTimestamp().toLocaleTimeString())

// Validate Object Id
const isValid = mongoose.Types.ObjectId.isValid('1234')
console.log(isValid)
