import axios from "axios";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
export const setPizza = (item) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: item,
});

export const fetchPizzas = (setCategory, sortBy) => async (dispatch) => {
  try {
    let q;
    if (setCategory == null) {
      q = query(collection(db, "pizzas"), orderBy(sortBy.type, sortBy.order));
    } else {
      q = query(collection(db, "pizzas"), where("category", "==", setCategory), orderBy(sortBy.type, sortBy.order));
    }

    const dataDb = await getDocs(q);
    const allData = dataDb.docs.map((val) => ({ ...val.data() }));
    dispatch(setPizza(allData));
  } 
  catch (error) {
    console.error("Pizzalarni olishda xato:", error);
  }
};

export const setSortBy = ({ type, order }) => ({
  type: "SET_SORT_BY",
  payload: { type, order },
});

export const setCategory = (catIndex) => ({
  type: "SET_CATEGORY",
  payload: catIndex,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const removeCartItem = (item) => ({
  type: "REMOVE_CART_ITEM",
  payload: item,
});

export const plusCartItem = (item) => ({
  type: "PLUS_CART_ITEM",
  payload: item,
});

export const minusCartItem = (item) => ({
  type: "MINUS_CART_ITEM",
  payload: item,
});
