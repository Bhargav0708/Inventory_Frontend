// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// // import { useNavigate } from "react-router-dom";

// // import type z from "zod";
// // import { signupSchema } from "../../schema/SignupSchema";
// // import { SignupFormType } from "../schema/SignupSchema";
// // type SignupFormType = z.infer<typeof signupSchema>;

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000/",
//   timeout: 2000,
//   withCredentials: true,
// });

// // const ProductDisplay = async () => {
// //   console.log("object");
// //   const response = await axiosInstance.get("/product/allproducts");
// //   return response.data; // { token: "..." }
// // };
// const ProductDisplay = async () => {
//   try {
//     console.log("this is product ");
//     //   console.log("Fetching products with token:", token);
//     const response = await axiosInstance.get("/product/allproducts");
//     console.log("the response", response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// // const verifyotp = async () => {
// //   console.log("object");
// //   const response = await axiosInstance.post("/signup", OtpData);
// //   return response.data;
// // };

// export const useProduct = () => {
//   //   const navigate = useNavigate();

//   const mutation = useMutation({
//     mutationFn: ProductDisplay,
//     onSuccess: (data) => {
//       console.log("the data is handler tanstack", data);
//       //   return data;
//     },
//     onError: (err: any) => {
//       const msg = err?.response?.data?.message || "Something went wrong";
//       alert(msg);
//     },
//   });

//   console.log("this is mutaion of data", mutation.data);
//   return {
//     product: mutation.mutate,
//     Data: mutation.data?.data,
//     loading: mutation.isPending,
//     error: mutation.isError ? (mutation.error as Error).message : null,
//     isSuccess: mutation.isSuccess,
//   };
// };
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});

const StockDisplay = async () => {
  const response = await axiosInstance.get("/stocks/allstocks");
  console.log("the response is", response);
  // toast.success("All Stocks Are Fetched Successfully");
  return response.data;
};

export const useStock = () => {
  return useQuery<any>({
    queryKey: ["stocks"],
    queryFn: StockDisplay,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};
