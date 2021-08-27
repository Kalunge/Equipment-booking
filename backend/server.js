import express from 'express';
import dotEnv from 'dotenv';
import colors from 'colors';
import path from 'path';

import { notFound, errorHandler } from './middleware/error.js';

import connectDb from './config/db.js';
import products from './routes/product.js';
import users from './routes/user.js';
import orders from './routes/order.js';
import upload from './routes/upload.js';

const app = express();
app.use(express.json());

dotEnv.config();

connectDb();

app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/upload', upload);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} Mode on port ${PORT}`.cyan.bold
  )
);
