const moment    = require ('moment');
const model     = require ('../../models/message');

module.exports = (req, res, next) => {
  const email = req.body.email;
  model.findOne ({ email }, null, {
    sort: {
      dateAdded: -1
    }
  }, (err, entry) => {
    if (err) {
      console.error (`${ moment ().format (process.env.DTF_LOG) } Error while finding previous messages of the visitor.`, err);
      return res.sendStatus (500);
    }
    if (!entry) {
      return next ();
    }
    const addedAt = moment (entry.dateAdded);
    const diff = moment ().diff (addedAt, 'hours', true);
    const canSend = diff >= parseInt (process.env.HOURS_BEFORE_CLIENT_CAN_RESEND_EMAIL.trim ());
    if (!canSend) {
      return res.send ({
        success: false,
        message: 'You are not be able to send a message now. Please try again later.',
        date: moment ().toDate ()
      });
    }
    next ();
  });
}