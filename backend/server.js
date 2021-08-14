import express from 'express';
import dotEnv from 'dotenv';
import colors from 'colors';

import {notFound, errorHandler} from './middleware/error.js'

import connectDb from './config/db.js';
import products from './routes/product.js';
import users from './routes/user.js';

const app = express();
app.use(express.json())

dotEnv.config();

connectDb();

app.use('/api/products', products);
app.use('/api/users', users);

app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} Mode on port ${PORT}`.cyan.bold
  )
);
