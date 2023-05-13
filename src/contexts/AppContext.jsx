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
  const [favItems, setFavItems] = useState([
    {
      "id": 20,
      "slug": 20,
      "title": "مكعب روبيك",
      "price": 63300,
      "imgUrl": "https://sinbad-store.com/images/products/thumbnail/p_7278_1601895737_300.jpeg",
      "rating": 5,
      "categoryName": "العاب ذكاء",
      "salePrice": false,
      "description": "مكعب روبيك ثنائي\r\n\r\n&nbsp;\r\n\r\nاجعلي من طفلك مفكرا ومبدعا\r\n\r\n&nbsp;\r\n\r\nلعبة الذكاء والتميز\r\n",
      "isNew": false,
      "isExternal": false,
      "shopName": "",
      "isFavorited": false
    }
  ]);
  // const [favItems, setFavItems] = useState([]);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      favItems,
      setFavItems,
    }),
    [state, dispatch]
  );

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

  console.log(favItems)

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;
