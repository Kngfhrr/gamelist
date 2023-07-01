import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from '../store/games/gamesSlice'

const store = configureStore({
  reducer: {
    games: gamesReducer
    // Другие редюсеры, если есть
  }
})

export default store
