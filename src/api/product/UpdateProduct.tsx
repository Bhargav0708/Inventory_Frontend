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
// type updateProudct = {
//   name: string;
//   price: number;
//   product_image: string;
//   product_id: number;
// };

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});
// {name: 'sfsdfds', price: 3424234, image_url: FileList, product_id: 45}
const UpdateProduct = async (data: FormData) => {
  console.log("the data sent succesfully to the request", data);
  // const id  =
  //   const id = data.product_id;
  const id = data.get("product_id");

  const response = await axiosInstance.put(
    `/product/updateproduct/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data", // IMPORTANT for file uploads
      },
    }
  );

  console.log("the response is", response);
  return response.data; // this should return { data: [...] }
};

export const useProductUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: (data) => {
      console.log("the data is on onSucess of UpdateProduct", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      toast.success("Product Updated Succesfully");
      // alert("Product updated successfully");
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
    },
  });
  return {
    updateProduct: mutation.mutate,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
