import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import {thunk} from 'redux-thunk';
import {cart} from '../reducer/cart';
import dataReducer from '../reducer/dataReducer';
import filters from '../reducer/filter';

// Root reducer ni yaratamiz
const rootReducer = combineReducers({
    data: dataReducer,
    cart,
    filters,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// persistConfig sozlash
// const persistConfig = {
//     key: 'root',
//     storage: storage,
// };

// Persisted reducer ni o'rnatish
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware ni qo'llash bilan store ni yaratish
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// const persistor = persistStore(store);

export { store };
