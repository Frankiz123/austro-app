import { createSlice } from "@reduxjs/toolkit";

export const login = createSlice({
  name: "login",
  initialState: {
    data: null,
    message: null,
    status: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        message: null,
        status: 200,
      };
    },
    resetLoginState: (state, action) => {
      console.log("actin is,", action);
      return {
        ...state,
        data: null,
        status: null,
      };
    },
  },
});
export const { loginSuccess, resetLoginState } = login.actions;
