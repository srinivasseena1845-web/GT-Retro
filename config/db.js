const mongoose = require('mongoose');

const db_url = process.env.MONGO_URL;


const connectdb = async () => {
    try {
        await mongoose.connect(db_url, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err.message);
        console.log('Please check your MongoDB Atlas IP whitelist settings');
        process.exit(1);
    }
};

module.exports = connectdb;