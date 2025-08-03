import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  products: [
  {
    productId: String,
    title: String,
    price: Number,
    quantity: Number,
    image: String
  }
]
  // You can add items, shipping address, etc. later
});

const Orders = mongoose.model('Order', orderSchema);
export default Orders;


