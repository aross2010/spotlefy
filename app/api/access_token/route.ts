import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
  }
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params).toString(),
    })
    const data = await res.json()
    console.log('in route', data.access_token)
    return NextResponse.json(data.access_token)
  } catch (err) {
    return NextResponse.json({
      error: 'Something went wrong fetching the access token.',
    })
  }
}
