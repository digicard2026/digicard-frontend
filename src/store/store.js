import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./Rolestore/roleSlice";


const store = configureStore({
    reducer: {
      role: roleReducer, 
    },
  });
  
  export default store;