import { json } from 'express';
import asycnHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc  register user and get token
// @route  Post /api/users
// @access  Public
const signUp = asycnHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc  Auth user and get token
// @route  post /api/users/login
// @access  Public
const login = asycnHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc  get User profile
// @route  GET /api/users/profile
// @access  Private
const getProfile = asycnHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  update User profile
// @route  PUT /api/users/profile
// @access  Private
const updateProfile = asycnHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  get All users
// @route  GET /api/users/
// @access  private->admin
const getusers = asycnHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc  delete a user
// @route  DELETE /api/users/:id
// @access  private->admin
const deleteUser = asycnHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ Message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(users);
});

// @desc  get user by id
// @route  GET /api/users/:id
// @access  private->admin
const getuserbyId = asycnHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  update User
// @route  PUT /api/users/:id
// @access  Private->admin
const updateUser = asycnHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
  signUp,
  login,
  getProfile,
  updateProfile,
  getusers,
  deleteUser,
  getuserbyId,
  updateUser,
};
