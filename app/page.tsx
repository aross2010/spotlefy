import { Fragment } from 'react'
import Footer from './components/footer'
import SearchTypeSelector from './components/search-type-selector'

export default function Home() {
  return (
    <Fragment>
      <section className="flex flex-col items-center py-12 min-h-screen">
        <h1 className="font-bold md:text-5xl text-4xl pb-8 tracking-tight bg-gradient-to-r from-[#1db954] to-[#97b91d] bg-clip-text text-transparent">
          Spotlefy
        </h1>
        <h5 className="text-gray-400 text-center">
          Turn a Spotify playlist or an artist&apos;s tracks into a Heardle
          game.
        </h5>
        <div className="mt-6 w-full flex flex-col items-center justify-center">
          <SearchTypeSelector />
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}
