import { Track } from '../lib/types'
import { shuffle } from './filter-playlist-tracks'

export const filterArtistTracks = (
  tracks: any[],
  artist: string
): Track[] | null => {
  const tracksToPlay = []
  const titles = new Set()
  for (const track of tracks) {
    if (
      !track.id ||
      titles.has(track.name) ||
      track.duration <= 30000 ||
      !track.preview_url ||
      track.artists[0].name !== artist
    ) {
      continue
    }

    tracksToPlay.push({
      id: track.id,
      name: track.name,
      album: {
        name: track.album.name,
        image: track.album.images[0]?.url,
      },
      artists: track.artists.map((artist: any) => artist.name),
      preview_url: track.preview_url,
      spotify_url: track.external_urls.spotify,
    })
    titles.add(track.name)
  }

  return tracksToPlay.length > 1 ? shuffle(tracksToPlay) : null
}
