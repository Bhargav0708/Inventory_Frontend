import { useAuthContext } from "../hooks/LoginProviderContext";

const Navbar = () => {
  // const{}=useAuthContext
  const { setAuthToken } = useAuthContext();
  const path = [
    {
      path: "/product/dashboard",
      isActive: false,
      label: "Home",
    },
    {
      path: "/product/stock",
      isActive: false,
      label: "Stock",
    },
    {
      path: "/product/sales",
      isActive: false,
      label: "Sales",
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
            window.location.href = "/auth/login";
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
