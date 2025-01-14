import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './RandomPizza.css';

const RandomPizza = () => {
  const crustOptions = ["Thin Crust", "Thick Crust", "Stuffed Crust", "Gluten-Free"];
  const sauceOptions = ["Tomato Sauce", "Barbecue Sauce", "White Sauce", "Pesto"];
  const toppingsOptions = [
    "Pepperoni", "Mozzarella cheese", "Mushrooms", "Green peppers",
    "Black olives", "Onions", "Sausage", "Bacon", "Ham", "Pineapple",
    "Spinach", "Tomato slices", "Anchovies", "Artichokes", "Jalapeños",
    "Feta cheese", "Ground beef", "Arugula", "Sun-dried tomatoes", "Goat cheese",
  ];

  const prices = {
    crust: { "Thin Crust": 5, "Thick Crust": 6, "Stuffed Crust": 7, "Gluten-Free": 8 },
    sauce: { "Tomato Sauce": 1, "Barbecue Sauce": 1.5, "White Sauce": 2, "Pesto": 2.5 },
    toppings: {
      "Pepperoni": 1, "Mozzarella cheese": 1.5, "Mushrooms": 1, "Green peppers": 1,
      "Black olives": 1, "Onions": 0.5, "Sausage": 1.5, "Bacon": 2, "Ham": 1.5, "Pineapple": 1,
      "Spinach": 1, "Tomato slices": 0.5, "Anchovies": 2, "Artichokes": 2, "Jalapeños": 1,
      "Feta cheese": 1.5, "Ground beef": 1.5, "Arugula": 1, "Sun-dried tomatoes": 2, "Goat cheese": 2,
    },
  };

  const [cannotEat, setCannotEat] = useState([]);
  const [numberOfPizzas, setNumberOfPizzas] = useState(1);
  const [randomPizzas, setRandomPizzas] = useState([]);

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  const generateRandomPizza = () => {
    const crust = getRandomElement(crustOptions);
    const sauce = getRandomElement(sauceOptions);
    const toppingsCount = Math.floor(Math.random() * 5) + 1; // Select 1 to 5 toppings
    const toppings = [];

    // Filter out the toppings the user can't eat
    const availableToppings = toppingsOptions.filter(topping => !cannotEat.includes(topping));

    while (toppings.length < toppingsCount) {
      const topping = getRandomElement(availableToppings);
      if (!toppings.includes(topping)) toppings.push(topping);
    }

    const crustPrice = prices.crust[crust] || 0;
    const saucePrice = prices.sauce[sauce] || 0;
    const toppingsPrice = toppings.reduce((total, topping) => total + (prices.toppings[topping] || 0), 0);
    const totalPrice = crustPrice + saucePrice + toppingsPrice;

    return { crust, sauce, toppings, price: totalPrice };
  };

  const handleGeneratePizzas = () => {
    const pizzas = [];
    for (let i = 0; i < numberOfPizzas; i++) {
      pizzas.push(generateRandomPizza());
    }
    setRandomPizzas(pizzas);
  };

  const handleCannotEatChange = (topping) => {
    setCannotEat(prev => 
      prev.includes(topping) ? prev.filter(item => item !== topping) : [...prev, topping]
    );
  };

  const regeneratePizza = (index) => {
    const newPizza = generateRandomPizza();
    const updatedPizzas = [...randomPizzas];
    updatedPizzas[index] = newPizza;
    setRandomPizzas(updatedPizzas);
  };

  const handleAddToCart = (index) => {
    const pizza = randomPizzas[index];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(pizza);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Pizza added to cart:", pizza);
    alert(`Pizza ${index + 1} added to cart!`);
  };

  return (
    <div className="create-pizza-container">
      <h1>Random Pizza Selector</h1>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {/* Cannot eat ingredients */}
        <div className="form-group">
          <h3>What ingredients can't you eat?</h3>
          <div className="toppings-container">
            {toppingsOptions.map((topping) => (
              <label key={topping} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={cannotEat.includes(topping)}
                  onChange={() => handleCannotEatChange(topping)}
                />
                {topping}
              </label>
            ))}
          </div>
        </div>

        {/* Number of pizzas */}
        <div className="form-group">
          <label>How many pizzas do you want to generate?</label>
          <input
            type="number"
            min="1"
            value={numberOfPizzas}
            onChange={(e) => setNumberOfPizzas(Number(e.target.value))}
          />
        </div>

        {/* Display pizzas */}
        <div className="random-pizza-display">
          <h3>Generated Pizzas:</h3>
          {randomPizzas.map((pizza, index) => (
            <div key={index}>
              <p><strong>Crust:</strong> {pizza.crust}</p>
              <p><strong>Sauce:</strong> {pizza.sauce}</p>
              <p><strong>Toppings:</strong> {pizza.toppings.length ? pizza.toppings.join(", ") : "None"}</p>
              <p><strong>Price:</strong> ${pizza.price.toFixed(2)}</p>
              <div className="btn-container">
                <button className="btn-add" onClick={() => handleAddToCart(index)}>Add to Cart</button>
                <button className="btn-regenerate" onClick={() => regeneratePizza(index)}>Regenerate Pizza</button>
              </div>
              <hr />
            </div>
          ))}
        </div>

        {/* Generate New Pizzas Button */}
        <div className="btn-container">
          <button className="btn-add" onClick={handleGeneratePizzas}>Generate Random Pizzas</button>
                    <Link to="/CartPage" className="btn-cart">
                      Move to Cart
                    </Link>
        </div>
      </div>
    </div>
  );
};

export default RandomPizza;
