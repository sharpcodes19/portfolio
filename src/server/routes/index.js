const express     = require ('express');
const router      = express.Router ();
const visitor     = require ('./visitor');
const middlewares = require ('../middlewares');

router.use ('/visitor', middlewares.recaptcha, visitor);

module.exports = router;