import axios from 'axios'
import { useAccessToken } from '../context/acess-token-context'

export const fetchAudioPreview = async (trackUrl: string, token: string) => {
  if (!trackUrl) return null

  const res = await axios.get(trackUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data.preview_url
}
