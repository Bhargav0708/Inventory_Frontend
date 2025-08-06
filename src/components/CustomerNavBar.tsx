import { useAuthContext } from "../hooks/LoginProviderContext";

// import cartIcon from "./cart.png";
import { FaShoppingCart } from "react-icons/fa";
export const CustomerNavBar = () => {
  // const cartState = useSelector((state: any) => {
  //   console.log("Full Redux State:", state);
  //   console.log("Cart State:", state.cart);
  //   return state.cart;
  // });
  // console.log("in the custome navbar", cartState);
  // const countOfItmems = cartState.totalQuantity;
  // console.log("countOfitems", countOfItmems);
  const { setAuthToken } = useAuthContext();
  const path = [
    {
      path: "/customer/dashboard",
      isActive: false,
      label: "Dashboard",
    },
    {
      path: "/customer/cart",
      isActive: false,
      label: (
        <span style={{ position: "relative", display: "inline-block" }}>
          <FaShoppingCart size={24} />
          {/* {countOfItmems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "10px",
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              {countOfItmems}
            </span>
          )} */}
        </span>
      ),
    },
    {
      path: "/customer/history",
      isActive: false,
      label: "History",
    },
  ];

  console.log("this is location", window.location.pathname);
  const currentPath = window.location.pathname;

  return (
    <div>
      <div className="flex justify-end mb-6 space-x-8">
        {path.map(({ path, label }) => {
          // const isActive = currentPath;
          const isActive = currentPath === path;
          return (
            <button
              className={`px-4 py-2 rounded font-medium ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-indigo-600 hover:bg-indigo-200"
              }`}
            >
              <a href={path} className="">
                {label}
              </a>
            </button>
          );
        })}

        <a
          href="#"
          className="text-indigo-600 hover:text-indigo-400  px-4 py-2 rounded font-medium"
          onClick={() => {
            setAuthToken(null);
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default CustomerNavBar;
