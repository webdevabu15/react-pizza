import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { cart } from "../reducer/cart";
import dataReducer from "../reducer/dataReducer";
import filters from "../reducer/filter";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  data: dataReducer,
  cart,
  filters,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["data", "cart"], // saqlamoqchi bo'lgan reducerlarni ko'rsatishingiz mumkin
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
