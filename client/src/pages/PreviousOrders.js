import React, { useEffect, useState } from "react";
import './OrderHistoryPage.css';

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("You need to log in to view your order history.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${user}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch orders: ${errorMessage}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        if (err.message.includes("No orders found for this user")) {
          setOrders([]); // No orders found, set orders to an empty array
        } else {
          setError(err.message);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleFavorite = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/favorite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorite: true })
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update order: ${errorMessage}`);
      }
      const updatedOrder = await response.json();
      setOrders(prevOrders => prevOrders.map(order =>
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-history-container">
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
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
              <button onClick={() => handleFavorite(order._id)}>
                {order.favorite ? "Favorited" : "Add to Favorite"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousOrders;
