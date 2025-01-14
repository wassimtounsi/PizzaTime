import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f8f8" }}>
      <h1 style={{ color: "#ff4500" }}>Pizza Time</h1>
      <h2 style={{ marginBottom: "40px", color: "#333" }}>Quick Options</h2>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        <div style={{ flex: "0 1 calc(33.33% - 20px)", boxSizing: "border-box" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff" }}>
            <p>Create your own pizza with the ingredients you love!</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/CreatePizza")}
            >
              New Order
            </button>
          </div>
        </div>

        <div style={{ flex: "0 1 calc(33.33% - 20px)", boxSizing: "border-box" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff" }}>
            <p>Quickly reorder your favorite pizzas!</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/FavoriteOrder")}
            >
              Re-order My Fave
            </button>
          </div>
        </div>

        <div style={{ flex: "0 1 calc(33.33% - 20px)", boxSizing: "border-box" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff" }}>
            <p>Let us surprise you with a random pizza selection!</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#ffc107",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/RandomPizza")}
            >
              Surprise Me
            </button>
          </div>
        </div>

        <div style={{ flex: "0 1 calc(33.33% - 20px)", boxSizing: "border-box" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff" }}>
            <p>Check your cart and proceed to checkout.</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/CartPage")}
            >
              View Cart
            </button>
          </div>
        </div>

        <div style={{ flex: "0 1 calc(33.33% - 20px)", boxSizing: "border-box" }}>
          <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", backgroundColor: "#fff" }}>
            <p>Look at your previous orders!</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/PreviousOrders")}
            >
              View Previous Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
