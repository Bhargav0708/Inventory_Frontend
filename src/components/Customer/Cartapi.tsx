import React, { useEffect, useMemo, useState } from "react";
import { useCartdisplayById } from "../../api/cart/DisplayCart";
import CustomerNavBar from "../CustomerNavBar";
import { useProduct } from "../../api/product/Product";
import { useRemovebyProductId } from "../../api/cart/CartRemoveByProductid";
import { useRemoveByuserId } from "../../api/cart/CartRemoveByUserId";
import { useRemoveQuantity } from "../../api/cart/CartRemoveQuantity";
import { useAddQuantity } from "../../api/cart/CartAddQuantity";

const Cartapi = () => {
  const storedUserdata = localStorage.getItem("userdata");
  const user = storedUserdata ? JSON.parse(storedUserdata) : null;

  const name = user.userdata.name;
  const userid = user.userdata.id;

  // const [cartdata, setCartData] = useState([]);
  // const { data: cartdata } = useCartdisplayById(userid); // ✅ auto updates
  const [product, setProduct] = useState([]);
  // const { DisplayData, data: DisplayCatchData } = useDisplayCart();
  // const { data: DisplayData } = useCartdisplayById(userid);

  // const { data: DisplayData } = useDisplayCart(userid);
  const { data: ProductData, isLoading, error, refetch } = useProduct();
  const { RemoveProduct } = useRemovebyProductId(userid);
  const { RemoveQuanity } = useRemoveQuantity();
  const { AddQuantity } = useAddQuantity();
  const { RemoveUserCart } = useRemoveByuserId(userid);
  // const {RemoveProduct}=useRemovebyProductId(userid)

  const { data: DisplayData } = useCartdisplayById(userid);
  const cartdata = useMemo(() => {
    if (!DisplayData?.data || !ProductData?.data) return [];

    return DisplayData.data.map((cartItem: any) => {
      const productItem = ProductData.data.find(
        (p: any) => p.product_id === cartItem.productid
      );
      return {
        ...cartItem,
        ...productItem,
      };
    });
  }, [DisplayData, ProductData]);

  // useEffect(() => {
  //   async function Fetch() {
  //     // const data = await DisplayData(userid);
  //     const data = await DisplayData;
  //     console.log("the data", data.data);
  //     const merged = data.data.map((cartItem: any) => {
  //       const productItem = ProductData.data.find(
  //         (p: any) => p.product_id === cartItem.productid
  //       );
  //       return {
  //         ...cartItem,
  //         ...productItem, // merge image_url, name, description, etc.
  //       };
  //     });
  //     setCartData(merged);
  //   }
  //   Fetch();
  //   if (ProductData) {
  //     setProduct(ProductData.data);
  //   }
  // }, [ProductData]);

  console.log("this is cart data", cartdata);
  const totalQuantity = cartdata.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = cartdata.reduce(
    (sum: any, item: any) => sum + item.quantity * item.price,
    0
  );

  //   console.log("this is Product data", product);
  const cartalldata = cartdata.map((cp: any) => {
    console.log("the cp", cp);
  });
  const CartproductData = product.filter((p: any) => {
    // console.log(p.product_id == );
  });

  const handleRemoveItem = (productId: number) => {
    console.log("this product id of remove", productId);
    const RemoveProductid = RemoveProduct(productId);

    // particular productid Remove
    // dispatch(removecart(productId));
  };
  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    const datatobesent = {
      id: productId,
      quantity: newQuantity,
      uid: userid,
    };
    if (newQuantity > 0) {
      const removeQuantity = RemoveQuanity(datatobesent);
    } else {
      const RemoveProductid = RemoveProduct(productId);
      console.log("the delteed quanity is zero");
    }
    // const RemoveQuanity;
    // dispatch(updateQuantity({ productId, quantity: newQuantity }));
    // minus operation api

    console.log("the proudct id", productId);
    console.log("the quantity", newQuantity);
  };

  const handleClearCart = (userid: number) => {
    const clearCart = RemoveUserCart(userid);
    // setCartData([]);
    // userid --destory
    // dispatch(clearCart());
    // sessionStorage.removeItem("user_cart");
    // localStorage.removeItem("user_cart");
  };
  const handleAddMore = (product: any) => {
    const addQuantity = AddQuantity(product);
    console.log("the added quantity", addQuantity);
    // const AddQuantity =
    // dispatch(addtoCart(product));
    //product wise add
  };
  const handleProcessTocheckeout = (data: any) => {
    console.log("the data of the purchase history ", data);
    for (let product of data) {
      console.log("the product is ", product);
    }
  };
  if (!cartdata) {
    return (
      <div>
        <div>
          <CustomerNavBar />
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Error: Cart state not found</h2>
          <p>Please check your Redux store configuration.</p>
          <details>
            <summary>Debug Info</summary>
            <p>cartState: {JSON.stringify(cartdata)}</p>
          </details>
        </div>
      </div>
    );
  }
  if (!Array.isArray(cartdata) || cartdata.length === 0) {
    return (
      <div>
        <div>
          <CustomerNavBar />
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Your Cart is Empty</h2>
          <br />
          <p>Add some products to your cart to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <CustomerNavBar />
      </div>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1>Shopping Cart ({cartdata.length} items)</h1>
          <button
            onClick={() => {
              handleClearCart(userid);
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {cartdata.map((item: any) => (
            <div
              key={item.productid}
              style={{
                display: "flex",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Product Image */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Product Details */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>
                  {item.name}
                </h3>
                <p style={{ color: "#666", margin: "0 0 10px 0" }}>
                  {item.description && item.description.length > 80
                    ? item.description.slice(0, 80) + "..."
                    : item.description}
                </p>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1a73e8",
                  }}
                >
                  ${item.price}
                </div>
              </div>

              {/* Quantity Controls */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button
                  onClick={() =>
                    handleUpdateQuantity(
                      item.product_id!,
                      (item.quantity || 1) - 1
                    )
                  }
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f8f9fa",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    minWidth: "20px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() => handleAddMore(item)}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f8f9fa",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <div style={{ minWidth: "80px", textAlign: "right" }}>
                <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.product_id!)}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
            Total Items: <strong>{totalQuantity}</strong>
          </div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1a73e8" }}
          >
            Total Price: <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button
            onClick={() => {
              handleProcessTocheckeout(cartdata);
            }}
            style={{
              marginTop: "15px",
              padding: "12px 30px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartapi;
