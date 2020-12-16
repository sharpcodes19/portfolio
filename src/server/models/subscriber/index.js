const mongoose = require ('mongoose');

const schema = new mongoose.Schema ({

  email: {
    type: String,
    required: true,
    trim: true
  },

  ip: {
    type: String,
    required: true,
    trim: true
  },

  addedAt: {
    type: Date,
    default: new Date (),
    required: true
  }

});

module.exports = mongoose.model ('subscriber', schema, 'subscriber');