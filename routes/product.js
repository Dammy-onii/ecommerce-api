const express = require("express");

const {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

const router = express.Router();

// Get All
router.get("/", getProducts);

// Get By ID
router.get("/:id", getProductByID);

// Create Product
router.post("/", createProduct);

// Update Product
router.patch("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

// Get Categories
router.get("/categories/all", getCategories);

module.exports = router;
