import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categorySelected: "",
    productSelected: {},
    idSelected: "",
    products: [],
    categories: [],
    filteredProducts: [],
    favoriteItems: [],
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    setProductsByCategory: (state, action) => {
      const category = action.payload;
      if (category) {
        const productsFiltered = state.products.filter(
          (item) => item.category === category
        );
        state.filteredProducts = productsFiltered;
      } else {
        state.filteredProducts = state.products;
      }
    },
    setFilteredProductsByWord: (state, action) => {
      const { products, keyword } = action.payload;
      if (keyword) {
        const filtered = products.filter((prod) =>
          prod.title.includes(keyword)
        );
        state.filteredProducts = filtered;
      } else {
        state.filteredProducts = products;
      }
    },
    setProductById: (state, action) => {
      const id = action.payload;
      if (id) {
        const selectedProd = state.products.find((item) => item.id === id);
        state.productSelected = selectedProd || {};
      } else {
        state.productSelected = {};
      }
    },
    setFavoriteItems: (state, action) => {
      const product = action.payload;
      if (product) {
        const favoriteProds = state.favoriteItems;
        const exists = favoriteProds.some((item) => item.id === product.id);
        if (!exists) {
          state.favoriteItems = [...favoriteProds, product];
        } else {
          state.favoriteItems = favoriteProds.filter(
            (item) => item.id !== product.id
          );
        }
      }
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setCategorySelected,
  setProductsByCategory,
  setFilteredProductsByWord,
  setProductById,
  setFavoriteItems,
  setProducts,
  setCategories,
} = shopSlice.actions;

export default shopSlice.reducer;
