import { configureStore } from '@reduxjs/toolkit'
import reducerCounter from './features/slice'

export const store = configureStore({
  reducer: {
    counter:reducerCounter
  },
})