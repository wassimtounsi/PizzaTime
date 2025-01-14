const { Order } = require("./ordermodel");

const createOrder = async (req, res) => {
  try {
    const { userId, food } = req.body;
    console.log(req.body.userId);
    console.log(req.body.food);

    // Validate userId and food array
    if (!userId || !food || !Array.isArray(food) || food.length === 0) {
      return res.status(400).json({ message: "Invalid request: 'userId' and 'food' are required" });
    }

    // Validate each food item
    for (const item of food) {
      if (!item.name || !item.price || !item.crust || !item.sauce || !Array.isArray(item.toppings)) {
        return res.status(400).json({ message: "Each food item must have name, price, crust, sauce, and toppings" });
      }
    }

    const newOrder = new Order({
      userId,
      food
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOrdersByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const orders = await Order.find({ userId }).populate('userId', 'email');
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createOrder,
    getOrdersByUserId
  };
  