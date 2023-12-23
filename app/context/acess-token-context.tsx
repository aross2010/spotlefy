'use client'
import axios from 'axios'
import React, { useContext } from 'react'
import { useState, useEffect, createContext } from 'react'

type AccessTokenProviderProps = {
  children: React.ReactNode
}

type AccessTokenContextType = {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const AccessTokenContext = createContext<AccessTokenContextType>({
  token: '',
  setToken: () => {},
})

export default function AccessTokenContextProvider({
  children,
}: AccessTokenProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('')

  const fetchAccessToken = async () => {
    try {
      const res = await axios.get('/api/access_token', {
        headers: {
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      })
      const token = res.data
      setAccessToken(token)
    } catch (err) {}
  }

  useEffect(() => {
    fetchAccessToken()

    // fetch a new token every hour if no page refresh
    const tokenRefreshInterval = setInterval(() => {
      fetchAccessToken()
    }, 60 * 60 * 999)

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(tokenRefreshInterval)
    }
  }, [])

  return (
    <AccessTokenContext.Provider
      value={{
        token: accessToken,
        setToken: setAccessToken,
      }}
    >
      {children}
    </AccessTokenContext.Provider>
  )
}

export function useAccessToken() {
  const context = useContext(AccessTokenContext)

  return context
}
