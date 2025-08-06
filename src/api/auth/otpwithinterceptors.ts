// api/axiosInstance.ts

// api/otp/useOtp.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type z from "zod";
import { otpSchema } from "../../schema/OtpSchema";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.error) {
      return Promise.reject({ response });
    }
    return response;
  },
  (error) => {
    console.error("Axios interceptor error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

type OtpFormType = z.infer<typeof otpSchema>;

const otprequest = async (formData: OtpFormType) => {
  const response = await axiosInstance.post("/verifyotp", formData);
  return response.data;
};

export const useOtp = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: otprequest,
    onSuccess: () => {
      alert("OTP Verified Successfully");
      navigate("/auth/login");
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.error || err?.message || "Something went wrong";
      alert(msg);
    },
  });

  return {
    otp: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError ? (mutation.error as Error).message : null,
    isSuccess: mutation.isSuccess,
  };
};
