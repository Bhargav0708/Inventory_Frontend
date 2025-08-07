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
  baseURL: "https://inventory-backend-hjmi.onrender.com//",
  timeout: 10000,
  withCredentials: true,
});

const CateogryDisplay = async () => {
  try {
    const response = await axiosInstance.get("/supplier/allcateogires");
    console.log("the response is", response);
    // toast.success("Category Fetched Sucessfully");
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

export const useCateogry = () => {
  return useQuery<any>({
    queryKey: ["categories"],
    queryFn: CateogryDisplay,
    staleTime: 1000 * 60 * 0.2, // optional: cache for 5 minutes
  });
};
