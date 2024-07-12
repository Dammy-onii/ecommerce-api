const mongoose = require("mongoose");

const Product = require("../models/productModel");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product By ID
const getProductByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not listed" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not Found" });
  }

  res.status(200).json(product);
};

// Create Product
const createProduct = async (req, res) => {
  const { image, name, description, price, size, stock, category } = req.body;
  

  try {
    const product = await Product.create({
      image,
      name,
      description,
      price,
      size,
      stock,
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not listed" });
  }

  const product = await Product.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.status(200).json(product);
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not listed" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.status(200).json(product);
};

// Get Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
