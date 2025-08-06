// // type ErrorMessage = {
// //   response: {
// //     data: {
// //       error: string;
// //     };
// //   };
// // };
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";

// // type productAllInfo = {
// //   name: string;
// //   barcode: string;
// //   description: string;
// //   price: number;
// //   supplier_id: number;
// //   category_id: number;
// // };
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
//   timeout: 5000,
//   withCredentials: true,
// });

// const DisplayCart = async (data: any) => {

//   // const CartData = {
//   //   userid: cartBody.id,
//   //   productid: cartBody.product_id,
//   //   quantity: cartBody.quantity,
//   //   price: cartBody.price,
//   // };

//   const response = await axiosInstance.get(`/cart/getcart/${data}`);

//   return response.data.data; // { token: "..." }
// };

// // const verifyotp = async () => {

// //   const response = await axiosInstance.post("/signup", OtpData);
// //   return response.data;
// // };

// export const useDisplayCart = () => {
//   const mutation = useMutation({
//     mutationFn: DisplayCart,
//     onSuccess: (data) => {

//       // toast.success("Stock Created SuccessFully");
//       // alert("Stock Created Successfully");
//       //   toast.success(" Item To the cart  Successfully");
//       return data;
//     },
//     onError: (err: any) => {

//       const msg = err?.response?.data?.error || "Something went wrong";
//       // alert(msg);
//       toast.error(msg);
//     },
//   });

//   return {
//     DisplayCart: mutation.mutate,
//     DisplayCartAsync: mutation.mutateAsync,
//     DisplayCartData: mutation.data,
//     DisplayCartloading: mutation.isPending,
//     DisplayCarterror: mutation.isError
//       ? (mutation.error as unknown as Error).message
//       : null,
//     DisplayCartisSuccess: mutation.isSuccess,
//   };
// };

type ErrorMessage = {
  response: {
    data: {
      error: string;
    };
  };
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});

const RemoveByuserID = async (id: number) => {
  console.log("the user id is", id);

  const response = await axiosInstance.delete(`/cart/removalOfByUserId/${id}`);
  console.log(response);
  //   console.log("the response is", response);
  return response.data; // this will be a Blob
};

export const useRemoveByuserId = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: RemoveByuserID,
    onSuccess: (data: any) => {
      console.log("Received Data", data);
      if (data.success == true) {
        queryClient.invalidateQueries({
          queryKey: ["displaycart", id],
        });
      }
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
      console.error("PDF download error:", err);
    },
  });

  return {
    RemoveUserCart: mutation.mutateAsync,
    RemoveUserCartdata: mutation.data,
    RemoveUserCartloading: mutation.isPending,
    RemoveUserCarterror: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    RemoveUserCartSuccess: mutation.isSuccess,
  };
};
