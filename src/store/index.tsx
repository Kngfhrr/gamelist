import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from '../store/games/gamesSlice'
import filtersReducer from '../store/filters/filtersSlice'

const index = configureStore({
  reducer: {
    games: gamesReducer,
    filters: filtersReducer
  }
})

export default index
