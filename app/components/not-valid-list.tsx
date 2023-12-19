import Link from 'next/link'
import React from 'react'

type InValidListProps = {
  type: 'artist' | 'playlist'
}

export default function InValidList({ type }: InValidListProps) {
  return (
    <section className="flex flex-col justify-center items-center py-12 min-h-screen">
      <h3 className="font-medium text-gray-400">
        {type === 'artist'
          ? 'This artist does not have enough tracks to play a game.'
          : 'This playlist does not have enough tracks to play a game.'}
      </h3>
      <Link
        className="py-3 px-10 bg-green-800 rounded-full mt-8 hover:scale-105 active:scale-95 transition-all text-sm font-medium"
        href={'/'}
      >
        Try another {type === 'artist' ? 'artist' : 'playlist'}
      </Link>
    </section>
  )
}
