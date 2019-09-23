const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// connect db
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// access routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`monarch-btc-bingo Server started on port ${PORT}`))