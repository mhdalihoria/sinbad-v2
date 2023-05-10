import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

// =================================================================================

// =================================================================================

const INITIAL_CART = [ ];
const INITIAL_STATE = {
  cart: INITIAL_CART,
};
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_STORAGE":
      return {...state};
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);
      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return {
          ...state,
          cart: filteredCart,
        };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                qty: cartItem.qty,
              }
            : item
        );
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [...cartList, cartItem],
      };
    default: {
      return state;
    }
  }
};

// This is how the dispatch function from useReducer was used (MiniCart.jsx)
// dispatch({
//   type: "CHANGE_CART_AMOUNT",
//   payload: {
//     ...product,
//     qty: amount
//   }
// });
// };

// =======================================================

// =======================================================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  useEffect(() => {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"))
    if (itemsFromLocalStorage) {
      //checking if there already is a state in localstorage
      console.log("it does exist in localStorage");
      console.log(itemsFromLocalStorage.cart, state)
      // itemsFromLocalStorage.cart => array of objects => [{}]
      // state is also => array of objects => [{}]
      //so if we want to put itemsFromLocalStorage.cart => we need to make it so it's only storing the objects inside the array of objects
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: itemsFromLocalStorage.cart
      })
    }
  }, []);

  useEffect(() => {
    if (state !== INITIAL_STATE) {
      console.log("they ain't equqal");
      window.localStorage.setItem("cart", JSON.stringify(state));
      //create and/or set a new localstorage variable called "state"
      console.log(state)
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;
