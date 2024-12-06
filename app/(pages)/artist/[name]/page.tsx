import Game from '@/app/components/game/game'
import { filterArtistTracks } from '@/app/functions/filter-artist-tracks'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { Track } from '@/app/lib/types'
export default async function page({ params }: { params: { name: string } }) {
  try {
    const artistName = decodeURIComponent(params.name)
    const tokenRes = await axios.get(
      'https://spotlefy.vercel.app/api/access_token'
    )
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
      try {
        const res = await axios.get(next, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const tracks = res.data.tracks
        artistTracks.push(...tracks.items)
        next = tracks.next
      } catch (err: any) {
        redirect('/')
      }
    }

    const tracksToPlay = filterArtistTracks(artistTracks, artistName) as Track[]

    if (!tracksToPlay) redirect('/')

    return (
      <Game
        tracks={tracksToPlay}
        name={artistName}
        type="artist"
      />
    )
  } catch (err) {
    redirect('/')
  }
}
