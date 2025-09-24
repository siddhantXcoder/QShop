const express = require("express");
const router = express.Router();
const Order = require("../models/order"); 

const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `ORD-${timestamp}-${random}`;
};

router.post("/order", async (req, res) => {
    try {
        const {
            user,
            orderItem,
            paymentDetails,
        } = req.body;

        if (!user || !orderItem || !Array.isArray(orderItem) || orderItem.length === 0 || !paymentDetails) {
            return res.status(400).json({ message: "Missing required order fields." });
        }


        const calculatedAmount = orderItem.reduce((total, item) => {
            if (!item.price || !item.quantity) return total;
            return total + item.price * item.quantity;
        }, 0);

        if (paymentDetails.amount !== calculatedAmount) {
            return res.status(400).json({ message: "Amount mismatch with order items." });
        }

        const newOrder = new Order({
            user,
            orderNumber: generateOrderNumber(),
            orderItem,
            orderStatus: "Pending",
            paymentDetails,
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
});

router.get("/order/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById({orderId});

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Failed to get order details", error: error.message });
    }
});


module.exports = router;
