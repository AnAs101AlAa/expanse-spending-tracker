import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AccountReducer from './Slices/accountSlice.jsx';
import PlanerReducer from './Slices/planerSlice.jsx';

// Persist configurations
const accountPersistConfig = {
  key: 'account',
  storage,
};

const planerPersistConfig = {
  key: 'planer',
  storage,
};

// Create persisted reducers
const persistedAccountReducer = persistReducer(accountPersistConfig, AccountReducer);
const persistedPlanerReducer = persistReducer(planerPersistConfig, PlanerReducer);

// Configure the store with the persisted reducers and customized middleware
const store = configureStore({
  reducer: {
    Account: persistedAccountReducer,
    Planer: persistedPlanerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };