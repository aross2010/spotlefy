import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
  }
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams(params).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${process.env.SPOTIFY_AUTHORIZATION as string}`,
        },
      }
    )
    console.log('INDIDE ROUTE', res.data.access_token)
    return NextResponse.json(res.data.access_token)
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      error: 'Something went wrong fetching the access token.',
    })
  }
}
