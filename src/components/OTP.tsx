import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

// import { useOtp } from "../api/auth/Otp";

import { useOtp } from "../api/auth/Otp";
useForm;
// type OTPFormType = z.infer<typeof otpSchema>;
interface otp {
  otp: number;
  // email: string;
}
const OTP = () => {
  const [data] = useState("");
  const location = useLocation();
  // const navigate = useNavigate();
  const token = location.state?.token;
  const email = location.state?.email;
  const { otp } = useOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<otp>({
    shouldUnregister: true,
    // resolver: zodResolver(otpSchema),
  });
  const onsubmit = (data: any) => {
    // console.log(data);
    console.log("the data is ", data);
    const mergedData = {
      ...data,
      email: email,
      token: token,
    };
    console.log("the data of mergded data", mergedData);
    otp(mergedData);
  };
  console.log("the data is of otp is ", data);

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <h1>OTP Verification</h1>
        <label htmlFor="otp">OTP</label>
        <input {...register("otp", { required: "Otp Is Required" })} />
        {errors.otp && <p>{errors.otp.message}</p>}
        <br />

        {/* <label htmlFor="email">email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <p>{errors.email.message}</p>}
        <br /> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OTP;
