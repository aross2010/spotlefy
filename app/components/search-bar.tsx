'use client'
import { FaSearch } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import ArtistResults from './results/artist-results'
import PlaylistResults from './results/playlist-results'
import TrackResults from './results/track-results'
import { useAccessToken } from '../context/acess-token-context'
import {
  fetchArtists,
  fetchPlaylists,
  fetchTracks,
} from '../functions/fetch-playlists'
import { GuessedTrack, Track } from '../lib/types'

type SearchBarProps = {
  type: 'artist' | 'playlist' | 'track'
  trackList?: Track[]
  guessedTracks?: GuessedTrack
  setGuessedTracks?: React.Dispatch<React.SetStateAction<GuessedTrack>>
} & React.InputHTMLAttributes<HTMLInputElement>

export default function SearchBar({
  type,
  trackList,
  guessedTracks,
  setGuessedTracks,
  ...rest
}: SearchBarProps) {
  // seperate input and list state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [artistInput, setArtistInput] = useState<string>('')
  const [artistList, setArtistList] = useState([])
  const [playlistInput, setPlaylistInput] = useState<string>('')
  const [playlistList, setPlaylistList] = useState<Track[]>([])
  const [track, setTrack] = useState<{ input: string; list: Track[] }>({
    input: '',
    list: [],
  })
  const token = useAccessToken()

  const placeholder =
    type === 'playlist'
      ? `ex. Today's Top Hits`
      : type === 'artist'
      ? 'ex. Beyoncé'
      : 'Search for a track'

  useEffect(() => {
    if (type === 'playlist') {
      if (playlistInput === '') {
        setPlaylistList([])
        return
      }
      fetchPlaylists(token, playlistInput).then((res) => {
        setPlaylistList(res.playlists.items)
      })
    } else if (type === 'artist') {
      if (artistInput === '') {
        setArtistList([])
        return
      }
      fetchArtists(token, artistInput).then((res) => {
        setArtistList(res.artists.items)
      })
    } else if (type === 'track') {
      if (
        selectedIndex &&
        track.list.length - 1 > selectedIndex &&
        track.input !== ''
      )
        setSelectedIndex(0)
      if (track.input === '') {
        setTrack({ ...track, list: [] })
        setSelectedIndex(0)
        return
      }
      if (!trackList) return

      const tracks = fetchTracks(
        track.input,
        trackList,
        guessedTracks as Track[]
      )
      setTrack({ ...track, list: tracks })
    }
  }, [playlistInput, track.input, artistInput])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (selectedIndex === null || selectedIndex === 0)
        setSelectedIndex(track.list.length - 1)
      else setSelectedIndex((prev) => (prev !== null ? prev - 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (selectedIndex === null || selectedIndex === track.list.length - 1)
        setSelectedIndex(0)
      else setSelectedIndex((prev) => (prev !== null ? prev + 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex !== null && setGuessedTracks) {
        setGuessedTracks((prev) => [...prev, track.list[selectedIndex]])
        setTrack({ ...track, input: '', list: [] })
      }
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    if (type === 'artist') setArtistInput(input)
    else if (type === 'playlist') setPlaylistInput(input)
    else if (type === 'track') setTrack({ ...track, input })
  }

  const handleClearInput = () => {
    if (type === 'artist') setArtistInput('')
    else if (type === 'playlist') setPlaylistInput('')
    else if (type === 'track') setTrack({ ...track, input: '' })
  }

  return (
    <section
      className={`w-full relative ${type !== 'track' ? 'max-w-[600px]' : ''}`}
    >
      {type === 'track' && (
        <TrackResults
          list={track.list}
          setTrack={setTrack}
          guessedTracks={guessedTracks}
          setGuessedTracks={setGuessedTracks}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
      {type === 'playlist' && (
        <p className="text-left text-gray-500 font-medium text-xs mb-1">
          Paste the share link to import a playlist.
        </p>
      )}

      <div
        className={`relative w-full rounded-md shadow-lg flex items-center gap-4 px-4 border border-gray-400 group focus-within:border-[#1ed760] focus-within:bg-gray-900 transition-all duration-300 ${
          type === 'track' ? 'mt-1' : ''
        }`}
      >
        <FaSearch className="text-gray-400 text-lg" />
        <input
          type="text"
          className="text-gray-50 placeholder:text-gray-600 w-full py-3 bg-transparent outline-none"
          value={
            type === 'artist'
              ? artistInput
              : type === 'playlist'
              ? playlistInput
              : track.input
          }
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={type === 'track' ? (e) => handleKeyDown(e) : () => {}}
          {...rest}
        />
        <button
          type="button"
          className="text-gray-400 text-lg hover:text-gray-50 transition-all"
          onClick={handleClearInput}
        >
          <FaXmark />
        </button>
      </div>

      {type === 'artist' ? (
        <ArtistResults list={artistList} />
      ) : type === 'playlist' ? (
        <PlaylistResults list={playlistList} />
      ) : null}
    </section>
  )
}
