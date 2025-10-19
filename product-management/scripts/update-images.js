const mongoose = require('mongoose');
require('dotenv').config();

// Import Product model
const Product = require('../models/productModeDB');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/product-management');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Update product images with local images
const updateProductImages = async () => {
  try {
    await connectDB();
    
    // Define working image URLs for each product (using placeholder services)
    const productImages = {
      'iPhone 9': 'https://picsum.photos/300/200?random=1',
      'iPhone X': 'https://picsum.photos/300/200?random=2', 
      'Samsung Universe 9': 'https://picsum.photos/300/200?random=3',
      'OPPOF19': 'https://picsum.photos/300/200?random=4',
      'Huawei P30': 'https://picsum.photos/300/200?random=5',
      'MacBook Pro': 'https://picsum.photos/300/200?random=6'
    };

    // Update each product with local image
    for (const [title, imagePath] of Object.entries(productImages)) {
      const result = await Product.updateOne(
        { title: title },
        { $set: { thumbnail: imagePath } }
      );
      
      if (result.matchedCount > 0) {
        console.log(`Updated ${title} with image: ${imagePath}`);
      } else {
        console.log(`Product ${title} not found`);
      }
    }

    console.log('Image update completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
};

updateProductImages();
