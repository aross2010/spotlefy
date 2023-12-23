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
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    )
    console.log('token fetched in route but not used:', res.data.access_token)
    return NextResponse.json(
      'BQCeYERAOsXYYxmFxZNfcH7_sAIYsuvlqxfxmMRE1fqA6uvDnMEA5Ij_ZTKyz79r3czdy-wrWMf29oG4jIaqlf9lf4btNIZ8Ev7Ch-uBB3EiqqauOhFli16fJPZ6hlW5ZjxPtrrsEDS9ImgnQ-x59AS7S-QuGeS11v2O4oBp_W4c9oxM9ynoxvs6LhDGZfWwxQ'
    )
  } catch (err) {
    return NextResponse.json({
      error: 'Something went wrong fetching the access token.',
    })
  }
}
