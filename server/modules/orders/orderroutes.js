const express = require("express");
const { createOrder, getOrdersByUserId } = require("./ordercontroller");
const { Order } = require('./ordermodel');
const router = express.Router();

router.post("/", createOrder); // POST /api/orders
router.get("/:userId", getOrdersByUserId); // GET /api/orders/:userId

// Update favorite status
router.patch("/:orderId/favorite", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.favorite = req.body.favorite;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error updating favorite status:', error);
    res.status(500).json({ message: 'Server error during updating favorite status' });
  }
});
router.get("/:userId/favorites", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const favoriteOrders = await Order.find({ userId, favorite: true });
      if (favoriteOrders.length === 0) {
        return res.status(404).json({ message: 'No favorite orders found for this user' });
      }
  
      res.json(favoriteOrders);
    } catch (error) {
      console.error('Error fetching favorite orders:', error);
      res.status(500).json({ message: 'Server error during fetching favorite orders' });
    }
  });
  

module.exports = router;
