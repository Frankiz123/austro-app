import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("state is", state, action);
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    deleteItem: (state, action) => {
      console.log("state is", state, action);
      return {
        ...state,
        data: state.data.filter((elm) => {
          if (elm.id === action.payload) {
            return false;
          } else {
            return true;
          }
        }),
      };
    },
    deleteFromCart: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    updateCart: (state, action) => {
      console.log("action is", action);
      const { Obj, actionToDo } = action.payload;
      if (actionToDo !== "status") {
        let newArray = action.payload.cart.data.filter((elem) => {
          return elem.id === Obj.id;
        });

        if (newArray.length > 0) {
          if (actionToDo === "+") {
            newArray = {
              ...newArray[0],
              quantity: newArray[0].quantity + 1,
            };
          } else if (newArray[0].quantity > 0) {
            newArray = {
              ...newArray[0],
              quantity: newArray[0].quantity - 1,
            };
          }
          return {
            ...state,
            data: state.data.map((elem) => {
              if (elem.id === newArray.id) {
                return newArray;
              }
              return elem;
            }),
          };
        }
      } else {
        return {
          ...state,
          data: Obj,
        };
      }
    },
    resetCart: (state, action) => {
      return {
        ...state,
        data: [],
      };
    },
  },
});
export const { addToCart, resetCart, deleteItem, updateCart, deleteFromCart } =
  cart.actions;
