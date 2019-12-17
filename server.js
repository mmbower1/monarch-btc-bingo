const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cronjob = require('./cronjob');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
// load env vars. this goes before route files so api works
dotenv.config({ path: './config/config.env' });

// connect db
connectDB();

cronjob();

// bodyparser middleware, handles http requests
app.use(bodyParser.urlencoded({ extended: true }));

// init middleware
app.use(express.json({ extended: false }));

// cookie parser
app.use(cookieParser());

// access routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/randomNumber', require('./routes/api/randomNumber'));
app.use('/api/drawnNumbers', require('./routes/api/drawnNumbers'));
app.use('/api/forgotPassword', require('./routes/api/forgot'));
app.use('/api/resetPassword', require('./routes/api/reset'));
app.use('/api/stripe', require('./routes/api/stripe'));
app.use('/api/cycles', require('./routes/api/cycles'));
app.use(errorHandler);

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`>>> monarch-btc-bingo Server started on port ${PORT}`));