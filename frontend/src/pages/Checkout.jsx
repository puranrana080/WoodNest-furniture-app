import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

const emptyAddr = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const Checkout = () => {
  const { items } = useSelector((s) => s.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const { items, total } = useSelector((s) => s.cart);
  const { user, isLoggedIn } = useSelector((s) => s.auth);

  const [savedAddress, setSavedAddress] = useState(null);
  const [form, setForm] = useState(emptyAddr);
  const [useNew, setUseNew] = useState(true);

  useEffect(() => {
    const addr = localStorage.getItem("address");
    if (addr) {
      const parsed = JSON.parse(addr);
      setSavedAddress(parsed);
      setForm(parsed);
      setUseNew(false);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = items.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const handlePlaceOrder = async () => {
    const finalAddr = useNew ? form : savedAddress;

    if (
      !finalAddr?.name ||
      !finalAddr?.address ||
      !finalAddr?.city ||
      !finalAddr?.state ||
      !finalAddr?.pincode
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    localStorage.setItem("address", JSON.stringify(finalAddr));

    const orderData = {
      items: items.map(i => ({ product: i._id, quantity: i.qty, price: i.price })),
      total,
      address: finalAddr,
    };

    console.log("Order Data:", orderData); // Debug log

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debug log
      const res = await axios.post(`${API_BASE}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response:", res.data); // Debug log
      dispatch(clearCart());
      toast.success("Order placed successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Address Section */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Delivery Details</h2>

        {/* Saved Address */}
        {savedAddress && (
          <div className="border p-4 rounded mb-4">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!useNew}
                onChange={() => setUseNew(false)}
              />
              <div>
                <p className="font-medium">{savedAddress.name}- {savedAddress.phone}</p>
                <p className="text-sm text-gray-600">
                  {savedAddress.address}, {savedAddress.city},{" "}
                  {savedAddress.state} - {savedAddress.pincode}
                </p>
              </div>
            </label>
          </div>
        )}

        {/* New Address */}
        <div className="border p-4 rounded">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="radio"
              checked={useNew}
              onChange={() => setUseNew(true)}
            />
            <span>Add New Address</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={!useNew}
            />
              <input
    name="phone"
    placeholder="Phone Number"
    value={form.phone}
    onChange={handleChange}
    className="border p-2 rounded"
    disabled={!useNew}
  />
            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={!useNew}
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={!useNew}
            />
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={!useNew}
            />
          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-3"
            rows={3}
            disabled={!useNew}
          />
        </div>
      </div>

      {/* Payment */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Payment Method</h2>
        <div className="border p-3 rounded">
          <label className="flex items-center gap-2">
            <input type="radio" checked readOnly />
            Cash on Delivery (COD)
          </label>
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-between font-semibold mb-4">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-[#cd3535] text-white py-3 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
