import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ open, onClose }) => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);

const handleCheckout = () => {
  if (!isLoggedIn) {
    toast.error("Please login first to Place Order",{style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },});
    navigate("/")
    onClose()
    return;
  }
  onClose();
  navigate("/checkout");
};

  const total = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-2 right-0 h-full w-100 bg-white z-50 shadow-2xl rounded-md transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
        
        
          {items.length === 0 ? (
            <p className="text-center text-gray-500">
              Cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 border-b pb-3"
              >
                <img
                  src={item.image}
                  className="h-16 w-16 object-contain"
                />

                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(addToCart({ product: item, qty: -1 }))
                      }
                      className="px-2 border rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() =>
                        dispatch(addToCart({ product: item, qty: 1 }))
                      }
                      className="px-2 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item._id))
                      }
                      className="ml-auto text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between mb-3 font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          {total?(<button onClick={handleCheckout} className="w-full bg-[#cd3535] text-white py-2 rounded">
            Checkout
          </button>

          ):""}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
