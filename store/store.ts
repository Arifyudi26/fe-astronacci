import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authSlice from './slices/authSlice'
import userReducer from './slices/userSlice'
import articleSlice from './slices/articleSlice'
import videoSlice from './slices/videoSlice'

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    users: userReducer,
    articles: articleSlice,
    videos: videoSlice
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
