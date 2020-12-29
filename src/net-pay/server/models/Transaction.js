const mongoose = require ('mongoose')
const { Schema } = mongoose

const schema = new Schema ({

  mobileNumber: String,
  amount: Number,
  message: String,
  type: String,
  status: String

}, { timestamps: true })

module.exports = mongoose.model ('transaction', schema, 'transaction')