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
  
  message.to = process.env.DEV_EMAIL_ADDRESS;
  message.subject = `Portfolio Message | ${ message.from }`;

  await model.create ({ 
    email: message.email,
    ip: req.clientIp,
    content: {
      subject: message.subject,
      message: message.html,
    }
  }).then ((_) => {
    if (process.env.TRANSFER_MESSAGE_TO_EMAIL.toLowerCase () === 'true') {
      const mailer = require ('../../../mailer');
      return mailer.send (message)
      .then (() => {
        return res.send ({
          message: 'Your message has been sent. My developer will try to response as soon as he read this message. Thank you.',
          success: true,
          date: moment ().toDate ()
        });
      });
    } 
    return res.send ({
      message: 'Your message has been sent. My developer will try to response as soon as he read this message. Thank you.',
      success: true,
      date: moment ().toDate ()
    });
  })
}

module.exports = { send }