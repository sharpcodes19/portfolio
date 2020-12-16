const moment = require ('moment');
const model = require ('../../../models/subscriber');

const add = (req, res) => {
  const email = req.body.email;
  const ip = req.clientIp;

  if (!email) {
    return res.send ({
      success: false,
      message: 'Cannot find your e-mail address. Please try subscribing later.',
      date: moment ().toDate ()
    });
  }
  model.create ({ email, ip })
    .catch ((ex) => console.error (`${ moment ().format (process.env.DTF_LOG ) } Error while adding subscriber's data.`, ex))
    .then ((_subscriber) => {
      res.send ({
        success: true,
        date: moment ().toDate (),
        message: 'Thank you for subscribing. We are going to e-mail when we have implementations or updates.'
      });
    });
}


module.exports = { add };