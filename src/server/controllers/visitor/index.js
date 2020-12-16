const moment    = require ('moment');
const model     = require ('../../models/visitor');
const message   = require ('./message');

const addVisitor = (req, res) => {
  const agent = req.useragent;
  const ip = req.clientIp;
  model.create ({ agent, ip })
    .catch ((ex) => console.error (`${ moment ().format (process.env.DTF_LOG ) } Error while adding visitor data.`, ex))
    .then (() => {
      res.send ({
        success: true,
        message: 'Welcome to Sharpcodes Portfolio.',
        date: moment ()
      })
    });
}

const subscriber = require ('./subscriber');

module.exports = { 
  addVisitor, 
  sendMail: message.send,
  subscribe: subscriber.add
}