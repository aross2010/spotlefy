import axios from 'axios'

const fetchPlaylistData = async (token: string, playlistId: string) => {
  let playlistData = {
    name: '',
    imageURL: '',
    tracks: [],
  }

  const res = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const data = res.data
  playlistData.name = data.name
  playlistData.imageURL = data.images[0].url
  data.tracks.items.forEach((track: any) => {
    // add track info
  })

  let nextUrl = data.tracks.next

  while (nextUrl) {
    const res = await axios.get(nextUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = res.data
    nextUrl = data.tracks.next
  }

  return res.data
}
