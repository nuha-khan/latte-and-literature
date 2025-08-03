// routes/cartRoutes.js
import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // If cart exists, update quantity or add new product
      const existingProduct = cart.products.find(p => p.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;