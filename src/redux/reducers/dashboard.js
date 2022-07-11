import { createSlice } from "@reduxjs/toolkit";

export const merchants = createSlice({
  name: "merchants",
  initialState: {
    data: null,
    message: null,
    status: null,
  },
  reducers: {
    getMerchantSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        message: null,
        status: 200,
      };
    },
  },
});
export const { getMerchantSuccess } = merchants.actions;
