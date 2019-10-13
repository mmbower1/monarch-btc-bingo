const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cronjob = require('./cronjob');

const PORT = process.env.PORT || 5000;

// connect db
connectDB();

cronjob();

// init middleware
app.use(express.json({ extended: false }));

// access routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/randomNumber', require('./routes/api/randomNumber'));
app.use('/api/drawnNumbers', require('./routes/api/drawnNumbers'));


app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`monarch-btc-bingo Server started on port ${PORT}`));