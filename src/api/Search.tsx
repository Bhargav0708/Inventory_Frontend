// type ErrorMessage = {
//   response: {
//     data: {
//       error: string;
//     };
//   };
// };
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

// const SearchData = async (data: any) => {
//   console.log("this is data in the search....", data);
//   // console.log("object");
//   console.log("the data is in the submit Add product Request", data);
//   const response = await axiosInstance.get(`/product/productsearch?${data}`);
//   console.log("the Response Of the Search............", response);
//   return response.data.data; // { token: "..." }
// };

// export const useSearchProduct = () => {
//   const mutation = useMutation({
//     mutationFn: SearchData,
//     onSuccess: (data) => {
//       console.log("the data of the search@@@@@@", data);
//       // toast.success("Stock Created SuccessFully");
//       // alert("Stock Created Successfully");
//       // toast.success("Stock Created Successfully");
//       return data;
//     },
//     onError: (err: ErrorMessage) => {
//       console.log("the err", err);
//       const msg = err?.response?.data?.error || "Something went wrong";
//       // alert(msg);
//       toast.error(msg);
//     },
//   });

//   return {
//     SearchData: mutation.mutate,
//     SearchDataAsync: mutation.mutateAsync,
//     data: mutation.data,
//     Searchloading: mutation.isPending,
//     Searcherror: mutation.isError
//       ? (mutation.error as unknown as Error).message
//       : null,
//     SearchProductisSuccess: mutation.isSuccess,
//   };
// };
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

export const useSearchProduct = () => {
  const mutation = useMutation({
    mutationFn: async (params: string) => {
      const res = await axiosInstance.get(`/product/productsearch?${params}`);
      console.log("the res@@@@", res);

      return res.data.data;
    },
  });

  const SearchDataAsync = useCallback(
    (params: string) => mutation.mutateAsync(params),
    [mutation]
  );

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    SearchData: mutation.data,
    SearchDataAsync,
    data: mutation.data,
  };
};
