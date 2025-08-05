import CustomerNavBar from "../CustomerNavBar";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart, removecart, updateQuantity, clearCart } from "./CartSlice";
import { useEffect } from "react";

type Producttype = {
  product_id?: number;
  name: string;
  barcode?: string;
  description?: string;
  price: number;
  image_url?: string;
  supplierid?: number;
  categoryid?: number;
  quantity?: number;
};

// type RootState = {
//   cart: {
//     cart: Producttype[];
//     totalQuantity: number;
//     totalPrice: number;
//   };
// };
// console.log("object");
export const Cart = () => {
  const dispatch = useDispatch();
  // const [state, setState] = useState(initialValue);

  // const { cart, totalQuantity, totalPrice } = useSelector(
  //   (state: RootState) => state.cart
  // );
  const cartState = useSelector((state: any) => {
    console.log("Full Redux State:", state);
    console.log("Cart State:", state.cart);
    return state.cart;
  });
  console.log("the cart state is beofre", cartState);

  const { cart, totalQuantity, totalPrice } = cartState;

  console.log("the cart is", cart);
  console.log("totalQuantity:", totalQuantity);
  console.log("totalPrice:", totalPrice);

  // useEffect(() => {
  //   localStorage.setItem("user_cart", JSON.stringify(cartState));
  // }, [cartState]);
  // console.log("the cart is", cart);

  const handleRemoveItem = (productId: number) => {
    dispatch(removecart(productId));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    sessionStorage.removeItem("user_cart");
    // localStorage.removeItem("user_cart");
  };

  const handleAddMore = (product: Producttype) => {
    dispatch(addtoCart(product));
  };

  if (!cartState) {
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
            <p>cartState: {JSON.stringify(cartState)}</p>
          </details>
        </div>
      </div>
    );
  }
  if (!Array.isArray(cart) || cart.length === 0) {
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
          <h1>Shopping Cart ({cart.length} items)</h1>
          <button
            onClick={handleClearCart}
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
          {cart.map((item: Producttype) => (
            <div
              key={item.product_id}
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

export default Cart;
