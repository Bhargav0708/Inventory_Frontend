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
import { signupSchema } from "../../schema/SignupSchema";
import { toast } from "react-toastify";
type SignupFormType = z.infer<typeof signupSchema>;

const axiosInstance = axios.create({
  baseURL: "https://inventory-frontend-r9ox.vercel.app",
  timeout: 5000,
  withCredentials: true,
});

const signupRequest = async (formData: SignupFormType) => {
  const response = await axiosInstance.post("/signup", formData);
  return response.data;
};

export const useSignup = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data: any) => {
      const email = localStorage.getItem("useremail");
      alert("Registered Successfully");
      toast.success("Registered Successfully");
      navigate("/auth/Verifyotp", {
        state: { token: data.token, email: email },
      });
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      alert(msg);
    },
  });

  return {
    signup: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
