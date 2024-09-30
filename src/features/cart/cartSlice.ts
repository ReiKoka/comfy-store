import { capitalizeWordsWithHyphen, CartItem, CartState } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    // 1. ADD ITEM REDUCER
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;
      const item = state.cartItems.find((i) => i.cartID === newCartItem.cartID);

      if (item) {
        item.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }

      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success(
        `${newCartItem.amount} ${capitalizeWordsWithHyphen(newCartItem.title)}${newCartItem.amount > 1 ? "s" : ""} added to cart`,
        {
          // richColors: true
        },
      );
    },

    // 2. CLEAR CART REDUCER
    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      toast.info("Cart cleared!", {
        // richColors: true,
      });
      return defaultState;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const cartID = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);

      if (!cartItem) return;

      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= cartItem.amount;
      state.cartTotal -= Number(cartItem.price) * cartItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success(
        `${cartItem.amount} ${capitalizeWordsWithHyphen(cartItem.title)}${cartItem.amount > 1 ? "s" : ""} removed from the cart`,
      );
    },

    editItem: (state, action: PayloadAction<{ cartID: string; amount: number }>) => {
      const { cartID, amount } = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);

      if (!cartItem) return;  

      state.numItemsInCart += amount - cartItem.amount;
      state.cartTotal += Number(cartItem.price) * (amount - cartItem.amount);
      cartItem.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success(`${capitalizeWordsWithHyphen(cartItem.title)} amount successfully updated`);
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
