import React, { FC } from 'react'
import { Game } from './interface'
import { Link } from 'react-router-dom'

interface GameCardProps {
  game: Game
}

const GameCard: FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/game/${game.key}`}>
      <div className="group relative cursor-pointer">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`https://cdn2.softswiss.net/i/s2/${game.key}.png`}
            alt={game.key}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {game.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GameCard
