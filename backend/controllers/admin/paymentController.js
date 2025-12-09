const { StandardCheckoutPayRequest, MetaInfo } = require('pg-sdk-node');
const client = require('../../initClient');
const { randomUUID } = require('crypto');

exports.createPayment = async (req, res) => {
    try {
        const { amount, merchantUserId } = req.body;

        const merchantOrderId = randomUUID(); 
        const redirectUrl =`http://localhost:5000/api/admin/phonepe/redirect?merchantOrderId=${merchantOrderId}`;

        const metaInfo = MetaInfo.builder()
            .udf1(merchantUserId)
            .build();

        const request = StandardCheckoutPayRequest.builder()
            .merchantOrderId(merchantOrderId)
            .amount(amount)      
            .redirectUrl(redirectUrl)
            .metaInfo(metaInfo)
            .build();

        const response = await client.pay(request);

        res.json({
            success: true,
            checkoutPageUrl: response.redirectUrl,
            merchantOrderId: merchantOrderId,
        });

    } catch (err) {
        console.error('Payment creation error:', err);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};

exports.paymentCallback = (req, res) => {
    console.log('Payment callback received:', req.body);
    res.sendStatus(200);
};
