const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  postCode: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  customerId: {
    type: String,
    required: true
  },
  workerId: {
    type: String,
    required: false
  },
  company: {
    type: String,
    required: true    
  },
  estimatedJobLengthHours: {
    type: String,
    required: true
  },
  estimatedJobLengthMinutes: {
    type: String,
    required: true
  }, 
  archived: {
    type: Boolean,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Job', JobSchema)
