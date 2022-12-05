const mongoose = require('mongoose')

const FinishTimeSchema = new mongoose.Schema({
  finishTime: {
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

module.exports = mongoose.model('FinishTime', FinishTimeSchema)
