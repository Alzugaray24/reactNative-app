import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../data/products.json";
import categoryData from "../../data/categories.json";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      categorySelected: "",
      productSelected: {},
      idSelected: "",
      products: productsData,
      categories: categoryData,
      filteredProducts: [],
      favoriteItems: [],
    },
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.value.categorySelected = action.payload;
    },
    setProductsByCategory: (state, action) => {
      const category = action.payload;
      if (category) {
        const productsFiltered = productsData.filter(
          (item) => item.category === category
        );
        state.value.products = productsFiltered;
        state.value.filteredProducts = productsFiltered;
        state.value.categorySelected = category;
      } else {
        state.value.products = productsData;
        state.value.filteredProducts = [];
        state.value.categorySelected = "";
      }
    },
    setFilteredProductsByWord: (state, action) => {
      const products = action.payload.products;
      const word = action.payload.keyword;
      if (word) {
        const filtered = products.filter((prod) => {
          return prod.title.includes(word);
        });
        state.value.filteredProducts = filtered;
      } else {
        state.value.filteredProducts = products;
      }
    },
    setProductById: (state, action) => {
      const id = action.payload;
      if (id) {
        const selectedProd = state.value.products.find(
          (item) => item.id === id
        );
        state.value.productSelected = selectedProd || {};
      } else {
        state.value.productSelected = {};
      }
    },
    setFavoriteItems: (state, action) => {
      const product = action.payload.favorite;
      if (product) {
        const favoriteProds = state.value.favoriteItems;
        const existe = favoriteProds.some((item) => item.id === product.id);
        if (!existe) {
          state.value.favoriteItems = [...favoriteProds, product];
        } else {
          state.value.favoriteItems = favoriteProds.filter(
            (item) => item.id !== product.id
          );
        }
      }
    },
  },
});

export const {
  setCategorySelected,
  setProductsByCategory,
  setSearchWord,
  setProductById,
  setFilteredProductsByWord,
  setFavoriteItems,
} = shopSlice.actions;

export default shopSlice.reducer;
