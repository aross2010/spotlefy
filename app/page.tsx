import SearchTypeSelector from './components/search-type-selector'

export default function Home() {
  return (
    <section className="flex flex-col items-center py-12 min-h-screen">
      <h1 className="font-bold text-5xl tracking-tight text-[#1ed760]">
        Spotlefy
      </h1>
      <h5 className="text-gray-300 font-medium mt-8 text-center">
        Turn a Spotify playlist into a heardle game.
      </h5>
      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <SearchTypeSelector />
      </div>
    </section>
  )
}
