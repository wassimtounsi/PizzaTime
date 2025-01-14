import React, { useEffect, useState } from "react";
import './OrderHistoryPage.css';

const FavoriteOrders = () => {
  const [favoriteOrders, setFavoriteOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("You need to log in to view your favorite orders.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${user}/favorites`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch favorite orders: ${errorMessage}`);
        }
        const data = await response.json();
        setFavoriteOrders(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchFavoriteOrders();
  }, []);

  const handleReorder = async (order) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: order.userId,
          food: order.food,
          favorite: order.favorite
        })
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to reorder: ${errorMessage}`);
      }
      alert('Order placed successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="favorite-orders-container">
      <h1>Your Favorite Orders</h1>
      {favoriteOrders.length === 0 ? (
        <p>You have no favorite orders.</p>
      ) : (
        <div className="order-list">
          {favoriteOrders.map((order, index) => (
            <div key={index} className="order-item">
              <h3>Order #{index + 1}</h3>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <div className="food-items">
                {order.food.map((item, idx) => (
                  <div key={idx} className="food-item">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Crust:</strong> {item.crust}</p>
                    <p><strong>Sauce:</strong> {item.sauce}</p>
                    <p><strong>Toppings:</strong> {item.toppings.join(", ")}</p>
                    <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => handleReorder(order)}>Reorder</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteOrders;
