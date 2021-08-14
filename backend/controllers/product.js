import asycnHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc  Fetch all products
// @route  GET /api/products
// @access  Public
const getProducts = asycnHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc  Fetch a single product
// @route  GET /api/products/:id
// @access  Public
const getProduct = asycnHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProduct, getProducts };
