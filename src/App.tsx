// import { useState } from "react";

import "./App.css";

// import { Signup } from "./components/Signup";

// import { Home } from "./components/Home";

// import Sales from "./components/Sales/Sales";

import { ToastNotify } from "./components/Toast/ToastNotify";

import { AppRoutes } from "./routes";

// import Home from "./components/Home";

// import { Signup } from "./components/Signup";

function App() {
  // const cartState = useSelector((state: any) => state.cart);

  // useEffect(() => {
  //   sessionStorage.setItem("user_cart", JSON.stringify(cartState));
  // }, [cartState]);
  // const [count, setCount] = useState(0);

  return (
    <>
      <ToastNotify />
      <AppRoutes />
    </>
    // <>
    //   <Routes>
    //     <Route path="/" element={<Signup />}></Route>
    //     <Route path="/Verifyotp" element={<OTP />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //     <Route path="/Home" element={<Home />}></Route>
    //     <Route path="/Stock" element={<Stock />}></Route>
    //     <Route path="/Sales" element={<Sales />}></Route>
    //     <Route path="/customer" element={<Customer />}></Route>
    //   </Routes>
    //   <ToastNotify />
    // </>
    // <>
    //   <Signup />
    //   {/* <OTP /> */}
    //   {/* <Login /> */}
    // </>
  );
}

export default App;
