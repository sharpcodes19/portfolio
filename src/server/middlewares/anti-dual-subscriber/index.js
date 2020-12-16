const moment    = require ('moment');
const model     = require ('../../models/subscriber');

module.exports = (req, res, next) => {
  const email = req.body.email;
  model.findOne ({ email }, (err, entry) => {
    if (err) {
      return res.sendStatus (500);
    }
    if (entry) {
      return res.send ({
        success: false,
        message: 'This email address is already subscribing us.',
        date: moment ().toDate ()
      })
    }
    next ();
  });
}