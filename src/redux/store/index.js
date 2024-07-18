import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { cart } from "../reducer/cart";
import dataReducer from "../reducer/dataReducer";
import filters from "../reducer/filter";

const rootReducer = combineReducers({
  data: dataReducer,
  cart,
  filters,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
