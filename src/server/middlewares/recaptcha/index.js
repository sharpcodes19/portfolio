const moment = require ('moment');
const axios = require ('axios');

module.exports = (req, res, next) => {
  const token = req.body.recaptchaToken;
  if (!token) {
    console.warn (`${ moment ().format (process.env.DTF_LOG) } Client does not have a recaptcha token.`, req.clientIp, req.useragent);
    return res.sendStatus (403);
  }
  axios.get ('https://www.google.com/recaptcha/api/siteverify', {
    params: {
      secret: process.env.GOOGLE_RECAPTCHA_SECRET,
      response: token,
      remoteip: req.clientIp
    }
  })
  .catch ((ex) => {
    console.error (`${ moment ().format (process.env.DTF_LOG) } Error while verifying ReCaptcha to Google's server.`, ex);
    return res.sendStatus (500);
  })
  .then ((res) => res.data)
  .then ((data) => {
    if (!data.success) {
      console.warn (`${ moment ().format (process.env.DTF_LOG) } An unauthorized visitor was detected.`, req.clientIp, req.useragent);
      return res.send ({ success: false, message: 'Sorry, but you currently dont have a permission to view this page.' })
    }
    next ();
  })
}