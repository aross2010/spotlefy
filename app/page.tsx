import { Fragment } from 'react'
import Footer from './components/footer'
import SearchTypeSelector from './components/search-type-selector'
import { FaSpotify } from 'react-icons/fa6'
import Link from 'next/link'

export default function Home() {
  return (
    <Fragment>
      <section className="flex flex-col items-center py-12 min-h-screen">
        <h1 className="font-bold md:text-4xl text-xl flex items-center gap-2 pb-4 tracking-tight  text-green-500 ">
          Spotlefy <FaSpotify />
        </h1>
        {/* <h5 className="text-gray-400 font-medium text-center">
          Customize your own Heardle game via Spotify.
        </h5> */}
        <div className="mt-6 w-full flex flex-col items-center justify-center">
          <SearchTypeSelector disabled />
        </div>
        <p className="text-gray-400 text-center font-medium mt-4">
          Due to recent Spotify API changes, Spotlefy is no longer available.
          <br />
          Check out the project on{' '}
          <Link
            className="underline"
            href={'https://github.com/aross2010/spotlefy'}
          >
            GitHub
          </Link>{' '}
          for more information.
        </p>
      </section>
      <Footer />
    </Fragment>
  )
}
