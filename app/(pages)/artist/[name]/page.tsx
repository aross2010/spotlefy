import Game from '@/app/components/game/game'
import { filterArtistTracks } from '@/app/functions/filter-artist-tracks'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { Track } from '@/app/lib/types'
export default async function page({ params }: { params: { name: string } }) {
  try {
    return redirect('/')
    const artistName = decodeURIComponent(params.name)
    const tokenRes = await axios.get('http://localhost:3000/api/access_token')
    const token = tokenRes.data

    const res = await axios.get(
      `https://api.spotify.com/v1/search?type=track&q=artist:${artistName}?&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    let artistTracks = []

    const tracks = res.data.tracks

    artistTracks.push(...tracks.items)

    let next = tracks.next

    while (next) {
      const res = await axios.get(next, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const tracks = res.data.tracks
      artistTracks.push(...tracks.items)
      next = tracks.next
    }

    const tracksToPlay = filterArtistTracks(artistTracks, artistName) as Track[]

    if (!tracksToPlay) redirect('/')

    return (
      <Game
        tracks={tracksToPlay}
        name={artistName}
      />
    )
  } catch (err) {
    redirect('/')
  }
}
