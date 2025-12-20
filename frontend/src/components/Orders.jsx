import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!orders.length) {
    return <p>No orders yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      {orders.map((o) => (
        <div key={o._id} className="border p-4 mb-3 rounded">
          <p><b>Order ID:</b> {o._id}</p>
          <p><b>Total:</b> ₹{o.totalAmount}</p>
          <p><b>Status:</b> {o.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
