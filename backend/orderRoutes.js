// routes/orderRoutes.js
import express from 'express';
import Orders from '../models/Orders.js';
import Users from '../models/Users.js';

const router = express.Router();

// POST: Create order
router.post('/api/orders', async (req, res) => {
  try {
    const { userId, total } = req.body;

    const order = new Orders({
      user: userId,
      total
    });

    await order.save();

    // Optional: Update user's orders array
    await Users.findByIdAndUpdate(userId, {
      $push: {
        orders: {
          orderId: order._id,
          product: 'Multiple items',
          amount: total,
          date: new Date()
        }
      }
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET: All orders (admin)
router.get('/api/orders', async (req, res) => {
  try {
    const orders = await Orders.find().populate('user', 'username');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
