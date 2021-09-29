import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface plotState {
  value: number
}

const initialState: plotState = {
  value: 0,
}

export const plotStateSlice = createSlice({
  name: 'plotState',
  initialState,
  reducers: {
    setPlotState: (state) => {
      state.value = (state.value + 1) % 4
    },
  },
})

export const { setPlotState } = plotStateSlice.actions

export const selectPlotState = (state: RootState) => state.plot.value

export default plotStateSlice.reducer
