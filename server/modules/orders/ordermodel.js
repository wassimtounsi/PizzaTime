const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  food: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      crust: { type: String, required: true },
      sauce: { type: String, required: true },
      toppings: { type: [String], required: true }
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
