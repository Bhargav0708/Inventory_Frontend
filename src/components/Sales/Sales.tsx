import React, { useEffect, useState } from "react";
import { useSalesOrders } from "../../api/sales/SalesOrders";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFilePdf } from "react-icons/fa";

import ReactPaginate from "react-paginate";
import { useSalesGen } from "../../api/sales/SalesOrderGen";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
type SalesDetails = {};
type SalesInfo = {
  sales_order_id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  order_status: string;
  order_date: string;
  purchase_order_id: number;
  unit_price: number;
  total_amount: number;
  salesUser?: {
    name: string;
    email: string;
    phone: number;
    id: number;
  };
  salesproducts?: {
    name: string;
    price: number;
    barcode: string;
    supplierid: number;
  };
};
type FinalSale = {
  orderid: number;
  customer: string;
  product: string;
  quantity: number;
  status: string;
  supplier?: number;
  order_date: string;
  phone?: number;
  email?: string;
  unit_price?: number;
  total_amount?: number;
};
type MappedData = {
  purchase_order_id: number;
  salesUser: {
    name: string;
    phone: string;
    email: string;
  };
  salesproducts: {
    name: string;
    supplierid: number;
  };
  quantity: number;
  order_status: string;
  order_date: string;
  unit_price: string;
  total_amount: number;
};

const ITEMS_PER_PAGE = 5;
const Sales = () => {
  // const [salesAllData, setSalesAllData] = useState([]);
  const [sales, setSales] = useState<SalesInfo[]>([]);
  const [finalSalesData, setFinalSalesData] = useState<FinalSale[]>([]);
  const [currentItems, setCurrentItems] = useState<FinalSale[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [customPage, setCustomPage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // const [isGen, setIsgen] = useState("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;
  const storedUserdata = localStorage.getItem("userdata");
  const user = storedUserdata ? JSON.parse(storedUserdata) : null;

  const name = user.userdata.name;
  const userid = user.userdata.id;
  const {
    data: SalesData,
    isLoading: stockloading,
    error: stockerror,
  } = useSalesOrders();
  const {
    SalesOrderGenration,
    data: SalesGenData,
    loading: loadingGen,
    error: GenError,
  } = useSalesGen();

  useEffect(() => {
    if (Array.isArray(SalesData)) {
      setSales(SalesData);
    } else if (SalesData && typeof SalesData === "object") {
      setSales([SalesData]);
    } else {
      setSales([]);
    }
  }, [SalesData]);
  useEffect(() => {
    if (!sales || sales.length === 0 || !userid) {
      setFinalSalesData([]);
      return;
    }

    const mappedData: FinalSale[] = sales.map((u: SalesInfo) => ({
      orderid: u.purchase_order_id,
      customer: u.salesUser?.name || "N/A",
      product: u.salesproducts?.name || "N/A",
      quantity: u.quantity,
      status: u.order_status,
      supplier: u.salesproducts?.supplierid,
      order_date: u.order_date,
      phone: u.salesUser?.phone,
      email: u.salesUser?.email,
      unit_price: u.unit_price,
      total_amount: u.total_amount,
    }));
    const dummysupplierid = 2;
    // Filter sales belonging to current user (supplier)
    // const filteredData = mappedData.filter((item) => item.supplier === userid);
    const filteredData = mappedData.filter(
      (item) => item.supplier === dummysupplierid
    );

    setFinalSalesData(filteredData);
  }, [sales, userid]);
  useEffect(() => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(finalSalesData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(finalSalesData.length / ITEMS_PER_PAGE));
  }, [itemOffset, finalSalesData]);
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
    const newOffset = (event.selected * ITEMS_PER_PAGE) % finalSalesData.length;
    setItemOffset(newOffset);
  };
  const handleCustomPageSubmit = () => {
    const pageNum = Number(customPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) {
      const newPage = pageNum - 1; // zero-based index

      const newOffset =
        ((pageNum - 1) * ITEMS_PER_PAGE) % finalSalesData.length;
      setItemOffset(newOffset);
      setCurrentPage(newPage);
    } else {
      alert(`Enter a valid page number 1 to ${pageCount}.`);
    }
    setCustomPage("");
  };

  const Logout = () => {
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

  const handleDownloadPDF = async () => {
    try {
      const dummy_supplierId = 2;
      // console.log("Downloading PDF for supplier ID:", dummy_supplierId);

      // const response = await SalesOrderGenration(dummy_supplierId);
      console.log("the user id", userid);
      const blob = await SalesOrderGenration(userid);
      console.log("Recieved Blob", blob);
      if (blob && blob.type == "application/json") {
        console.log("the blob type is json.......");
        toast.error("No PDf Found");
      } else {
        toast.success("PDF Downloaded SuccessFully");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Error downloading PDF.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-semibold mb-6 text-indigo-700">
        Stock Management for {name}
      </h1>
      <button
        onClick={handleDownloadPDF}
        className="text-red-600 hover:text-red-800 flex items-center gap-1"
      >
        <FaFilePdf size={20} />
        PDF
      </button>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-l-4 border-indigo-600 pl-2">
          Sales Orders
        </h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-red-500 py-4">
                  You have no Sales.
                </td>
              </tr>
            ) : (
              currentItems.map(
                ({ orderid, customer, product, quantity, status }) => (
                  <tr key={orderid} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{orderid}</td>
                    <td className="px-4 py-2">{customer}</td>
                    <td className="px-4 py-2">{product}</td>
                    <td className="px-4 py-2">{quantity}</td>
                    <td className="px-4 py-2">{status}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="flex space-x-2"
            pageClassName="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            previousClassName="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            nextClassName="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            breakClassName="px-3 py-1 rounded bg-gray-200"
            activeClassName="bg-indigo-600 text-white"
            forcePage={currentPage}
          />
          <div className="flex items-center space-x-2 ml-4">
            <input
              type="number"
              min="1"
              max={pageCount}
              value={customPage}
              onChange={(e) => setCustomPage(e.target.value)}
              className="w-20 px-2 py-1 border rounded"
              placeholder="Go to"
            />
            <button
              onClick={handleCustomPageSubmit}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Go
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sales;
