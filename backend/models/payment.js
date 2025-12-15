const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    loginId: { type: mongoose.Schema.Types.ObjectId, ref: 'login', required: true },
    merchantOrderId: { type: String, required: true },
    amount: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: null },
    planName : { type: String, default: null },
    transactionId: { type: String, default: null },

    billingAddress: { 
        name : { type: String, default: null },
        phone : { type: String, default: null },
        email : { type: String, default: null },
        addressLine1 : { type: String, default: null },
        addressLine2 : { type: String, default: null },
        city : { type: String, default: null },
        state : { type: String, default: null },
        zip : { type: String, default: null },
        country : { type: String, default: null },
    },

    statusMessage: { type: String, default: null },
    statusCode: { type: String, default: "PENDING" }, 
    failureReason: { type: String, default: null },

    // ⭐️ ADD THESE FOR PHONEPE
    providerReferenceId: { type: String, default: null },   // PhonePe transaction ID
    paymentResponse: { type: Object, default: {} },         // Raw response from PhonePe API
    verifyStatus: { type: Boolean, default: false },        // After verifying using /v3/transaction/status
}, {
    timestamps: true
});

module.exports = mongoose.model('payment', paymentSchema);
