type ErrorMessage = {
  response: {
    data: {
      error: string;
    };
  };
};
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// type productAllInfo = {
//   name: string;
//   barcode: string;
//   description: string;
//   price: number;
//   supplier_id: number;
//   category_id: number;
// };
const axiosInstance = axios.create({
  baseURL: "https://inventory-backend-hjmi.onrender.com",
  timeout: 5000,
  withCredentials: true,
});

const AddStock = async (data: FormData) => {
  console.log("object");
  console.log("the data is in the submit Add product Request", data);
  const response = await axiosInstance.post("/stocks/create", data);
  return response.data; // { token: "..." }
};

// const verifyotp = async () => {
//   console.log("object");
//   const response = await axiosInstance.post("/signup", OtpData);
//   return response.data;
// };

export const useAddStock = () => {
  const mutation = useMutation({
    mutationFn: AddStock,
    onSuccess: (data) => {
      console.log("the data is handler tanstack", data);
      // toast.success("Stock Created SuccessFully");
      // alert("Stock Created Successfully");
      toast.success("Stock Created Successfully");
      return data;
    },
    onError: (err: ErrorMessage) => {
      console.log("the err", err);
      const msg = err?.response?.data?.error || "Something went wrong";
      // alert(msg);
      toast.error(msg);
    },
  });

  return {
    addStock: mutation.mutate,
    addStockAsync: mutation.mutateAsync,
    StockData: mutation.data,
    AddStockloading: mutation.isPending,
    AddStockerror: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    AddStockisSuccess: mutation.isSuccess,
  };
};
