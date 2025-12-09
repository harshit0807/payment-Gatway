const client = require('../../initClient');

async function phonepeRedirect(req, res) {
  try {
    const { merchantOrderId } = req.query;

    console.log("Merchant Order ID:", merchantOrderId);

    const statusResponse = await client.getOrderStatus(merchantOrderId);

    console.log("Status Response:", statusResponse);

    const state = statusResponse.state;

    console.log("Payment State:", state);

    if (state === "COMPLETED" || state === "SUCCESS") {
      return res.redirect("http://localhost:4200/payment-success");
    }

    if (state === "FAILED") {
      return res.redirect("http://localhost:4200/payment-failed");
    }

    return res.redirect("http://localhost:4200/payment-processing");

  } catch (err) {
    console.error("Redirect Error:", err);
    return res.redirect("http://localhost:4200/payment-failed");
  }
}

module.exports = {
  phonepeRedirect
};
