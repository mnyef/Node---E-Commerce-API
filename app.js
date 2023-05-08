require('dotenv').config();
require('express-async-errors');

const mongoose = require('mongoose');

// strictQuery Error
mongoose.set('strictQuery', true);

// express
const express = require('express');
const app = express();

// rest if the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send('e-commerce api');
});
app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies);
  // console.log(req.cookies);
  res.send('e-commerce api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
