'use client'
import { useRef, useState, Fragment } from 'react'
import { FaPlay, FaPause, FaForward } from 'react-icons/fa'
import ProgressBar from './progress-bar'
import { GuessedTrack, Track } from '../../lib/types'

type AudioPlayerProps = {
  url: string
  limit: number | null
  setLimit: React.Dispatch<React.SetStateAction<number>>
  setGuessedTracks: React.Dispatch<React.SetStateAction<GuessedTrack>>
  hideSkip: boolean
}

export default function AudioPlayer({
  url,
  limit,
  setLimit,
  setGuessedTracks,
  hideSkip,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const ref = useRef<HTMLAudioElement>(null)

  const handlePlayback = () => {
    if (!ref.current) return

    if (isPlaying) ref.current.pause()
    else ref.current.play()

    setIsPlaying(!isPlaying)
  }

  const getSkipAmount = () => {
    if (limit === 1) {
      return 2
    } else if (limit === 3) {
      return 3
    } else if (limit === 6) {
      return 4
    } else if (limit === 10) {
      return 8
    } else if (limit === 18) {
      return 12
    }
  }

  const skipAmount =
    typeof getSkipAmount() === 'number'
      ? `Skip +${getSkipAmount()}s`
      : 'Skip guess'

  return (
    <Fragment>
      <audio
        src={url}
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          const audio = e.target as HTMLAudioElement
          if (limit && audio.currentTime >= limit) {
            audio.pause()
            audio.currentTime = 0
          }
        }}
        // controls
      />
      <ProgressBar
        audioRef={ref}
        limit={limit}
      />

      <div className="w-full flex items-center justify-center relative mt-2">
        <button
          type="button"
          onClick={handlePlayback}
          className="hover:scale-105 active:scale-95 bg-gray-50 transition-all p-4 rounded-full"
        >
          {isPlaying ? (
            <FaPause className="text-gray-950" />
          ) : (
            <FaPlay className="text-gray-950" />
          )}
        </button>{' '}
        <button
          type="button"
          className={`${
            hideSkip ? 'hidden' : 'absolute'
          } hover:brightness-105 active:scale-95 transition-all right-0 flex items-center gap-2 py-2 px-4 bg-gray-500 rounded-sm text-sm ${
            limit === null ? 'hidden' : ''
          }`}
          onClick={() => {
            setGuessedTracks((prev) => [...prev, 'skipped'])
          }}
        >
          <FaForward />
          {skipAmount}
        </button>
      </div>
    </Fragment>
  )
}
