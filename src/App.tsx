// import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import OTP from "./components/OTP";
// import { Signup } from "./components/Signup";

// import { Home } from "./components/Home";
import Stock from "./components/Stocks/Stock";
// import Sales from "./components/Sales/Sales";

import { Home } from "./components/Home";
import Sales from "./components/Sales/Sales";
import { ToastNotify } from "./components/Toast/ToastNotify";
import { Signup } from "./components/Signup";
import Customer from "./components/Customer/Customer";
import { AppRoutes } from "./routes";
import { Store } from "./app/Store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
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
