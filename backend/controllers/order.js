import asycnHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc  create new order
// @route  POST /api/orders
// @access  private
const addOrderItems = asycnHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc  Fetch a single Order
// @route  GET /api/orders/:id
// @access  Private
const getOrder = asycnHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  update order to paid
// @route  GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asycnHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  get logged in user orders
// @route  GET /api/orders/myorders
// @access  Private
const getUserOrders = asycnHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc  get all  orders
// @route  GET /api/orders
// @access  Private->admin
const getOrders = asycnHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export { addOrderItems, getOrder, updateOrderToPaid, getUserOrders, getOrders };
