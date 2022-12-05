const mongoose = require('mongoose')

const StartLocationSchema = new mongoose.Schema({
  startLocation: {
    type: String,
    required: true,
  },
  workerId: {
    type: String,
    required: false
  },
  company: {
    type: String,
    required: true    
  },
  date: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('StartLocation', StartLocationSchema)
