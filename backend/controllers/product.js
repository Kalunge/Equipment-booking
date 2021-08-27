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

// @desc  DElete a product
// @route  DELETE /api/products/:id
// @access  Private->admin
const deleteProduct = asycnHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed successfully' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc  Create a product
// @route  POST /api/products/
// @access  Private->admin
const createProduct = asycnHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/sample/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    numReviews: 0,
    countInStock: 0,
    description: 'sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc  Update a product
// @route  Put /api/products/:id
// @access  Private->admin
const updateProduct = asycnHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    const updatedProdcut = await product.save();
    res.status(200).json(updatedProdcut);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProduct, getProducts, deleteProduct, createProduct, updateProduct };
