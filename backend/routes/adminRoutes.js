const express = require('express');
const router = express.Router();


const paymentController = require('../controllers/admin/paymentController'); // Correct path to paymentController.js


router.post('/create-payment', paymentController.createPayment);
router.post('/payment-callback', paymentController.paymentCallback);


module.exports = router;
