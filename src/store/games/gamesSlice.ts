import gamesData from '../../games.json'

import { setCurrencies, setProviders } from '../filters/filtersSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchGames = createAsyncThunk('games/fetchGames', async (_, thunkAPI) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  thunkAPI.dispatch(setProviders(gamesData as any))
  thunkAPI.dispatch(setCurrencies(gamesData as any))
  return gamesData
})

export const gamesSlice = createSlice({
  name: 'games',
  initialState: { games: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchGames.fulfilled, (state, action: any) => {
        state.status = 'succeeded'
        state.games = action.payload
      })
      .addCase(fetchGames.rejected, (state, action: any) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export default gamesSlice.reducer
