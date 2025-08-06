type ErrorMessage = {
  response: {
    data: {
      error: string;
    };
  };
};
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  timeout: 10000,
  withCredentials: true,
});

const AddQuantity = async (data: any) => {
  console.log("the incoming data", data);
  // const Cartdata = {
  //   userid: data.id,
  //   productid: data.product_id,
  //   quantity: data.quantity,
  //   price: data.price,
  // };
  const id = data.product_id;
  const quanity = data.quantity;
  const userid = data.userid;

  const datatobesnet = {
    pid: id,
    productQuantity: quanity,
    UserId: userid,
  };
  const response = await axiosInstance.put<any>(
    "/cart/addproduct",
    datatobesnet
  );

  return response.data.data;
  //   const response = await axiosInstance.post("/cart/makingcart", Cartdata);

  //   return response.data.data; // { token: "..." }
};

export const useAddQuantity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AddQuantity,
    onSuccess: (data) => {
      const userid = data[0].userid;
      //   queryKey: ["displaycart", id],
      //   queryClient.invalidateQueries({ queryKey: ["displaycart"], id })

      queryClient.invalidateQueries({
        queryKey: ["displaycart", userid],
      });
      return data;
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      // alert(msg);
      toast.error(msg);
    },
  });

  return {
    AddQuantity: mutation.mutate,
    AddQuantityAsync: mutation.mutateAsync,
    AddQuantityData: mutation.data,
    AddQuantityLoading: mutation.isPending,
    AddQuantityerror: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    AddQuantitySucessfully: mutation.isSuccess,
  };
};
