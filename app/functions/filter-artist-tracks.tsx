import { Track } from '../lib/types'
import { shuffle } from './filter-playlist-tracks'

export const filterArtistTracks = (
  tracks: any[],
  artist: string
): Track[] | null => {
  const tracksToPlay = []
  const titles = new Set()
  console.log('here', tracks.length)
  for (const track of tracks) {
    const {
      id,
      name,
      duration,
      href,
      artists,
      album,
      preview_url,
      external_urls,
    } = track
    if (
      !id ||
      !href ||
      titles.has(name) ||
      duration <= 30000 ||
      artists[0].name !== artist
    ) {
      continue
    }

    tracksToPlay.push({
      id: id,
      name: name,
      album: {
        name: album.name,
        image: album.images[0]?.url,
      },
      artists: artists.map((artist: any) => artist.name),
      api_url: href,
      spotify_url: external_urls.spotify,
    })
    titles.add(name)
  }

  return tracksToPlay.length > 1 ? shuffle(tracksToPlay) : null
}
