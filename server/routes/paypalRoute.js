const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";

// Helper: get access token
async function generateAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString(
    "base64"
  );
  const resp = await axios({
    method: "post",
    url: `${PAYPAL_API}/v1/oauth2/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    data: "grant_type=client_credentials",
  });
  return resp.data.access_token;
}

async function createOrder(amount, currency = "USD") {
  const accessToken = await generateAccessToken();
  const resp = await axios({
    method: "post",
    url: `${PAYPAL_API}/v2/checkout/orders`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString(),
          },
        },
      ],
    },
  });
  return resp.data;
}

// Helper: capture order
async function captureOrder(orderId) {
  const accessToken = await generateAccessToken();
  const resp = await axios({
    method: "post",
    url: `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {},
  });
  return resp.data;
}

// Route: Create payment / order
router.post("/payment", async (req, res) => {
  try {
    // e.g. req.body = { amount: "10.00", currency: "USD" }
    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const order = await createOrder(amount, currency);

    return res.json({
      orderID: order.id,
      links: order.links, 
    });
  } catch (err) {
    console.error("Error in /payment:", err.response?.data || err.message);
    return res.status(500).json({ error: "Error creating PayPal order" });
  }
});

router.post("/payment/:orderId/capture", async (req, res) => {
  try {
    const { orderId } = req.params;
    const captureData = await captureOrder(orderId);
    return res.json(captureData);
  } catch (err) {
    console.error("Error in /payment/:orderId/capture:", err.response?.data || err.message);
    return res.status(500).json({ error: "Error capturing PayPal order" });
  }
});

module.exports = router;
