const moment = require ('moment')
const Model = require ('../models/Transaction')

const walletCredit = async (req, res) => {

  if (!req.body && !req.params) {
    return res.redirect (403, '/403')
  }

  const mobileNumber = req.params.mobileNumber

  let total = 0
  const transactions = await Model.find ({ mobileNumber })
  transactions.forEach ((t) => {
    if (t.status === 'Approved') {
      if (t.type === 'credit' || t.type === 'p2p')
        total += t.amount
      else
        total -= t.amount
    }
  })

  res.send ({
    value: total,
    date: moment ().toDate (),
    success: true
  })

}

const findTransaction = async (req, res) => {

  if (!req.body && !req.params) {
    return res.redirect (403, '/403')
  }

  const mobileNumber = req.params.mobileNumber
  const pageNumber = req.params.pageNumber
  const maxCount = req.params.maxCount

  const transactions = await Model.find ({ mobileNumber })
    .sort ({ 'updatedAt': -1 })
    .limit (parseInt (maxCount))
    .skip (parseInt (maxCount) * parseInt (pageNumber - 1))

  res.send ({
    entries: transactions,
    date: moment ().toDate (),
    success: true
  })
}


const addEntry = async (req, res) => {

  if (!req.body) {
    return res.redirect (403, '/403')
  }

  const mobileNumber = req.body.mobileNumber
  const message = req.body.message
  const type = req.body.type
  const status = req.body.status
  if (!mobileNumber || !message || !type || !status) {
    return res.redirect (403, '/403')
  }
  const amount = parseFloat (req.body.amount)
  if (!amount) {
    return res.send ({
      success: false,
      message: 'Please enter a valid amount',
      date: moment ().toDate ()
    })
  }

  const data = { mobileNumber, amount, message, type, status }

  const transaction = await Model.create (data)
  if (!transaction) {
    console.error (`${ moment ().format (process.env.DTF) } Error while adding a transaction: `, data)
    return res.redirect (500, '/500')
  }

  res.send ({
    success: true,
    date: moment ().toDate ()
  })

}

module.exports = { addEntry, findTransaction, walletCredit }