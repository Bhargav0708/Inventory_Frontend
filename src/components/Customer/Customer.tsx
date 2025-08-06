import "../../Customer.css";
import CustomerNavBar from "../CustomerNavBar";
import Card from "./Card";
const Customer = () => {
  // const storedToken = localStorage.getItem("token");
  // const token = storedToken ? JSON.parse(storedToken) : null;
  const storedUserdata = localStorage.getItem("userdata");
  const user = storedUserdata ? JSON.parse(storedUserdata) : null;

  const name = user.userdata.name;
  const userid = user.userdata.id;
  console.log("the userid", userid);
  // const path = [
  //   {
  //     path: "/Home",
  //     isActive: false,
  //     label: "Home",
  //   },
  //   {
  //     path: "/Stock",
  //     isActive: false,
  //     label: "Stock",
  //   },
  //   {
  //     path: "/Sales",
  //     isActive: false,
  //     label: "Sales",
  //   },
  // ];
  // const Logout = () => {
  //   // alert("Are You Sure Want to LogOut")
  //   const confirm = window.confirm("Are you sure you want to Logout?");
  //   if (!confirm) return;
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userdata");
  //   window.location.href = "/auth/login";
  // };
  // // let idx = 0;
  console.log("this is location", window.location.pathname);
  // const currentPath = window.location.pathname;
  return (
    <div>
      <CustomerNavBar />

      <div>Welcome {name}</div>
      <div>
        this is customer dashboard
        {/* <input type="text" id="input" className="flex justify-end w-2.5" /> */}
      </div>
      <div>
        <Card />
      </div>
      <div>{/* <Card /> */}</div>
    </div>
  );
};

export default Customer;
