import { formatArtists } from '@/app/functions/format-artists'
import { Track, gameStats } from '@/app/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import victoryRoyale from '@/public/victory-royale.png'
import wasted from '@/public/wasted.png'

type PostGameProps = {
  gameStats: gameStats
  track: Track
  startNewGame?: () => void
  isLastGame: boolean
}

export default function PostGame({
  gameStats,
  startNewGame,
  isLastGame,
  track,
}: PostGameProps) {
  const percentage = (gameStats.time / 30) * 100
  return (
    <Fragment>
      <div>
        <Link
          href={track.spotify_url ?? '/'}
          className={`${
            gameStats.win ? 'bg-green-900' : 'bg-red-900'
          } rounded-md flex items-center pr-4 transition-all`}
        >
          <Image
            src={track.album.image}
            alt={`${track.name} cover`}
            height={100}
            width={100}
            className="rounded-l-md mr-5 max-h-[100px] min-w-[100px] object-cover "
          />
          <div className="flex flex-col max-w-full py-2 gap-1">
            <h5 className="font-medium line-clamp-1">{track.name}</h5>
            <p className="line-clamp-1 text-gray-400 text-sm">
              {formatArtists(track.artists)}
            </p>
            <span className="text-gray-400 text-sm line-clamp-1">
              {track.album.name}
            </span>
          </div>
        </Link>
      </div>
      <div className="mt-auto mb-auto flex flex-col items-center ">
        {gameStats.win ? (
          <Fragment>
            <Image
              src={victoryRoyale}
              alt="Victory Royale!"
              className="w-1/2 mb-6"
            />
            <div className="w-1/2 h-3 bg-gray-800 rounded-full flex mb-6">
              <div
                className={`bg-green-800 h-full ${
                  percentage === 100 ? 'rouned-full' : 'rounded-l-full'
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <p className="font-medium ">
              Wow! You got that in {gameStats.time} seconds!
            </p>
          </Fragment>
        ) : (
          <>
            <Image
              src={wasted}
              alt="Wasted!"
              className="w-1/2 mb-6"
            />
            <p className="font-medium text-gray-400">
              Looks like you couldn&apos;t get it done this time.
            </p>
          </>
        )}
        {!isLastGame ? (
          <button
            className="py-3 px-10 bg-green-800 rounded-full mt-4 hover:scale-105 active:scale-95 transition-all text-sm font-medium"
            onClick={startNewGame}
          >
            Play again
          </button>
        ) : (
          <Fragment>
            <Link
              href="/"
              className="py-3 px-10 bg-green-800 rounded-full mt-4 hover:scale-105 active:scale-95 transition-all text-sm font-medium"
            >
              No more games left. Play another.
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}
