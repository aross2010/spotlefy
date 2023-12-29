import { formatArtists } from '@/app/functions/format-artists'
import { Track, gameStats } from '@/app/lib/types'
import { IoStatsChart } from 'react-icons/io5'
import { FaRepeat } from 'react-icons/fa6'
import Link from 'next/link'
import { useState } from 'react'
import React, { Fragment } from 'react'
import happyDance from '@/public/happydance.gif'
import takeL from '@/public/takethel.gif'
import StatsModal from './stats-modal'

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
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <div>
        <Link
          href={track.spotify_url ?? '/'}
          className={`${
            gameStats.win ? 'bg-green-900' : 'bg-red-900'
          } rounded-md flex items-center pr-4 transition-all`}
        >
          <img
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
            <img
              src={happyDance.src}
              alt="Happy Fortnite dance!"
              className="h-48 mb-6"
            />

            <p className="font-medium ">VICTORY ROYALE!!!!</p>
          </Fragment>
        ) : (
          <>
            <img
              src={takeL.src}
              alt="Take the L dance."
              className="h-48 mb-6"
            />
            <p className="font-medium">TAKE THE L!!!!</p>
          </>
        )}
        <div className="flex items-center gap-2">
          {!isLastGame ? (
            <Fragment>
              <button
                className="py-3 px-3 flex items-center gap-2 bg-gray-600 text-gray-200 rounded-md mt-4 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider "
                onClick={() => setIsStatsModalOpen(true)}
              >
                View Stats <IoStatsChart className="inline" />
              </button>
              <button
                className="py-3 px-3 flex items-center gap-2 bg-green-800 text-gray-200 rounded-md mt-4 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider "
                onClick={startNewGame}
              >
                Play again <FaRepeat className="inline" />
              </button>
            </Fragment>
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
      </div>
      <StatsModal
        open={isStatsModalOpen}
        setOpen={setIsStatsModalOpen}
        gameStats={gameStats}
      />
    </Fragment>
  )
}
