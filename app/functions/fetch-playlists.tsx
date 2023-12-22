import axios from 'axios'
import { GuessedTrack, Track } from '../lib/types'

export const fetchPlaylists = async (token: string, query: string) => {
  // if query begins with https then search for playlist by url

  console.log('token', token)

  const isCopiedPlaylist = query.startsWith(
    'https://open.spotify.com/playlist/'
  )

  let url = `https://api.spotify.com/v1/search?q=${query}&type=playlist`

  if (isCopiedPlaylist) {
    url = `https://api.spotify.com/v1/playlists/${query.slice(34)}`
  }

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return isCopiedPlaylist ? { playlists: { items: [res.data] } } : res.data
}

export const fetchArtists = async (token: string, query: string) => {
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${query}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.data
}

export const fetchTracks = (
  query: string,
  trackList: Track[],
  guessedTracks: GuessedTrack
) => {
  return trackList.filter((track) => {
    const isMatch = track.name.toLowerCase().startsWith(query.toLowerCase())

    const isGuessed = !guessedTracks?.some((guess) => {
      if (guess === 'skipped') return false
      return guess.id === track.id
    })

    return isMatch && isGuessed
  })
}
