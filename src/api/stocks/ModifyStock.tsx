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
type updateStock = {
  quantity: number;
  productid: number;
};

const axiosInstance = axios.create({
  baseURL: "https://inventory-backend-hjmi.onrender.com//",
  timeout: 10000,
  withCredentials: true,
});
// {name: 'sfsdfds', price: 3424234, image_url: FileList, product_id: 45}
const UpdateStock = async (data: updateStock) => {
  // console.log("the data sent succesfully to the update stock", data);
  // const id  =
  //   const id = data.product_id;
  // const id = data.get("product_id");
  // console.log("data", data);
  const quantity = data.quantity;
  const id = data.productid;
  console.log("the data and id is", quantity, id);
  const payload = {
    quantity: quantity,
  };

  console.log("the data i am getting before hit the route", data);
  // const datatobesent = JSON.stringify({ data });
  //   const response = await axiosInstance.put(
  //     `/product/updateproduct/${id}`,
  //     data,
  //     {}
  //   );
  // /stock/:id
  const response = await axiosInstance.put(`/stocks/stock/${id}`, payload);

  console.log("the response is", response);
  return response.data; // this should return { data: [...] }
};
// const updateStock = async ({ productid, quantity }: StockModifyQuantitupda) => {
//   const response = await fetch(`/api/stock/${productid}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ quantity }), // productid in URL param
//   });
//   return response.json();
// };

export const useStockUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: UpdateStock,
    onSuccess: (data) => {
      console.log("the data is on onSucess of UpdateProduct", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      // alert("stock updated successfully");
      toast.success("Stock Updated SuccessFully");
    },
    onError: (err: ErrorMessage) => {
      console.log("the err onErrr function", err);
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
    },
  });
  return {
    updateStock: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
