import { createSlice } from '@reduxjs/toolkit'

/** Types **/
type StateType = {
  providers: string[]
}

type ActionType = {
  payload: {
    [key: string]: {
      provider: string
    }
  }
}

const initialState = {
  providers: [],
  currencies: [],
  selectedProvider: null,
  selectedCurrency: null
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setProviders(state: StateType, action: ActionType) {
      const allProviders = Object.keys(action.payload).map(
        (key) => action.payload[key].provider
      )
      state.providers = [...(new Set(allProviders) as any)]
    },
    setCurrentProvider(state: any, action: { payload: string }) {
      state.selectedProvider = action.payload
    },
    setCurrencies(state: any, action: any) {
      const currenciesSet = Object.values(action.payload).reduce(
        (acc: any, game: any) => {
          Object.keys(game.real).forEach((currency) => acc.add(currency))
          return acc
        },
        new Set()
      )

      state.currencies = Array.from(currenciesSet as any)
    },
    setCurrentCurrency(
      state: { selectedCurrency: string | null },
      action: { payload: string }
    ) {
      state.selectedCurrency = action.payload
    }
  }
})

export const { setProviders, setCurrentProvider, setCurrencies, setCurrentCurrency } =
  filtersSlice.actions

export const selectFiltersState = (state: any) => state.filters

export default filtersSlice.reducer
