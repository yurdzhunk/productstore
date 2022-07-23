import { configureStore } from '@reduxjs/toolkit'
import cartProductsReducer from './cartProducts'

export const store = configureStore({
  reducer: {
    cartProducts: cartProductsReducer
  },
})