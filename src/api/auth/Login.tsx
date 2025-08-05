type ErrorMessage = {
  response: {
    data: {
      error: string;
    };
  };
};
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import type z from "zod";
import type { loginScehma } from "../../schema/LoginSchema";

import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/LoginProviderContext";

// import { SignupFormType } from "../schema/SignupSchema";
type LoginFormType = z.infer<typeof loginScehma>;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

const loginRequest = async (formData: LoginFormType) => {
  const response = await axiosInstance.post("/login", formData);

  return response.data;
};

// const verifyotp = async () => {
//
//   const response = await axiosInstance.post("/signup", OtpData);
//   return response.data;
// };

export const useLoginup = () => {
  const navigate = useNavigate();
  const { token, setAuthToken, logout } = useAuthContext();
  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      const token2 = data.data.login_token;
      const token = {
        token: data.data.login_token,
      };
      const userdata = {
        userdata: data.data.userData,
      };

      localStorage.setItem(
        "userdata",
        JSON.stringify({ userdata: data.data.userData })
      );

      // const newdata = data.data.userData;
      localStorage.setItem("token", JSON.stringify(token));
      setAuthToken(token2);
      // localStorage.setItem("userdata", JSON.stringify(data.data.userdata));

      toast.success("Login successful!");
      const role = data.data.userData.Roles[0].role_name;
      navigate("/product/dashboard", {
        state: { token: token, userdata: userdata },
      });

      // return true;
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";

      // alert(msg);
      toast.error(msg);
      // setTimeout(() => {
      //
      //   toast.error(msg);
      // }, 2000);
      // if (axios.isAxiosError(err)) {
      //   const msg = err.response?.data?.error || "Something went wrong";
      //   toast.error(msg);
      // } else {
      //   toast.error("Something went wrong");
      // }
      // alert(msg);
    },
  });

  return {
    login: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
