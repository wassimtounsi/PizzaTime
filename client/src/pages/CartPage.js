import React, { useEffect, useState } from "react";
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You need to log in to place an order.");
      return;
    }
    console.log(user)
    const orderData = {
      userId: user,
      food: cart.map((item, index) => ({
        name: `Pizza ${index + 1}`,
        price: item.price,
        crust: item.crust,
        sauce: item.sauce,
        toppings: item.toppings
      }))
    };
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
  
      console.log("Response:", response);
  
      // Check if the response is empty
      const text = await response.text();
      console.log("Response Body:", text);
  
      if (!response.ok) {
        const errorMessage = text || "An error occurred while placing the order.";
        console.error("Failed to place order:", errorMessage);
        alert(`Error: ${errorMessage}`);
        return;
      }
  
      // Only parse if response body contains valid JSON
      const contentType = response.headers.get("content-type");
      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = JSON.parse(text);
      }
  
      console.log("Order placed successfully:", data);
      alert("Your order has been placed successfully!");
      localStorage.removeItem("cart"); // Clear the cart after order
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again later.");
    }
  };
  

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((pizza, index) => (
            <div key={index} className="cart-item">
              <h3>Pizza {index + 1}</h3>
              <p><strong>Crust:</strong> {pizza.crust}</p>
              <p><strong>Sauce:</strong> {pizza.sauce}</p>
              <p><strong>Toppings:</strong> {pizza.toppings.join(", ")}</p>
              <p><strong>Price:</strong> ${pizza.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="order-buttons">
          <button className="btn-start-over" onClick={() => { localStorage.removeItem("cart"); setCart([]); }}>START OVER</button>
          <button className="btn-order" onClick={handleOrder}>PURCHASE</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
