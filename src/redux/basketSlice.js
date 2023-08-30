import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
  totalProducts: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProductBasket: (state, action) => {
      const productById = state.products.find(
        (el) => el.id === action.payload.id
      );

      productById
        ? (productById.quantity += 1)
        : state.products.push({ ...action.payload, quantity: 1 });
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (el) => el.id !== action.payload.id
      );
    },
    deleteProducts: (state, action) =>
      (state = {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
      }),

    decreaseProduct: (state, action) => {
      const productById = state.products.find(
        (el) => el.id === action.payload.id
      );
      const index = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      productById.quantity > 1
        ? (productById.quantity -= 1)
        : state.products.splice(index, 1);
    },

    cleanBasket: (state) => {
      state.products = [];
    },

    countTotalPrice: (state) => {
      state.totalPrice = state.products.reduce((total, item) => {
        return item.discont_price
          ? item.discont_price * item.quantity + total
          : item.price * item.quantity + total;
      }, 0);
    },

    countTotalProducts: (state) => {
      state.totalProducts = state.products.length;
    },
  },
});

export const {
  addProductBasket,
  cleanBasket,
  countTotalPrice,
  countTotalProducts,
  decreaseProduct,
  deleteProduct,
  deleteProducts,
} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
