
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const LOGIN = "LOGIN";
export const CREATE_PROFILE = "CREATE_PROFILE";

//create profile action
export const loginAndSaveData = (
  loginDetails,
  addToast,
) => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload: loginDetails
    });
  };
};


// export const createProfile = createAsyncThunk(
//   "CREATE_PROFILE",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Profile fetch failed"
//       );
//     }
//   }
// );
