import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://inventory-backend-hjmi.onrender.com//",
  timeout: 10000,
  withCredentials: true,
});

const SalesOrders = async () => {
  const response = await axiosInstance.get<any>(
    "/salesorder/AllCustomerDataOfSales"
  );
  console.log("the response is", response);
  toast.success("Sales Orders Are Fetched Successfully");
  return response.data.AllCustomerData;
};

export const useSalesOrders = () => {
  return useQuery({
    queryKey: ["salesorders"],
    queryFn: SalesOrders,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};
