import type { RouteObject } from "react-router-dom";
import { Signup } from "../../components/Signup";
import Login from "../../components/Login";
import OTP from "../../components/OTP";

export const authRoute: RouteObject[] = [
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "Verifyotp",
    element: <OTP />,
  },
  {
    path: "login",
    element: <Login />,
  },
];
