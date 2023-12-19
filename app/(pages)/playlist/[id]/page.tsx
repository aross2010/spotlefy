import React from 'react'
import axios from 'axios'
import Game from '../../../components/game/game'
import { filterPlaylistTracks } from '@/app/functions/filter-playlist-tracks'
import { redirect } from 'next/navigation'
import { Track } from '@/app/lib/types'
import InValidList from '@/app/components/not-valid-list'

export default async function PlaylistPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const tokenRes = await axios.get('http://localhost:3000/api/access_token')
    const token = tokenRes.data

    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    let playlistTracks = []

    const playlist = res.data

    const playlistName = playlist.name
    playlistTracks.push(...playlist.tracks.items)

    let next = playlist.tracks.next

    while (next) {
      const res = await axios.get(next, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = res.data
      playlistTracks.push(...data.items)
      next = data.next
    }

    const tracks = filterPlaylistTracks(playlistTracks) as Track[]

    // if no playable tracks, redirect to home page
    if (!tracks) {
      return <InValidList type="playlist" />
    }

    return (
      <Game
        tracks={tracks}
        name={playlistName}
      />
    )
  } catch (err) {
    return <InValidList type="playlist" />
  }
}
