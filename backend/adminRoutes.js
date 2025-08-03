// routes/adminRoutes.js (or wherever your admin routes are)

import express from 'express';
import Product from '../models/Products.js'; // Ensure this is the same model used for inserting data
import Users from '../models/Users.js';
import Orders from '../models/Orders.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await Users.countDocuments();
    const orderCount = await Orders.countDocuments();

    res.json({
      products: productCount,
      users: userCount,
      orders: orderCount
    });
  } catch (err) {
    console.error('[Stats Error]', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
