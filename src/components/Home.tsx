import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProduct } from "../api/product/Product";
import { useStock } from "../api/stocks/Stock";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import AddModel from "./AddModel";
import { useDeleteProduct } from "../api/product/DeleteProduct";
import { useAuthContext } from "../hooks/LoginProviderContext";
import Navbar from "./Navbar";
import { useProductUpdate } from "../api/product/UpdateProduct";
import { toast } from "react-toastify";
export type Producttype = {
  product_id?: number;
  name: string;
  barcode?: string;
  description?: string;
  price: number; // Use number unless you absolutely need bigint
  image_url?: string;
  supplierid?: number;
  categoryid?: number;
  quantity?: number;
};
export const Home = () => {
  //  AllInfo
  //   name: string;
  //   barcode: string;
  //   description: string;
  //   price: number;
  //   supplier_id: number;
  //   category_id: number;
  //   productid: number;
  //   warehouse_id: number;
  //   quantity: number;
  //   minstock: number;
  //   maxstock: number;
  //   recordstock: number;

  const { data: ProductData, isLoading, error, refetch } = useProduct();
  const { data: responseData, loading: UpdateLoading } = useProductUpdate();
  const { token, setAuthToken, logout } = useAuthContext();
  console.log("the context token", token);
  const [Product, setProduct] = useState<Producttype[]>([]);
  const [Stock, setStock] = useState<Producttype[]>([]);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producttype | null>(
    null
  );
  const [isAddModelopen, setIsaddmodelopen] = useState(false);
  const location = useLocation();
  const { deleteProduct, loading, deleteproduct } = useDeleteProduct();
  const handleOpen = (id: number) => {
    const product = Product.find((p: Producttype) => p.product_id === id);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };
  const handleAddOpen = () => {
    setIsaddmodelopen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAddClose = () => {
    setIsaddmodelopen(false);
    // refetch();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Producttype>();
  const {
    data: stockData,
    isLoading: stockloading,
    error: stockerror,
  } = useStock();
  const storedToken = localStorage.getItem("token");
  const token2 = storedToken ? JSON.parse(storedToken) : null;
  const storedUserdata = localStorage.getItem("userdata");
  const user = storedUserdata ? JSON.parse(storedUserdata) : null;
  if (!token2 || !user) {
    // alert("Please Log in");
    toast.error("please Login");
    // toast.success("Logout Successfully");

    window.location.href = "/auth/login";
  }

  const name = user.userdata.name;
  const userid = user.userdata.id;
  const currentRole = user.userdata.Roles;
  if (currentRole[0].role_name !== "supplier") {
    // alert("Your Role is Not Supplier Please Login as supplier");
    window.location.href = "/customer/dashboard";
  }

  useEffect(() => {
    if (ProductData?.data && stockData) {
      console.log("response have occured");
      setProduct(ProductData.data);
      setStock(stockData.data);
    }
  }, [ProductData, stockData]);

  // useEffect(() => {
  //   async function FetchProducts() {
  //     try {
  //       const ProductFetch = await ProductAllData();
  //       console.log("the products in the use effect ok..", ProductFetch.data);
  //       console.log("this is Query data ", ProductData.data);
  //       console.log("the stock data in the fetch products", stockData.data);

  //       if (ProductFetch && stockData) {
  //         setProduct(ProductFetch.data);
  //         setStock(stockData.data);
  //       }
  //     } catch (error) {
  //
  //     }
  //   }
  //   FetchProducts();
  // }, [ProductAllData, ProductData]);

  // useEffect(() => {
  //   if (ProductsData && stockData) {
  //     console.log("Both product and stock data available", ProductsData);
  //     // setProduct(ProductsData);
  //     // setStock(stockData.data); // adjust based on your actual stock structure
  //   }
  // }, [ProductsData, stockData]);

  console.log("the stock data is ", Stock);
  console.log("the data is response", ProductData);
  console.log("the product is", Product);

  Product.map((user: Producttype) => {
    console.log(user.product_id);
  });
  console.log("the user id is .........", userid);
  const displayedProducts = Product.filter(
    (user: Producttype) => user.supplierid === userid
  ).map((user: Producttype) => ({
    id: user.product_id,
    name: user.name,
    price: Number(user.price),
    image: user.image_url,
  }));

  const DelteProduct = async (Deleteid: any) => {
    // alert("Are You Sure Want to Delete");
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    deleteProduct(Deleteid);
    setProduct((prev) =>
      prev.filter((product) => product.product_id !== Deleteid)
    );
  };
  const Logout = () => {
    // alert("Are You Sure Want to LogOut")
    const confirm = window.confirm("Are you sure you want to Logout?");
    if (!confirm) return;
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    window.location.href = "/auth/login";
  };
  const path = [
    {
      path: "/product/dashboard",
      isActive: false,
      label: "Home",
    },
    {
      path: "/product/stock",
      isActive: false,
      label: "Stock",
    },
    {
      path: "/product/sales",
      isActive: false,
      label: "Sales",
    },
  ];

  const currentPath = window.location.pathname;
  return (
    <div className="max-w-6xl mx-auto p-6" id="dashboard">
      {UpdateLoading ? (
        <span className="spinner"></span>
      ) : (
        <>
          <Navbar />
          <h1 className="text-2xl font-semibold mb-8">Hello,{name} </h1>
          <section className="mb-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-l-4 border-indigo-600 pl-2">
              My Products
            </h2>
            <button
              className=" text-black px-4 py-2 rounded hover:bg-green-500 transition"
              onClick={handleAddOpen}
            >
              Add Product
            </button>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Image_URL</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-red-500 py-4">
                      You have no products.
                    </td>
                  </tr>
                ) : (
                  displayedProducts.map(({ id, name, price, image }) => (
                    <tr key={id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 font-medium">{name}</td>
                      <td className="px-4 py-2 text-green-600">
                        ${price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        {image ? (
                          <a
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={image}
                              alt={name}
                              className="w-16 h-16 object-cover rounded cursor-pointer"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>
                      <td className="px-4 py-2 flex justify-center space-x-2">
                        <button
                          className=" text-black  rounded hover:bg-indigo-500 transition border-4 "
                          onClick={() => {
                            handleOpen(id!);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className=" text-black px-3 py-1 rounded hover:bg-red-500 transition"
                          onClick={() => {
                            DelteProduct(id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {isModelOpen && selectedProduct && (
            <Modal handleClose={handleClose} product={selectedProduct} />
          )}
          {isAddModelopen && (
            <AddModel
              handleClose={handleAddClose}
              setProduct={setProduct}
              product={Product}
            />
          )}
        </>
      )}
    </div>
  );
};
