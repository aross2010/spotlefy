'use client'
import axios from 'axios'
import React, { useContext } from 'react'
import { useState, useEffect, createContext } from 'react'

type AccessTokenProviderProps = {
  children: React.ReactNode
}

const AccessTokenContext = createContext<string>('')

export default function AccessTokenContextProvider({
  children,
}: AccessTokenProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('')

  const fetchAccessToken = async () => {
    try {
      const res = await axios.get('/api/access_token')
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
    <AccessTokenContext.Provider value={accessToken}>
      {children}
    </AccessTokenContext.Provider>
  )
}

export function useAccessToken() {
  const context = useContext(AccessTokenContext)

  return context
}
