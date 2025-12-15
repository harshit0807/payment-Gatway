const { StandardCheckoutPayRequest, MetaInfo } = require('pg-sdk-node');
const client = require('../../initClient');
const { randomUUID } = require('crypto');
const Payment = require('../../models/payment');

exports.createPayment = async (req, res) => {
    try {
        // FIX: Extract all fields from req.body
        const { amount, merchantUserId, planName, billingAddress } = req.body;

        const merchantOrderId = randomUUID();
        const redirectUrl = `http://localhost:5000/api/admin/phonepe/redirect?merchantOrderId=${merchantOrderId}`;

        // SAVE PAYMENT IN DB
        const gstAmount = Number((amount * 0.18).toFixed(2));
        const totalAmount = amount + gstAmount;

        const newPayment = await Payment.create({
            loginId: merchantUserId,
            merchantOrderId,
            amount,
            gstAmount,
            totalAmount,
            planName: planName || null,            // safe default
            billingAddress: billingAddress || {},  // safe default
            statusCode: "PENDING"
        });

        // PHONEPE META INFO
        const metaInfo = MetaInfo.builder()
            .udf1(merchantUserId)
            .build();

        // PHONEPE REQUEST
        const request = StandardCheckoutPayRequest.builder()
            .merchantOrderId(merchantOrderId)
            .amount(amount)
            .redirectUrl(redirectUrl)
            .metaInfo(metaInfo)
            .build();

        const response = await client.pay(request);

        return res.json({
            success: true,
            checkoutPageUrl: response.redirectUrl,
            merchantOrderId,
            paymentRecord: newPayment
        });

    } catch (err) {
        console.error("Payment creation error:", err);
        return res.status(500).json({ error: "Failed to create payment" });
    }
};


// CALLBACK
exports.paymentCallback = (req, res) => {
    console.log('Payment callback received:', req.body);
    res.sendStatus(200);
};
