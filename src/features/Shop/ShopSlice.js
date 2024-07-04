import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../data/products.json";
import categoryData from "../../data/categories.json";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      categorySelected: "",
      productSelected: {}, // Inicialmente vacío
      idSelected: "",
      products: productsData, // Todos los productos
      categories: categoryData,
      keyBoard: [], // Estado para almacenar el teclado (keyboard)
      filteredProducts: [], // Estado para los productos filtrados
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
        state.value.filteredProducts = productsFiltered; // Actualiza los productos filtrados
        state.value.categorySelected = category; // Actualiza la categoría seleccionada
      } else {
        state.value.products = productsData; // Mostrar todos los productos si no hay categoría seleccionada
        state.value.filteredProducts = []; // Reinicia los productos filtrados
        state.value.categorySelected = ""; // Reinicia la categoría seleccionada
      }
    },
    setKeyboard: (state, action) => {
      const word = action.payload;
      if (word) {
        const productsByWord = state.value.products.filter((item) =>
          item.title.toLowerCase().includes(word.toLowerCase())
        );
        state.value.filteredProducts = productsByWord;
      } else {
        state.value.filteredProducts = state.value.products;
      }
      state.value.keyBoard = word;
    },
    setProductById: (state, action) => {
      const id = action.payload;
      if (id) {
        const selectedProd = state.value.products.find(
          (item) => item.id === id
        );
        state.value.productSelected = selectedProd || {}; // Asigna el producto encontrado o un objeto vacío
      } else {
        state.value.productSelected = {}; // Si no hay ID válido, asigna un objeto vacío
      }
    },
  },
});

export const {
  setCategorySelected,
  setProductsByCategory,
  setKeyboard,
  setProductById,
} = shopSlice.actions;

export default shopSlice.reducer;
