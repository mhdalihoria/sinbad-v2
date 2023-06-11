import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

// =================================================================================

// =================================================================================

const INITIAL_CART = [];
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
      return { ...state };
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.nanoId === cartItem.nanoId);
      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter(
          (item) => item.nanoId !== cartItem.nanoId
        );
        return {
          ...state,
          cart: filteredCart,
        };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.nanoId === cartItem.nanoId
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
  const [discount, setDiscount] = useState(null);
  const [orderData, setOrderData] = useState({
    couponCode: null,
    carrierId: "5",
    totalPrice: null,
    shippingCost: null,
    shippedMobile: null,
    shippedLocation_id: null,
    shippedFull_name: null,
    shippedAddress: null,
    paymentMethod: null,
    notes: "تجريب الموقع الجديد",
    referenceNo: null,
    transferDocument: null,
    bank: null,
    transferNo: null,
  });
  const [userToken, setUserToken] = useState(null);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      discount,
      setDiscount,
      orderData,
      setOrderData,
      userToken,
      setUserToken,
    }),
    [state, dispatch]
  );

  useEffect(() => {
    if (!window) return;
    let token = JSON.parse(window.localStorage.getItem("user_token"));
    if (token && token.length > 0) setUserToken(token);
  }, []);

  useEffect(() => {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (itemsFromLocalStorage) {
      //checking if there already is a state in localstorage
      // itemsFromLocalStorage.cart => array of objects => [{}]
      // state is also => array of objects => [{}]
      //so if we want to put itemsFromLocalStorage.cart => we need to make it so it's only storing the objects inside the array of objects
      itemsFromLocalStorage.cart.map((cartItem) =>
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cartItem,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (state !== INITIAL_STATE) {
      //create and/or set a new localstorage variable called "state"
      window.localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;
