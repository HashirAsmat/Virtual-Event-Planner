// here i will configure my store 

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  const userState = store.getState().userReducer;
  localStorage.setItem("userState", JSON.stringify(userState));
});

export default store;
