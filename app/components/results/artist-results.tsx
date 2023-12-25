import Image from 'next/image'
import Link from 'next/link'

type Artist = {
  id: string
  href: string
  name: string
  images: {
    url: string
  }[]
  genres: string[]
  followers: {
    total: number
  }
}

export default function ArtistResults({ list }: { list: Artist[] }) {
  return (
    <ul className="w-full mt-2 rounded-md flex flex-col gap-2">
      {list.map((artist: Artist) => {
        if (artist.followers.total < 100) return null
        return (
          <li key={artist.id}>
            <Link
              href={`/artist/${artist.name}`}
              className="bg-gray-900 hover:bg-gray-800 rounded-md flex items-center pr-4 transition-all"
            >
              {artist.images[0]?.url ? (
                <img
                  src={artist.images[0]?.url}
                  alt={`${artist.name} cover.`}
                  width={100}
                  height={100}
                  className="rounded-l-md mr-5 h-[100px] w-[100px] min-w-[100px] object-cover "
                />
              ) : (
                <div className="min-w-[100px] min-h-[100px] rounded-md mr-5 bg-gray-800"></div>
              )}

              <div className="flex flex-col max-w-full py-2 gap-1">
                <h5 className="font-medium line-clamp-1">{artist.name}</h5>
                {artist.genres.length > 0 && (
                  <p className="line-clamp-1 text-gray-400 text-sm">
                    {artist.genres.map((genre, index) => {
                      return (
                        <span
                          key={index}
                          className="text-gray-400"
                        >
                          {genre} {index < artist.genres.length - 1 && '• '}
                        </span>
                      )
                    })}
                  </p>
                )}

                <span className="text-gray-400 text-sm line-clamp-1">
                  {artist.followers.total.toLocaleString()} followers
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
