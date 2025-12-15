const client = require('../../initClient');
const Payment = require('../../models/payment');

async function phonepeRedirect(req, res) {
  try {
    const { merchantOrderId } = req.query;

    console.log("Merchant Order ID:", merchantOrderId);

    const statusResponse = await client.getOrderStatus(merchantOrderId);

    console.log("Status Response:", statusResponse);

    const state = statusResponse.state;

    console.log("Payment State:", state);

    const providerReferenceId = statusResponse.data?.providerReferenceId || null;
    const transactionId = statusResponse.data?.transactionId || null;
    const paymentInstrument = statusResponse.data?.paymentInstrument || null;

    let finalStatus = "PENDING";
    if (state === "COMPLETED" || state === "SUCCESS") finalStatus = "SUCCESS";
    if (state === "FAILED") finalStatus = "FAILED";

    await Payment.findOneAndUpdate(
      { merchantOrderId },
      {
        statusCode: finalStatus,
        transactionId,
        providerReferenceId,
        paymentMethod: paymentInstrument?.type || null,
        paymentResponse: statusResponse,
        verifyStatus: true,
        statusMessage: `PhonePe returned state: ${state}`
      },
      { new: true }
    );

    if (state === "COMPLETED" || state === "SUCCESS") {
      return res.redirect("http://localhost:4200/payment-success");
    }

    if (state === "FAILED") {
      return res.redirect("http://localhost:4200/payment-failed");
    }

    return res.redirect("http://localhost:4200/payment-processing");

  } catch (err) {
    console.error("Redirect Error:", err);

    await Payment.findOneAndUpdate(
      { merchantOrderId: req.query.merchantOrderId },
      {
        statusCode: "FAILED",
        failureReason: err.message,
        verifyStatus: true
      }
    );

    return res.redirect("http://localhost:4200/payment-failed");
  }
}

module.exports = {
  phonepeRedirect
};