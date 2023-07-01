import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useMemo, useState } from 'react'

/** Components **/
import Select from '../../components/select'
import GameCard from '../../components/game-card'

/** Store **/
import { fetchGames } from '../../store/games/gamesSlice'
import {
  selectFiltersState,
  setCurrentCurrency,
  setCurrentProvider
} from '../../store/filters/filtersSlice'

/** Utils **/
import { compareGames, filterGames } from '../../utils'
import Loader from '../../components/loader'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()

  const { games, status } = useSelector((state: any) => state.games)
  const { providers, currencies, selectedProvider, selectedCurrency } =
    useSelector(selectFiltersState)

  const [itemsToShow, setItemsToShow] = useState(12)

  const handleShowMore = () => {
    setItemsToShow((prev) => prev + 12)
  }

  useEffect(() => {
    dispatch(fetchGames() as any)
  }, [dispatch])

  const sortedGames = useMemo(() => {
    const filteredGames = filterGames(games, selectedProvider)
    return filteredGames.sort(compareGames(selectedCurrency))
  }, [games, selectedProvider, selectedCurrency])

  if (status === 'loading') return <Loader />

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[60%,1fr] gap-2">
            <div className="md:flex space-x-0 md:space-x-2">
              <div className="md:w-[400px] w-full">
                <Select
                  onChange={(selectedValue: string) =>
                    dispatch(setCurrentProvider(selectedValue))
                  }
                  placeholder="Select provider"
                  value={selectedProvider}
                  data={providers}
                />
              </div>
              <div className="md:w-[400px] w-full">
                <Select
                  onChange={(selectedValue: string) =>
                    dispatch(setCurrentCurrency(selectedValue))
                  }
                  data={currencies}
                  placeholder="Select currency"
                  value={selectedCurrency}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {sortedGames?.slice(0, itemsToShow).map((item: any, index: number) => (
              <div key={index}>
                <GameCard game={item} />
              </div>
            ))}
          </div>
          <div className="flex w-100 justify-center align-center mt-12">
            {itemsToShow < sortedGames.length && (
              <div
                onClick={handleShowMore}
                className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm
                font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Показать еще
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
