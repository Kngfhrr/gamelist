import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

/** Components **/
import Loader from '../../components/loader'

/** Store **/
import { fetchGames } from '../../store/games/gamesSlice'

const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const { provider, slug } = useParams()
  const { games, status } = useSelector((state: any) => state.games)

  useEffect(() => {
    dispatch(fetchGames() as any)
  }, [dispatch])

  const navigate = useNavigate()

  if (status === 'loading') return <Loader />

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm
                font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          На главную
        </button>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <div className="text-3xl font-semibold text-center">
          {' '}
          {games[`${provider}/${slug}`]?.title}
        </div>
      </div>
    </div>
  )
}

export default GamePage
