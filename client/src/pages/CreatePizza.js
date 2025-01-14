import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './CreatePizza.css';

const CreatePizza = () => {
  const [selectedCrust, setSelectedCrust] = useState("");
  const [selectedSauce, setSelectedSauce] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);

  const crustOptions = ["Thin Crust", "Thick Crust", "Stuffed Crust", "Gluten-Free"];
  const sauceOptions = ["Tomato Sauce", "Barbecue Sauce", "White Sauce", "Pesto"];
  const toppingsOptions = [
    "Pepperoni", "Mozzarella cheese", "Mushrooms", "Green peppers", 
    "Black olives", "Onions", "Sausage", "Bacon", "Ham", "Pineapple", 
    "Spinach", "Tomato slices", "Anchovies", "Artichokes", "Jalapeños", 
    "Feta cheese", "Ground beef", "Arugula", "Sun-dried tomatoes", "Goat cheese"
  ];

  const prices = {
    crust: { "Thin Crust": 5, "Thick Crust": 6, "Stuffed Crust": 7, "Gluten-Free": 8 },
    sauce: { "Tomato Sauce": 1, "Barbecue Sauce": 1.5, "White Sauce": 2, "Pesto": 2.5 },
    toppings: {
      "Pepperoni": 1, "Mozzarella cheese": 1.5, "Mushrooms": 1, "Green peppers": 1, 
      "Black olives": 1, "Onions": 0.5, "Sausage": 1.5, "Bacon": 2, "Ham": 1.5, "Pineapple": 1, 
      "Spinach": 1, "Tomato slices": 0.5, "Anchovies": 2, "Artichokes": 2, "Jalapeños": 1, 
      "Feta cheese": 1.5, "Ground beef": 1.5, "Arugula": 1, "Sun-dried tomatoes": 2, "Goat cheese": 2
    }
  };

  const handleToppingChange = (topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((item) => item !== topping)
        : [...prev, topping]
    );
  };

  const calculatePrice = () => {
    const crustPrice = prices.crust[selectedCrust] || 0;
    const saucePrice = prices.sauce[selectedSauce] || 0;
    const toppingsPrice = selectedToppings.reduce((total, topping) => total + (prices.toppings[topping] || 0), 0);
    return crustPrice + saucePrice + toppingsPrice;
  };

  const handleAddToCart = () => {
    const pizza = { crust: selectedCrust, sauce: selectedSauce, toppings: selectedToppings, price: calculatePrice() };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(pizza);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Pizza added to cart:", pizza);
  };

  const handleMarkAsFavorite = () => {
    console.log("Pizza marked as favorite:", { selectedCrust, selectedSauce, selectedToppings });
    // Add functionality to mark pizza as favorite
  };

  return (
    <div className="create-pizza-container">
      <h1>Create Your Pizza</h1>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {/* Crust Selection */}
        <div className="form-group">
          <label>Crust Type: </label>
          <select
            value={selectedCrust}
            onChange={(e) => setSelectedCrust(e.target.value)}
          >
            <option value="">Select a crust</option>
            {crustOptions.map((crust) => (
              <option key={crust} value={crust}>
                {crust}
              </option>
            ))}
          </select>
        </div>

        {/* Sauce Selection */}
        <div className="form-group">
          <label>Sauce: </label>
          <select
            value={selectedSauce}
            onChange={(e) => setSelectedSauce(e.target.value)}
          >
            <option value="">Select a sauce</option>
            {sauceOptions.map((sauce) => (
              <option key={sauce} value={sauce}>
                {sauce}
              </option>
            ))}
          </select>
        </div>

        {/* Toppings Selection */}
        <div className="form-group">
          <h3>Toppings:</h3>
          <div className="toppings-container">
            {toppingsOptions.map((topping) => (
              <label key={topping} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedToppings.includes(topping)}
                  onChange={() => handleToppingChange(topping)}
                  style={{ marginRight: "5px" }}
                />
                {topping}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="btn-container">
          <button className="btn-add" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link to="/CartPage" className="btn-cart">
            Move to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePizza;
