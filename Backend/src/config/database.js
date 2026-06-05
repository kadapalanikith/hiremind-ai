const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Fatal: Error connecting to MongoDB:', error.message);
    process.exit(1); // Fail fast — do not start server without DB
  }
}

module.exports = connectToDB;