const mongoose = require ('mongoose');
const schema = new mongoose.Schema ({

  email: {
    type: String,
    trim: true,
    required: true
  },
  
  ip: {
    type: String,
    trim: true,
    required: true
  },

  dateAdded: {
    type: Date,
    default: new Date (),
    required: true
  }

})

module.exports = mongoose.model ('message', schema, 'message');