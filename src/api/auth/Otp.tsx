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

// import type z from "zod";
// import { otpSchema } from "../../schema/OtpSchema";
import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// type OtpFormType = z.infer<typeof otpSchema>;

const axiosInstance = axios.create({
  baseURL: "https://inventory-frontend-r9ox.vercel.app",
  timeout: 5000,
  withCredentials: true,
});

const otprequest = async (formData: any) => {
  try {
    const response = await axiosInstance.post<any>("/verifyotp", formData);

    // Optional: handle known error shape inside success response
    if (response.data?.error) {
      return response.data?.error;
    }

    return response.data;
  } catch (err: any) {
    const msg = err?.response?.data?.error || "Something went wrong";
    // const error = err as AxiosError<{ error: string }>;
    toast.error(msg);
    console.error(
      " Error during OTP verification:",
      err?.response?.data.error || err.message
    );
    throw err;
  }
};

export const useOtp = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: otprequest,
    onSuccess: () => {
      toast.success("Otp verified SuccessFully");
      alert("OTP Verified Successfully");
      navigate("/auth/login");
    },
    onError: (err: ErrorMessage) => {
      const msg = err.response.data.error || "Something went wrong";
      toast.error(msg);
      alert(msg);
    },
  });

  return {
    otp: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
