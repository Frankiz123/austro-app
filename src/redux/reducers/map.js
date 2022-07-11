import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    data: [],
    latlng: [],
    status: null,
  },
  reducers: {
    addLocation: (state, action) => {
      return {
        ...state,
        latlng: [
          ...state.latlng,
          {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          },
        ],
        // data: [...state.data, action.payload],
        status: null,
      };
    },
    getLocation: (state, action) => {
      return {
        ...state,
        latlng: [
          ...state.latlng,
          {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          },
        ],
        // data: [...state.data, action.payload],
        status: null,
      };
    },

    // deleteLocatoin: (state, action) => {
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // },

    // resetLocation: (state, action) => {
    //   return {
    //     ...state,
    //     data: [],
    //   };
    // },
  },
});
export const { addLocation, resetLocation, deleteLocatoin } = map.actions;
