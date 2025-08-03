import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  category: String,
  author: String,
  genre: String, 
  description: String,
  roastType: String
});


const Product = mongoose.model('Product', productSchema);

export default Product;
