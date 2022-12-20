const mongoose = require('mongoose')

const ArrivalTimesSchema = new mongoose.Schema({
  postcodeArrivalTimes: {
    type: Object,
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
})

module.exports = mongoose.model('ArrivalTimes', ArrivalTimesSchema)
