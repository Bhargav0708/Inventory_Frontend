import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { useProduct } from "../../api/product/Product";
import { useStock } from "../../api/stocks/Stock";
import ModifyStockModel from "./ModifyStockModel";
import Navbar from "../Navbar";

type StockType = {
  productid: number;
  quantity: number;
  stockid: number;
  recordstock: number;
  minstock: number;
  maxstock: number;
};

type ProductType = {
  barcode: string;
  categoryid: number;
  description: string;
  image_url: string;
  name: string;
  price: bigint;
  product_id: number;
  supplierid: number;
};
type StockUpdate = {
  // stockid: number;
  quantity: number;
  productid: number;

  // recordstock: number;
  // minstock: number;
  // maxstock: number;
};
type DisplayedProduct = {
  id: number | undefined;
  name: string;
  stock: number | bigint | string;
};
const Stock = () => {
  const [stockList, setStockList] = useState<StockType[]>([]);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [isStockModifyOpen, setIsStockModifyOpen] = useState(false);
  const [stockQuantity, setselectStockQuantity] = useState<StockUpdate>({
    quantity: 0,
    productid: 0,
  });
  const { data: productData } = useProduct();
  const { data: stockData } = useStock();

  const storedUserData = localStorage.getItem("userdata");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
  const name = user?.userdata?.name ?? "User";
  const userId = user?.userdata?.id;

  useEffect(() => {
    if (productData?.data && stockData?.data) {
      setProductList(productData.data);
      setStockList(stockData.data);
    }
  }, [productData, stockData]);

  const displayedProductsWithStock: DisplayedProduct[] = productList
    .filter(
      (product) =>
        product.supplierid === userId &&
        stockList.some((s) => s.productid === product.product_id)
    )
    .map((product) => {
      const stock = stockList.find((s) => s.productid === product.product_id);
      return {
        id: stock?.stockid,
        name: product.name,
        stock: stock?.quantity ?? "Out of Stock",
      };
    });

  const handleStockModifyOpen = (id: number) => {
    console.log("this is the current id", id);

    // const stockids = stockList.find((s) => s.stockid === id);
    // const findProductid = stockList.find(
    //   (productid: any) => productid.stockid === id
    // );
    // const productid = findProductid?.productid;

    const stock = stockList.find((s: any) => s.stockid === id);
    console.log("the matching stock", stock);
    if (stock) {
      console.log("this is id of stock", id);
      setselectStockQuantity({
        quantity: stock.quantity,
        productid: stock.productid,
      });
      setIsStockModifyOpen(true);
    }
  };
  const handleStockModifyClose = () => {
    setIsStockModifyOpen(false);
  };
  // const Logout = () => {
  //   // alert("Are You Sure Want to LogOut")
  //   const confirm = window.confirm("Are you sure you want to Logout?");
  //   if (!confirm) return;
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userdata");
  //   window.location.href = "/login";
  // };
  // const path = [
  //   {
  //     path: "/product/dashboard",
  //     isActive: false,
  //     label: "Home",
  //   },
  //   {
  //     path: "/product/stock",
  //     isActive: false,
  //     label: "Stock",
  //   },
  //   {
  //     path: "/product/sales",
  //     isActive: false,
  //     label: "Sales",
  //   },
  // ];
  console.log("this is location", window.location.pathname);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* <div className="flex justify-end mb-6 space-x-8">
        {path.map(({ path, label }) => {
          // const isActive = currentPath;
          const isActive = currentPath === path;
          return (
            <button
              className={`px-4 py-2 rounded font-medium ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-indigo-600 hover:bg-indigo-200"
              }`}
            >
              <a href={path} className="">
                {label}
              </a>
            </button>
          );
        })}

        <a
          href="#"
          className="text-indigo-600 hover:text-indigo-400  px-4 py-2 rounded font-medium"
          onClick={Logout}
        >
          Logout
        </a>
      </div> */}
      <Navbar />
      <h1 className="text-2xl font-semibold mb-6 text-indigo-700">
        Stock Management for {name}
      </h1>
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-l-4 border-indigo-600 pl-2">
          Current Stock
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProductsWithStock.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-red-500 font-medium"
                >
                  You have no stock entries.
                </td>
              </tr>
            ) : (
              displayedProductsWithStock.map(({ id, name, stock }) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">
                    {typeof stock === "bigint" ? stock.toString() : stock}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-indigo-600 text-black px-3 py-1 rounded hover:bg-indigo-500 transition"
                      onClick={() => {
                        console.log("on modify the id is ", id);
                        handleStockModifyOpen(id!);
                      }}
                    >
                      Modify
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {isStockModifyOpen && (
        <ModifyStockModel
          handleClose={handleStockModifyClose}
          stock={stockQuantity}
        />
      )}
    </div>
  );
};

export default Stock;
