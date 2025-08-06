// type ProducSTocktInfo = {
//   product_name: string;
//   product_barcode: string;
//   product_price: number;
//   description: string;
//   supplier_id: number;
//   category_id: number;
//   quantity: number;
//   warehouse_id: number;
//   minstock: number;
//   maxstock: number;
//   recordstock: number;
// };
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
// type ErrorMessage = {
//   response: {
//     data: {
//       error: string;
//     };
//   };
// };

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});

const ProductDisplay = async () => {
  try {
    const response = await axiosInstance.get("/product/allproducts");
    console.log("the response is", response);
    // toast.success("Products Fetched Sucessfully");
    return response.data;
  } catch (errors: unknown) {
    const err = errors as { response?: { data?: { error?: string } } };
    const msg = err.response?.data?.error;
    console.log(err.response);
    toast.error(msg);
    // alert(msg);
    // window.location.href = "/login";
    // throw new Error(err?.response?.data?.error || "Failed to fetch products");
  }

  // this should return { data: [...] }
};

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: ProductDisplay,
    staleTime: 1000 * 60 * 0.2, // optional: cache for 5 minutes
  });
};

// export const useProductAll = () => {
//   const mutation = useMutation({
//     mutationFn: ProductDisplay,
//     onSuccess: (data) => {
//       console.log("the data is handler tanstack", data);
//       // alert("Product Created Successfully");
//       toast.success("Product Created SucessFully");
//       return data;
//     },
//     onError: (err: ErrorMessage) => {
//       const msg = err?.response?.data?.error || "Something went wrong";
//       toast.error(msg);
//       // alert(msg);
//     },
//   });
//   return {
//     ProductAllData: mutation.mutateAsync,
//     ProductsData: mutation.data,
//     loading: mutation.isPending,
//     error: mutation.isError
//       ? (mutation.error as unknown as Error).message
//       : null,
//     isSuccess: mutation.isSuccess,
//   };
// };

// export const useProduct = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: ProductDisplay,
//     staleTime: 1000 * 60 * 0.2, // 12 seconds cache
//     onSuccess: (data: any) => {
//       // Do whatever you want with the fetched data here
//       console.log("Products fetched successfully:", data);

//       // For example, you can trigger a toast notification
//       toast.success("Products fetched successfully!");

//       // Or do other side effects like updating state outside this hook (via callback, context, etc.)
//     },
//     onError: (error: any) => {
//       // You can handle errors here as well
//       const msg =
//         (error as any)?.response?.data?.error || "Failed to fetch products";
//       toast.error(msg);
//     },
//   });
// };

// export const useProduct = () => {
//   const mutation = useMutation({
//     mutationFn: ProductDisplay,
//     onSuccess: (data) => {
//       console.log("the data is handler tanstack", data);
//       // alert("Product Created Successfully");
//       toast.success("Product Created SucessFully");
//       return data;
//     },
//     onError: (err: ErrorMessage) => {
//       const msg = err?.response?.data?.error || "Something went wrong";
//       toast.error(msg);
//       // alert(msg);
//     },
//   });

//   return {
//     ProductData: mutation.mutate,
//     // addProductAsync: mutation.mutateAsync,
//     // ProductData: mutation.data,
//     loading: mutation.isPending,
//     error: mutation.isError
//       ? (mutation.error as unknown as Error).message
//       : null,
//     isSuccess: mutation.isSuccess,
//   };
// };
