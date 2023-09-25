const mongoose = require('mongoose');
require('dotenv').config();
require('colours');

const dbURL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        const response = await mongoose.connect(dbURL)
        console.log(`Database running`.rainbow);
        
    } catch (error) {
        console.log(error.message);
    }

}
module.exports = { connectDB }