import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((s) => s.orders.list);

  if (!orders.length) {
    return <p>No orders yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      {orders.map((o) => (
        <div key={o.id} className="border p-4 mb-3 rounded">
          <p><b>Order ID:</b> {o.id}</p>
          <p><b>Total:</b> ₹{o.total}</p>
          <p><b>Status:</b> {o.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
