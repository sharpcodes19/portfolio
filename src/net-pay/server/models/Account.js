const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const { Schema } = mongoose

const schema = new Schema ({

  code: String,
  authToken: String,
  mobileNumber: {
    type: String,
    unique: true,
    required: true
  },

  password: String,

  name: {
    given: String,
    family: String,
    middle: String
  },

  address: {
    houseNo: String,
    street: String,
    province: String,
    city: String,
    zipCode: String
  },
  bank: {
    name: String,
    province: String,
    city: String,
    cardHolder: String,
    cardNumber: String
  },

  image: {
    profileUrl: String,
    validIDUrl: String
  },

  verified: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    csr: String
  }

}).pre ('save', function (next) {
  if (this.password) {
    this.password = bcrypt.hashSync (this.password, parseInt (process.env.BCRYPT_PASSWORD_SALT_ROUNDS.trim ()))
  }
  next ()
})

module.exports = mongoose.model ('account', schema, 'account')