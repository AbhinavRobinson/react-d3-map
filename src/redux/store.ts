import { configureStore } from '@reduxjs/toolkit'
import plotReducer from './functions/plotState/plotStateSlice'

export const store = configureStore({
  reducer: {
    plot: plotReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
