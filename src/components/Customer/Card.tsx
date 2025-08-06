import { useEffect, useMemo, useState } from "react";
import "../../Customer.css";
import { useProduct } from "../../api/product/Product";
import { toast } from "react-toastify";
import { useCateogry } from "../../api/cateogry/CategoryDisplay";
// import { useDispatch } from "react-redux";
// import { addtoCart } from "./CartSlice";
// import { Link } from "react-router-dom";
import { useSearchProduct } from "../../api/Search";
import { useAddCart } from "../../api/cart/CartCreate";
// import { useAddQuantity } from "../../api/cart/CartAddQuantity";
// import { useProductSearch } from "../../api/Search";
type Category = {
  cateogry_id: any;
  cid: number;
  name: string;
};
type Producttype = {
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
// type CartType = {
//   product_id: number;
//   quantity: number;
// };
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        margin: "20px 0",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          color: currentPage === 1 ? "#999" : "#333",
        }}
      >
        Previous
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: page === currentPage ? "#1a73e8" : "#fff",
            color: page === currentPage ? "#fff" : "#333",
            cursor: "pointer",
            fontWeight: page === currentPage ? "600" : "400",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: currentPage === totalPages ? "#f5f5f5" : "#fff",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          color: currentPage === totalPages ? "#999" : "#333",
        }}
      >
        Next
      </button>

      <span style={{ marginLeft: "20px", color: "black", fontSize: "14px" }}>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};
const Card = () => {
  const [Product, setProduct] = useState<Producttype[]>([]);
  const { data: ProductData, isLoading, error } = useProduct();
  const { data: CateogryData } = useCateogry();
  const [ProductCopy, setProductCopy] = useState(Product);
  const [cateogry, setCateogry] = useState<[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  // const dispatch = useDispatch();
  // pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page

  const { SearchDataAsync } = useSearchProduct();
  const { addCartAsync } = useAddCart();
  const storedUserdata = localStorage.getItem("userdata");
  const user = storedUserdata ? JSON.parse(storedUserdata) : null;
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/auth/login";
  }
  // const { AddQuantity, AddQuantityAsync } = useAddQuantity();

  // const name = user.userdata.name;
  const userid = user.userdata.id;

  useEffect(() => {
    if (ProductData && CateogryData) {
      setProduct(ProductData.data);
      setProductCopy(ProductData.data);
      setCateogry(CateogryData.data);
    }
  }, [ProductData, CateogryData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  const handleSearch = async (value: string) => {
    console.log("this is productCopy@@@", ProductCopy);
    if (!value.trim()) {
      if (ProductCopy) {
        setProduct(ProductCopy); // Reset to all products
      }
      return;
    }

    const params = new URLSearchParams({ search: value });

    try {
      const searchDATA = await SearchDataAsync(params.toString());
      console.log("the@@@@@", searchDATA);
      if (searchDATA.length > 0) {
        setProduct(searchDATA);
      } else {
        setProduct([]); // No match found
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to fetch search results.");
    }
  };

  useEffect(() => {
    if (!ProductCopy) return;
    const debouncedSearch = setTimeout(() => {
      handleSearch(search); // use the current search value
    }, 300);

    return () => clearTimeout(debouncedSearch);
  }, [search, ProductCopy]);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Product.slice(startIndex, endIndex);
  }, [Product, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(Product.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  console.log("the product data is", Product);
  console.log("the cateogry data is", cateogry);
  if (isLoading)
    // return <span style={{ textAlign: "center" }}>Loading products...</span>;
    return <span className="spinner"></span>;
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Failed to load products.
      </p>
    );
  async function handleBuyNow(product_id: number, product: Producttype) {
    console.log("the product id", product_id);
    console.log("the product is ", product);
    // dispatch(addtoCart(product));
    const Dataofthecart = {
      ...product,
      id: userid,
      quantity: 1,
    };
    console.log("the Whole Data ", Dataofthecart);
    const cartData = await addCartAsync(Dataofthecart);
    console.log("the cart data", cartData);
    window.location.href = "/customer/cart";
  }

  const handleCategoryChange = (value: string) => {
    const categoryId = value === "" ? "" : parseInt(value);
    setSelectedCategory(categoryId);

    if (value === "") {
      setProduct(ProductCopy);
      return;
    }

    const filtered = ProductCopy.filter(
      (product) => product.categoryid === categoryId
    );
    setProduct(filtered);
  };

  const Cateogrynm = cateogry.map((category: Category) => {
    console.log("the cateogry in nym", category);
    return {
      cid: category.cateogry_id,
      cname: category.name,
    };
  });

  const CartCreate = async (dataofproduct: any) => {
    console.log("i m in the creating cart");
    console.log("this is data of product ", dataofproduct);

    // const data;
    const Dataofthecart = {
      ...dataofproduct,
      id: userid,
      quantity: 1,
    };
    console.log("the Whole Data ", Dataofthecart);
    const cartData = await addCartAsync(Dataofthecart);
    console.log("the cart data", cartData);
    // window.location.href = "";
  };

  return (
    <div>
      {isLoading ? (
        <span className="spinner"></span>
      ) : (
        <div>
          {/* Search and Filter Controls */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Search by Name or Price"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minWidth: "200px",
              }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{ margin: "10px", padding: "8px", borderRadius: "6px" }}
            >
              <option value="">All Categories</option>
              {cateogry.map((cat: Category) => (
                <option key={cat.cateogry_id} value={cat.cateogry_id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Items per page selector */}
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value={6}>6 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
            </select>
          </div>

          {/* Results Summary */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "black",
              fontSize: "14px",
            }}
          >
            Showing{" "}
            {paginatedData.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            - {Math.min(currentPage * itemsPerPage, Product.length)} of{" "}
            {Product.length} products
          </div>
        </div>
      )}

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {Product.length === 0 && <p>No products found.</p>}

          {paginatedData.map((product: Producttype) => (
            <div
              key={product.product_id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                // cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{ flexShrink: 0, height: "200px", overflow: "hidden" }}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <div
                style={{
                  padding: "20px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.3rem",
                    margin: "0 0 10px 0",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {product.name}
                </h2>
                <p
                  style={{
                    flexGrow: 1,
                    fontSize: "0.95rem",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                >
                  {product.description!.length > 100
                    ? product.description!.slice(0, 100) + "..."
                    : product.description}
                </p>

                <p
                  style={{
                    flexGrow: 1,
                    fontSize: "0.95rem",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                >
                  {Cateogrynm.find((ca) => ca.cid === product.categoryid)
                    ?.cname || "Unknown Category"}
                </p>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    color: "#1a73e8",
                  }}
                >
                  ${product.price}
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleBuyNow(product.product_id!, product)}
                    // onClick={() => {
                    //   CartCreate(product);
                    // }}
                    // onClick={() => dispatch(addtoCart(product))}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      backgroundColor: "#1a73e8",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#155bb5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1a73e8")
                    }
                  >
                    Buy Now
                  </button>

                  <button
                    // onClick={() => dispatch(addtoCart(product))}
                    onClick={() => {
                      CartCreate(product);
                    }}
                    // {console.log("Hello")}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      backgroundColor: "#f1f3f4",
                      color: "#333",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e2e6ea";
                      e.currentTarget.style.color = "#1a73e8";
                      e.currentTarget.style.borderColor = "#1a73e8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f1f3f4";
                      e.currentTarget.style.color = "#333";
                      e.currentTarget.style.borderColor = "#ccc";
                    }}
                    // {toast.success("the item has added ")}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Component */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
