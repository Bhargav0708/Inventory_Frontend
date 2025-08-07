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
  baseURL: "https://inventory-backend-hjmi.onrender.com/",
  timeout: 5000,
  withCredentials: true,
});

const AddProduct = async (data: FormData) => {
  console.log("the data is in the submit Add product Request", data);
  const response = await axiosInstance.post("/product/create", data);
  return response.data; // { token: "..." }
};

export const useAddProduct = () => {
  const mutation = useMutation({
    mutationFn: AddProduct,
    onSuccess: (data) => {
      console.log("the data is handler tanstack", data);
      // alert("Product Created Successfully");
      toast.success("Product Created SucessFully");
      return data;
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
    },
  });

  // SalesOrderGenration: mutation.mutateAsync,
  //   data: mutation.data,
  //   loading: mutation.isPending,
  //   error: mutation.isError
  //     ? (mutation.error as unknown as Error).message
  //     : null,
  //   isSuccess: mutation.isSuccess,
  // };
  return {
    addProduct: mutation.mutate,
    addProductAsync: mutation.mutateAsync,
    ProductData: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
