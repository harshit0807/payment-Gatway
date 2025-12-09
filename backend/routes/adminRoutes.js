const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/admin/paymentController');
const redirectController = require('../controllers/admin/phonepeRedirectController');

console.log("Redirect Controller Object:", redirectController);
console.log("Redirect Function:", redirectController.phonepeRedirect);

router.post('/create-payment', paymentController.createPayment);
router.post('/payment-callback', paymentController.paymentCallback);
router.get('/phonepe/redirect', redirectController.phonepeRedirect);

module.exports = router;
