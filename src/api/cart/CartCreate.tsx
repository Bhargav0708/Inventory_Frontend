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
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

const AddCart = async (data: any) => {
  // const CartData = {
  //   userid: cartBody.id,
  //   productid: cartBody.product_id,
  //   quantity: cartBody.quantity,
  //   price: cartBody.price,
  // };
  const Cartdata = {
    userid: data.id,
    productid: data.product_id,
    quantity: data.quantity,
    price: data.price,
  };
  const response = await axiosInstance.post("/cart/makingcart", Cartdata);

  return response.data.data; // { token: "..." }
};

// const verifyotp = async () => {

//   const response = await axiosInstance.post("/signup", OtpData);
//   return response.data;
// };

export const useAddCart = () => {
  const mutation = useMutation({
    mutationFn: AddCart,
    onSuccess: (data) => {
      // toast.success("Stock Created SuccessFully");
      // alert("Stock Created Successfully");
      //   toast.success(" Item To the cart  Successfully");
      return data;
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      // alert(msg);
      toast.error(msg);
    },
  });

  return {
    addCart: mutation.mutate,
    addCartAsync: mutation.mutateAsync,
    CartData: mutation.data,
    AddCartloading: mutation.isPending,
    AddCarterror: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    AddCartisSuccess: mutation.isSuccess,
  };
};
