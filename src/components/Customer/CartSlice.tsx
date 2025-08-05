import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

// Define the cart state type
interface CartState {
  cart: Producttype[];
  // items: Producttype[];
  totalQuantity: number;
  totalPrice: number;
}
// const initialState: CartState = {
//   cart: [],
//   // items: [],
//   totalQuantity: 0,
//   totalPrice: 0,
// };
//localstorage
// const savedCart = localStorage.getItem("user_cart");
// const initialState: CartState = savedCart
//   ? JSON.parse(savedCart)
//   : {
//       cart: [],
//       items: [],
//       totalQuantity: 0,
//       totalPrice: 0,
//     };
//session
const savedCart = sessionStorage.getItem("user_cart");

const initialState: CartState = savedCart
  ? JSON.parse(savedCart)
  : {
      cart: [],
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    };

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<Producttype>) => {
      const product = action.payload;
      if (product) {
        toast.success("Item Has Successfully Added To the Cart");
      }
      state.totalPrice += product.price;
      state.totalQuantity += 1;
      // state.totalQuantity += 1;
      // state.totalPrice += product.price;
      console.log("the product is from slice", product);
      // state.cart.push(action.payload);
      const existingItem = state.cart.find(
        (item) => item.product_id === product.product_id
      );
      console.log("the exisiting item", existingItem);
      if (existingItem) {
        const newQty = (existingItem.quantity ?? 1) + 1;
        const updatedCart = state.cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: newQty }
            : item
        );
        state.cart = updatedCart;
      } else {
        state.cart.push({ ...product });
        console.log("the product price", product.price);
      }

      console.log("the total quantity after adding", state.totalQuantity);
    },
    removecart: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.product_id === productId
      );

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        state.totalQuantity -= item.quantity || 1;
        state.totalPrice -= item.price * (item.quantity || 1);
        state.cart.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((item) => item.product_id === productId);

      if (item) {
        const oldQuantity = item.quantity || 1;
        const quantityDiff = quantity - oldQuantity;

        item.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalPrice += item.price * quantityDiff;

        // Remove item if quantity becomes 0
        if (quantity <= 0) {
          const itemIndex = state.cart.findIndex(
            (item) => item.product_id === productId
          );
          state.cart.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    // resetCart: () => initialState,
  },
});
export const { addtoCart, removecart, updateQuantity, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
