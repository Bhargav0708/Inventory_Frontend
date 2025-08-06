// const SalesOrderGen = async (id: number) => {
//   console.log("the data in the salesOrderGen id is", id);

//   const response = await axiosInstance.get(`/pdfroute/sales-orders/${id}`);

//   console.log("the response is", response);
//   return response.data; // this should return { data: [...] }
// };

// export const useSalesGen = () => {
//   //   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: SalesOrderGen,
//     onSuccess: (data) => {
//       console.log("the data is on onSucess of UpdateProduct", data);
//       //   alert(data.message);
//       if (data.data == null) {
//         alert("No Sales ");
//         alert("Unable to download ");
//       } else {
//         alert("Pdf Download successfully");
//       }
//     },
//     onError: (err: any) => {
//       console.log("the err onErrr function", err);
//       const msg = err?.response?.data?.error || "Something went wrong";
//       alert(msg);
//     },
//   });
//   return {
//     SalesOrderGenration: mutation.mutate,
//     data: mutation.data,
//     loading: mutation.isPending,
//     error: mutation.isError ? (mutation.error as Error).message : null,
//     isSuccess: mutation.isSuccess,
//   };
// };
// const SalesOrderGen = async (id: number) => {
//   const response = await axiosInstance.get(`/pdfroute/sales-orders/${id}`, {
//     responseType: "blob",
//   });
//   console.log("the response in the  salesorder request", response);
//   return response.data;
// };

// export const useSalesGen = () => {
//   const mutation = useMutation({
//     mutationFn: SalesOrderGen,
//     onSuccess: (blobData) => {
//       console.log("the blobdata", blobData);
//       if (
//         !blobData ||
//         blobData.size === 0 ||
//         blobData.type == "application/json"
//       ) {
//         alert("No Sales PDF available");
//         console.log("the blobData", blobData.type);
//         return blobData.type;
//         // return blobData.size;
//       } else {
//         const url = window.URL.createObjectURL(blobData);
//         window.open(url);
//         setTimeout(() => window.URL.revokeObjectURL(url), 1000);
//         alert("Pdf Download successfully");
//         // return true;
//       }
//     },
//     onError: (err: any) => {
//       const msg = err?.response?.data?.error || "Something went wrong";
//       alert(msg);
//     },
//   });

//   return {
//     SalesOrderGenration: mutation.mutate,
//     data: mutation.data,
//     loading: mutation.isPending,
//     error: mutation.isError ? (mutation.error as Error).message : null,
//     isSuccess: mutation.isSuccess,
//   };
// };
type ErrorMessage = {
  response: {
    data: {
      error: string;
    };
  };
};
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});

const SalesOrderGen = async (id: number): Promise<Blob> => {
  const response = await axiosInstance.get(`/pdfroute/sales-orders/${id}`, {
    responseType: "blob", // important for file
  });
  console.log("the response is", response);
  return response.data; // this will be a Blob
};

export const useSalesGen = () => {
  const mutation = useMutation({
    mutationFn: SalesOrderGen,
    onSuccess: (blobData: Blob) => {
      //   console.log("Received blob:", blobData);

      if (
        !blobData ||
        blobData.size === 0 ||
        blobData.type === "application/json"
      ) {
        alert("No PDF found or empty response.");
        return;
      }
      const url = window.URL.createObjectURL(blobData);
      window.open(url);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      //   alert("Pdf Download successfully");
      //download Logic
      //   const url = window.URL.createObjectURL(blobData);
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.setAttribute("download", "sales-report.pdf"); // file name
      //   document.body.appendChild(link);
      //   link.click();
      //   link.remove();

      //   setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      //   alert("PDF downloaded successfully");
    },
    onError: (err: ErrorMessage) => {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
      // alert(msg);
      console.error("PDF download error:", err);
    },
  });

  return {
    SalesOrderGenration: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError
      ? (mutation.error as unknown as Error).message
      : null,
    isSuccess: mutation.isSuccess,
  };
};
