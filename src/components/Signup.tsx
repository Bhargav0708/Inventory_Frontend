import { useForm } from "react-hook-form";

// import OTP from "./OTP";
import "../index.css";
// import "../signup.css";
// import { useSignup } from "../api/handler";

import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schema/SignupSchema";
import z from "zod";
import { useSignup } from "../api/auth/Signup";
type SignupFormType = z.infer<typeof signupSchema>;

export const Signup = () => {
  // const navigate = useNavigate();
  // const [data, setData] = useState<SignupFormType | null>(null);
  const { signup, loading } = useSignup();

  const {
    register,
    handleSubmit,

    formState: { errors },
    watch,
  } = useForm({
    shouldUnregister: true,
    resolver: zodResolver(signupSchema),
  });
  const role = watch("role");

  // const onSubmit = (data: SignupFormType) => {
  //   console.log(data);
  //   setData(data);
  //   // console.log("the data is", data);
  // };
  const onSubmit = async (data: SignupFormType) => {
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    // setData(data);
    localStorage.setItem("useremail", data.email);
    signup(data);
  };

  return (
    <div className="signup-form">
      {/* {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )} */}
      <div>
        {/* {loading && <span className="spinner"></span>} */}
        {loading ? (
          <span className="spinner"></span>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Signup</h1>

            <label className="label" htmlFor="name">
              name
            </label>
            <input {...register("name", { required: true })} />
            {errors.name && <p>{errors.name.message}</p>}
            <br />
            <label className="label" htmlFor="email">
              email
            </label>
            <input
              {...register("email")}
              //   required: true,
              //   pattern: {
              //     value: /^[^s@]+@[^s@]+.[^s@]+$/,
              //     message: "Invalid email format",
              //   },
              // })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <br />

            <label className="label" htmlFor="password">
              password
            </label>
            <input
              {...register("password")}
              //   required: true,
              //   min: 6,
              //   max: 15,
              //   pattern: {
              //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
              //     message:
              //       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              //   },
              // })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <br />

            <label className="label" htmlFor="phone">
              phone
            </label>
            <input
              {...register("phone")}
              //   required: true,
              //   pattern: {
              //     value: /^[0-9]{10}$/,
              //     message: "Phone number have must 10 digits",
              //   },
              // })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <br />

            <label className="label" htmlFor="role">
              role
            </label>
            <select {...register("role", { required: true })}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="supplier">Supplier</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
            <br />

            {role === "customer" && (
              <>
                <label className="label" htmlFor="customertype">
                  customertype
                </label>
                <select {...register("customertype", { required: true })}>
                  <option value="">Select Customer Type</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
                {errors.customertype && <p>{errors.customertype.message}</p>}
                <br />
              </>
            )}
            <button type="submit" disabled={loading}>
              {/* {loading && <span className="spinner"></span>} */}
              {/* {loading ? "Registering..." : "Register"} */}
              Register
            </button>
          </form>
        )}
      </div>
      <div className="foooter">
        Already A User
        <button
          onClick={() => {
            window.location.href = "/auth/login";
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
