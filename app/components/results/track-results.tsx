'use client'

import React, { useEffect } from 'react'
import { Guess, GuessedTrack, Track } from '../../lib/types'
import { formatArtists } from '../../functions/format-artists'

type TrackResultsProps = {
  list: Track[]
  setTrack: React.Dispatch<
    React.SetStateAction<{ input: string; list: Track[] }>
  >
  selectedIndex: number | null
  guessedTracks?: GuessedTrack
  setGuessedTracks?: React.Dispatch<React.SetStateAction<GuessedTrack>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export default function TrackResults({
  list,
  setTrack,
  selectedIndex,
  guessedTracks,
  setGuessedTracks,
  setSelectedIndex,
}: TrackResultsProps) {
  useEffect(() => {
    if (list.length === 0) setSelectedIndex(null)
  }, [list])

  list = list.filter((track) => {
    return !guessedTracks?.some((guess) => {
      if (guess === 'skipped') return false
      return guess.id === track.id
    })
  })

  return (
    <ul
      className={`absolute bottom-0 mb-[53px] bg-gray-900 w-full rounded-md border border-gray-600 flex flex-col overflow-y-auto max-h-[13.9rem] ${
        list.length === 0 ? 'hidden' : ''
      }`}
      id="track-results"
    >
      {list.map((track: Track, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setTrack({
                input: `${track.name} - ${formatArtists(
                  track.artists
                )}` as string,
                list: [],
              })
              if (setGuessedTracks) {
                setGuessedTracks((prev) => [...prev, track])
                setTrack({ input: '', list: [] })
              }
            }}
            className="text-left"
          >
            <li
              className={` flex items-center px-4 py-2  ${
                index !== 0 ? 'border-t border-gray-700' : ''
              }  ${
                selectedIndex === index
                  ? 'bg-gray-800'
                  : 'hover:bg-gray-800 bg-gray-900'
              } `}
            >
              <span className="text-sm">
                {track.name}{' '}
                <span className="text-gray-400">
                  - {formatArtists(track.artists)}
                </span>
              </span>
            </li>
          </button>
        )
      })}
    </ul>
  )
}
