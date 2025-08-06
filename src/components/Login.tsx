import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginScehma } from "../schema/LoginSchema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginup } from "../api/auth/Login";
import { Eye, EyeOff } from "lucide-react";

type LoginFormType = z.infer<typeof loginScehma>;
const Login = () => {
  // const [data, setData] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    shouldUnregister: true,
    resolver: zodResolver(loginScehma),
  });
  const { login, loading, error, isSuccess } = useLoginup();
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const selectedRole = watch("role");
  console.log("Selected Role:", selectedRole);
  const onSubmit = (data: LoginFormType) => {
    try {
      const response = login(data);
      console.log("the suces is", isSuccess);
      console.log("the eror loader", error);
      console.log("the response of login is", response);
      // console.log(onSucess);
      // console.log("the login is", response.data.error);
    } catch (error) {
      console.log("error is ", error);
    }
    // useLoginup(data);

    // if(Login.response)
    // console.log(Login.response);

    // console.log(data);
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <div>
        {loading ? (
          <span className="spinner"></span>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <input {...register("email", { required: "email Is Required" })} />
            {errors.email && <p>{errors.email.message}</p>}
            <br />

            {/* <label htmlFor="password">password</label>
            <input
              type={type}
              {...register("password", { required: "Password Is Required" })}
            />
            <span
              className="flex justify-around items-center"
              onClick={handleToggle}
            >
              
            </span>
            <br />
            {errors.password && <p>{errors.password.message}</p>} */}
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password Is Required" })}
                className="w-full pr-10"
              />
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleToggle}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <label htmlFor="role">role</label>
            <select {...register("role", { required: "Role is Required" })}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="supplier">Supplier</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
            <br />
            <button type="submit">Login</button>
          </form>
        )}
      </div>

      {/* <button>Not Registerd click me</button> */}
      <div className="foooter">
        Not Registred
        <button
          onClick={() => {
            window.location.href = "/auth/signup";
          }}
        >
          Click to register
        </button>
      </div>
    </div>
  );
};

export default Login;
