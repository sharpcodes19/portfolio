const mailer    = require ('../../../mailer');
const model     = require ('../../../models/message');
const moment    = require ('moment');

const send = async (req, res) => {
  const message = req.body;
  if (!message) {
    return res.send ({
      success: false,
      message: 'I cannot send this kind of message to my developer.',
      date: moment ().toDate ()
    });
  }
  
  await model.create ({ 
    email: message.email,
    ip: req.clientIp
  }).then ((_data) => {
      message.to = process.env.DEV_EMAIL_ADDRESS;
      message.subject = `Portfolio Message | ${ message.from }`;
      mailer.send (message)
      .then ((data) => {
        console.log (data)
        res.send ({
          message: 'Your message has been sent. My developer will try to response as soon as he read this message. Thank you.',
          success: true,
          date: moment ().toDate ()
        });
      })
    })
}

module.exports = { send }