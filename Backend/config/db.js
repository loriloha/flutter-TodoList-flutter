const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.database_Url);
        await mongoose.connect(process.env.database_Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            connectTimeoutMS: 10000, // Connection timeout
            socketTimeoutMS: 45000, // Socket timeout
            family: 4, // Use IPv4
        });
        console.log('MongoDB connected successfully');
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 5000); // Retry after 5s
        });
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

// Connect on server start
connectDB();

module.exports = mongoose;