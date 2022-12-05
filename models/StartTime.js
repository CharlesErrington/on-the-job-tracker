const mongoose = require('mongoose')

const StartTimeSchema = new mongoose.Schema({
  startTime: {
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

module.exports = mongoose.model('StartTime', StartTimeSchema)
