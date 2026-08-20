import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./RoleStore/roleSlice";


const store = configureStore({
    reducer: {
      role: roleReducer, 
    },
  });
  
  export default store;