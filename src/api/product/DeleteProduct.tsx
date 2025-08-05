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
type DeleteProduct = {
  id: number;
};
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

const DeleteProduct = async (data: DeleteProduct) => {
  console.log("data in the delete product request", data);
  const id = data;

  const response = await axiosInstance.delete(`product/deleteproduct/${id}`);
  return response.data;
};

export const useDeleteProduct = () => {
  const mutation = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: (data) => {
      console.log("the data is handler tanstack", data);
      toast.success("Deleted SuccessFully");
      // alert("Deleted Successfully");
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
    },
  });

  return {
    deleteProduct: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    deleteproduct: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
