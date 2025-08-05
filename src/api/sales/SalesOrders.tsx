import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});

const SalesOrders = async () => {
  const response = await axiosInstance.get(
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
