const mongoose = require('mongoose');
module.exports.connect = async () => {
    const mongoUrl = process.env.MONGO_URL;
    const isProduction = process.env.NODE_ENV === 'production';

    // In production (Vercel), require MONGO_URL; otherwise skip connecting
    if (isProduction && !mongoUrl) {
        console.warn('MONGO_URL is not set. Skipping MongoDB connection in production.');
        return;
    }

    const resolvedUrl = mongoUrl || 'mongodb://127.0.0.1:27017/product-management';

    try {
        await mongoose.connect(resolvedUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error && error.message ? error.message : error);
        if (isProduction) {
            // In serverless prod, do not crash function; allow routes that don't need DB
            return;
        }
        // In development, keep old behavior to surface issues
        process.exit(1);
    }
}