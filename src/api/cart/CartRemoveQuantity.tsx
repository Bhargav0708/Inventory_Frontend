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
//   baseURL: "https://inventory-backend-hjmi.onrender.com/",
//   timeout: 5000,
//   withCredentials: true,
// });

// const DisplayCart = async (data: any) => {
//   console.log("object");
//   console.log("Adding cart Data@@@", data);
//   // const CartData = {
//   //   userid: cartBody.id,
//   //   productid: cartBody.product_id,
//   //   quantity: cartBody.quantity,
//   //   price: cartBody.price,
//   // };

//   const response = await axiosInstance.get(`/cart/getcart/${data}`);
//   console.log("the repsone is @@@", response);
//   return response.data.data; // { token: "..." }
// };

// // const verifyotp = async () => {
// //   console.log("object");
// //   const response = await axiosInstance.post("/signup", OtpData);
// //   return response.data;
// // };

// export const useDisplayCart = () => {
//   const mutation = useMutation({
//     mutationFn: DisplayCart,
//     onSuccess: (data) => {
//       console.log("the data is handler tanstack", data);
//       // toast.success("Stock Created SuccessFully");
//       // alert("Stock Created Successfully");
//       //   toast.success(" Item To the cart  Successfully");
//       return data;
//     },
//     onError: (err: any) => {
//       console.log("the err", err);
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
  baseURL: "https://inventory-backend-hjmi.onrender.com//",
  timeout: 10000,
  withCredentials: true,
});

const RemoveQuantity = async ({
  id,
  quantity,
  uid,
}: {
  id: number;
  quantity: number;
  uid: number;
}) => {
  console.log("Product id in api", id);
  console.log("quanity to be removed in api", quantity);
  console.log("the userid in removal", uid);
  const datatobesent = {
    pid: id,
    pquantity: quantity,
    userid: uid,
  };
  // const response = await axiosInstance.get(`/cart/getcart/${id}`);
  const response = await axiosInstance.put<any>(
    `/cart/cartupdatequantity/${id}`,
    datatobesent
  );
  console.log("the response is", response);
  return response.data.data;
  //   return response.data; // this will be a Blob
};

export const useRemoveQuantity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: RemoveQuantity,
    onSuccess: (data) => {
      console.log("Received Data in Removal API", data);
      const userid = data[0].userid;
      queryClient.invalidateQueries({
        queryKey: ["displaycart", userid],
      });
      return data;
    },
    onError: (err: ErrorMessage) => {
      console.log("the err on the remove API", err);
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
      console.error("PDF download error:", err);
    },
  });

  return {
    RemoveQuanity: mutation.mutateAsync,
    RemoveQuantitydata: mutation.data,
    RemoveQuantityloading: mutation.isPending,
    RemoveQuantityerror: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    RemoveQuanitySuccessfully: mutation.isSuccess,
  };
};
