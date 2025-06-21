import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// ...import other reducers...

export default configureStore({
  reducer: {
    auth: authReducer,
    // ...other reducers...
  },
});