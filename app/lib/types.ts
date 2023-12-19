export type Track = {
  id: string
  name: string
  album: {
    name: string
    image: string
  }
  artists: string[]
  preview_url: string
  spotify_url: string
}

export type Guess = {
  trackId: string
}

export type GuessedTrack = (Track | 'skipped')[]

export type gameStats = {
  win: boolean
  time: number
}
