const mongoose = require('mongoose');
module.exports.connect = async () => {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        console.error('❌ MONGO_URL environment variable is not set!');
        console.error('Please set MONGO_URL in Vercel environment variables');
        return;
    }

    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error && error.message ? error.message : error);
        // Không crash trong serverless nhưng vẫn log lỗi để debug
    }
}