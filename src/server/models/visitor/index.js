const mongoose = require ('mongoose');
const schema = new mongoose.Schema ({

  ip: {
    type: String,
    required: true,
    trim: true
  },
  addedAt: {
    type: Date,
    default: new Date (),
    required: true
  },
  agent: {
    isMobile: {
      type: Boolean,
      required: true
    },
    isDesktop: {
      type: Boolean,
      required: true
    },
    browser: {
      type: String,
      trim: true,
      required: true
    },
    os: {
      type: String,
      trim: true,
      required: true
    },
    platform: {
      type: String,
      trim: true,
      required: true
    }
  }

});

module.exports = mongoose.model ('visitor', schema, 'visitor');