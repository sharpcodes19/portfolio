const express     = require ('express');
const router      = express.Router ();
const controller  = require ('../../controllers/visitor');
const middlewares = require ('../../middlewares');

router.post ('/', controller.addVisitor);
router.post ('/sendMail', middlewares.antiSpam, controller.sendMail);
router.post ('/subscribe', middlewares.antiDualSubscriber, controller.subscribe);

module.exports = router;