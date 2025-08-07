// import axios from "axios";
// import { useEffect, useState } from "react";

// const instance = axios.create({
//   baseURL: "https://inventory-backend-hjmi.onrender.com//",
//   timeout: 5000,
// });

// export const useAxiosPost = (endpoint: string, body: {}) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState<null | string>(null);
//   const [loadng, setLoading] = useState(true);
//   useEffect(() => {
//     const postData = async () => {
//       if (!body || Object.keys(body).length === 0) return;
//       try {
//         let result = await instance.post(endpoint, body);
//         setData(result.data);
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Unknow error occured");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     postData();
//   }, [endpoint]);

//   return { data, loadng, error };
// };

// handler.ts
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const instance = axios.create({
//   baseURL: "https://inventory-backend-hjmi.onrender.com//",
//   timeout: 5000,
// });

// export const useAxiosPost = (endpoint: string, body: any) => {
//   console.log("the axios file");
//   const [data, setData] = useState(null);
//   const [error, setError] = useState<null | string>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!body || Object.keys(body).length === 0) return;

//     const postData = async () => {
//       try {
//         const result = await instance.post(endpoint, body, {
//           withCredentials: true,
//         });
//         console.log("the resukt", result);

//         // console.log("the data is in the axios", data);
//         console.log("✅ Axios response:", result.data); // LOG HERE
//         const token = result.data.token;
//         setData(token);
//         // navigate("/verifyotp", { state: { token } });

//         // alert("Register Successfully");
//         // console.log("the data is the after the post ", data);
//       } catch (error) {
//         // setError("");
//         // console.log("the error is", error.response);
//         // const error_message = error.response.data.message;
//         console.log("message is", error);
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     setError("");
//     postData();
//   }, [endpoint, body, error]); // include body

//   return { data, loading, error };
// };
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { signupSchema } from "../schema/SignupSchema";
// import type z from "zod";
// // import { SignupFormType } from "../schema/SignupSchema";
// type SignupFormType = z.infer<typeof signupSchema>;

// const axiosInstance = axios.create({
//   baseURL: "https://inventory-backend-hjmi.onrender.com/",
//   timeout: 5000,
//   withCredentials: true,
// });

// const signupRequest = async (formData: SignupFormType) => {
//   console.log("object");
//   const response = await axiosInstance.post("/signup", formData);
//   return response.data; // { token: "..." }
// };

// // const verifyotp = async () => {
// //   console.log("object");
// //   const response = await axiosInstance.post("/signup", OtpData);
// //   return response.data;
// // };

// export const useSignup = () => {
//   const navigate = useNavigate();

//   const mutation = useMutation({
//     mutationFn: signupRequest,
//     onSuccess: (data) => {
//       console.log("the data is handler tanstack", data);
//       alert("Registered Successfully");
//       navigate("/verifyotp", { state: { token: data.token } });
//     },
//     onError: (err: any) => {
//       const msg = err?.response?.data?.message || "Something went wrong";
//       alert(msg);
//     },
//   });

//   return {
//     signup: mutation.mutate,
//     data: mutation.data,
//     loading: mutation.isPending,
//     error: mutation.isError ? (mutation.error as Error).message : null,
//     isSuccess: mutation.isSuccess,
//   };
// };
