'use client'
import axios from 'axios'
import { useAccessToken } from '../context/acess-token-context'

export const fetchAudioPreview = async (trackUrl: string, token: string) => {
  if (!trackUrl) return null

  try {
    const res = await axios.get(trackUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data.preview_url
  } catch (err: any) {
    const token = await axios.get('/api/access_token')
    const res = await axios.get(trackUrl, {
      headers: {
        Authorization: `Bearer ${token.data}`,
      },
    })
    return res.data.preview_url
  }
}
