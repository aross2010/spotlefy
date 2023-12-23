'use client'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { GuessedTrack, Track } from '../../lib/types'
import AudioPlayer from './audio-player'
import SearchBar from '../search-bar'
import { toast } from 'react-hot-toast'
import { formatArtists } from '../../functions/format-artists'
import PostGame from './post-game'
import { gameStats } from '../../lib/types'
import { fetchAudioPreview } from '@/app/functions/fetch-audio-preview'
import { useAccessToken } from '@/app/context/acess-token-context'
import { redirect } from 'next/navigation'
import Link from 'next/link'

type GameProps = {
  tracks: Track[]
  name: string
}

export default function Game({ tracks, name }: GameProps) {
  const [inGameTrackList] = useState<Track[]>([...tracks])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [guessedTracks, setGuessedTracks] = useState<GuessedTrack>([])
  const [timeLimit, setTimeLimit] = useState<number>(1)
  const [gameStats, setGameStats] = useState<gameStats | null>(null)

  const { token, setToken } = useAccessToken()

  const updateTimeLimit = () => {
    if (timeLimit === 1) {
      setTimeLimit(3)
    } else if (timeLimit === 3) {
      setTimeLimit(6)
    } else if (timeLimit === 6) {
      setTimeLimit(10)
    } else if (timeLimit === 10) {
      setTimeLimit(18)
    } else if (timeLimit === 18) {
      setTimeLimit(30)
    }
  }

  const getPreview = async () => {
    const track = tracks.pop() as Track
    let preview_url = null

    try {
      preview_url = await fetchAudioPreview(track.api_url, token)
    } catch (err: any) {
      if (err.response.status === 401) {
        const newToken = await axios.get('/api/access_token')
        setToken(newToken.data)
        preview_url = await fetchAudioPreview(track.api_url, newToken.data)
      }
    } finally {
      while (!preview_url) {
        if (tracks.length === 0) {
          // set no more games state (toast and redirecto home)
          toast.error('You have played all the tracks!')
          redirect('/')
        }
        const track = tracks.pop() as Track
        preview_url = await fetchAudioPreview(track.api_url, token)
      }
      setCurrentTrack({ ...track, preview_url })
    }
  }

  // get true screen height
  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    }

    window.addEventListener('resize', documentHeight)
    documentHeight()

    return () => {
      window.removeEventListener('resize', documentHeight)
    }
  }, [])

  useEffect(() => {
    // start to game
    if (guessedTracks.length === 0) {
      getPreview()
    }
    // if track guess is correct, game over
    else if (
      guessedTracks[guessedTracks.length - 1] !== 'skipped' &&
      (guessedTracks[guessedTracks.length - 1] as Track).id === currentTrack?.id
    ) {
      setGameStats({
        win: true,
        time: timeLimit,
      })
      setTimeLimit(30)
    }
    // ran out of guesses, game over
    else if (guessedTracks.length === 6) {
      toast.success('Game over!')
      setGameStats({
        win: false,
        time: timeLimit,
      })
    }
    // guess was incorrect, add time to limit
    else updateTimeLimit()
  }, [guessedTracks])

  const getGuessedTrack = (index: number) => {
    if (guessedTracks[index] === 'skipped') return 'SKIPPED'
    return (
      (guessedTracks[index] as Track).name +
      ' - ' +
      formatArtists((guessedTracks[index] as Track).artists)
    )
  }

  const startNewGame = () => {
    setGuessedTracks([])
    setGameStats(null)
    setTimeLimit(1)
  }

  const guesses = (
    <div className="flex flex-col gap-4 -z-1">
      {Array(6)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="px-4 border border-gray-700 h-10 w-full flex items-center"
            >
              {' '}
              {guessedTracks[index] && (
                <p className="text-gray-400 text-sm line-clamp-1">
                  {getGuessedTrack(index)}
                </p>
              )}
            </div>
          )
        })}
    </div>
  )

  return (
    <section className="game-section py-4 overflow-hidden w-full flex flex-col justify-center">
      <h1 className="line-clamp-2 font-bold text-xl tracking-tight text-center pb-2 mb-4 border-b border-gray-800">
        {name}{' '}
        <Link
          href="/"
          className="hover:text-[#1ed760]"
        >
          Heardle
        </Link>
      </h1>
      {gameStats === null ? (
        guesses
      ) : (
        <PostGame
          startNewGame={startNewGame}
          gameStats={gameStats}
          track={currentTrack as Track}
          isLastGame={tracks.length === 0}
        />
      )}

      <div className={`${gameStats === null ? 'mt-auto' : ''}`}>
        <div className="mb-6">
          {gameStats === null && (
            <Fragment>
              <p className="text-gray-500 text-xs mb-1">
                Select a track to guess.
              </p>
              <SearchBar
                type="track"
                trackList={inGameTrackList}
                guessedTracks={guessedTracks}
                setGuessedTracks={setGuessedTracks}
                disabled={gameStats !== null}
              />
            </Fragment>
          )}

          <div className="relative flex flex-col">
            <AudioPlayer
              url={currentTrack?.preview_url as string}
              limit={timeLimit}
              setLimit={setTimeLimit}
              setGuessedTracks={setGuessedTracks}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
