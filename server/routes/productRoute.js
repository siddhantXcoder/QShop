const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/create-product", async (req, res) => {
  try {
    const { productname, price, category, stock, description, productImage } =
      req.body;

    if (!productname || !price || !category || !stock || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields." });
    }

    const newProduct = new Product({
      productname,
      price,
      category,
      stock,
      description,
      productImage,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ success: true, savedProduct });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error in product creation: " + error.message,
      });
  }
});


router.get("/get-all-products", async (req, res) => {
  try {

    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.get("/get-product-by-id/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {

    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
});

router.put("/update-product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Update failed: " + error.message });
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
});

module.exports = router;
