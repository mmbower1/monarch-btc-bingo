const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected..');
    console.log("================================================================");
    console.log(' ');
    console.log(' ');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;