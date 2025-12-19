import { NavLink, Outlet } from "react-router-dom";


const Account = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 flex gap-6">
      <div className="w-60 border rounded p-4 space-y-3">
        <NavLink to="/account/profile" className="block hover:text-wood">
          Profile
        </NavLink>
        <NavLink to="/account/orders" className="block hover:text-wood">
          My Orders
        </NavLink>
      </div>

      <div className="flex-1 border rounded p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
