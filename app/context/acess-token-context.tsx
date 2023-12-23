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
      const res = await axios.get('/api/access_token')
      const token = res.data
      console.log('context token', token)
      setAccessToken(
        'BQCeYERAOsXYYxmFxZNfcH7_sAIYsuvlqxfxmMRE1fqA6uvDnMEA5Ij_ZTKyz79r3czdy-wrWMf29oG4jIaqlf9lf4btNIZ8Ev7Ch-uBB3EiqqauOhFli16fJPZ6hlW5ZjxPtrrsEDS9ImgnQ-x59AS7S-QuGeS11v2O4oBp_W4c9oxM9ynoxvs6LhDGZfWwxQ'
      )
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
