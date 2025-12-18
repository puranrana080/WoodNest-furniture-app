import { NavLink, useLocation } from "react-router-dom";
import { categories } from "../constants/categories";

const CategoryBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="bg-white ">
      <div className=" mx-auto px-6">
        <div className="flex justify-center gap-6 py-3 overflow-x-auto">

          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, "-");

            return (
              <NavLink
                key={cat}
                to={`/category/${slug}`}
                className={({ isActive }) =>
                  `whitespace-nowrap text-sm font-medium transition ${
                    isActive && !isHome
                      ? "text-black border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {cat}
              </NavLink>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
