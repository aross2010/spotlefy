import { Track } from '../lib/types'

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const filterPlaylistTracks = (tracks: any[]): Track[] | null => {
  const tracksToPlay = []

  console.log(tracks.length)

  try {
    for (const track of tracks) {
      const {
        is_local,
        id,
        duration,
        href,
        name,
        album,
        artists,
        preview_url,
        external_urls,
      } = track.track

      if (is_local || !id || duration <= 30000 || !href || !preview_url) {
        console.log(track.track.name, track.track.id)
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
        preview_url: preview_url,
        api_url: href,
        spotify_url: external_urls.spotify,
      })
    }
  } catch (e) {}

  return tracksToPlay.length > 1 ? shuffle(tracksToPlay) : null
}
