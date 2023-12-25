import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Playlist = {
  id: string
  href: string
  name: string
  description: string
  images: {
    url: string
  }[]
  owner: {
    display_name: string
  }
  tracks: {
    total: number
    href: string
  }
}

export default function PlaylistResults({ list }: { list: any[] }) {
  return (
    <ul className="w-full mt-2 rounded-md flex flex-col gap-2">
      {list.map((playlist: Playlist) => {
        return (
          <li key={playlist.id}>
            <Link
              href={`/playlist/${playlist.id}`}
              className="bg-gray-900 hover:bg-gray-800 rounded-md flex items-center pr-4 transition-all"
              key={playlist.id}
            >
              <img
                src={playlist.images[0]?.url}
                alt={`${playlist.name} cover.`}
                width={100}
                height={100}
                className="rounded-l-md mr-5 h-[100px] min-w-[100px] object-cover "
              />
              <div className="flex flex-col max-w-full py-2 gap-1">
                <h5 className="font-medium line-clamp-1">{playlist.name}</h5>
                <p className="line-clamp-1 text-gray-400 text-sm">
                  {playlist.description}
                </p>
                <span className="text-gray-400 text-sm line-clamp-1">
                  <span className="text-gray-200">
                    {playlist.tracks.total} songs
                  </span>{' '}
                  by {playlist.owner.display_name}
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
