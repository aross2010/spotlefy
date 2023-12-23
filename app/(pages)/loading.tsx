import React from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function loading() {
  return (
    <section className="flex flex-col justify-center items-center py-12 min-h-screen">
      <CircularProgress
        isIndeterminate
        trackColor="transparent"
        color="#1ed760"
      />
      <span className="font-medium text-gray-400 mt-2">validating tracks</span>
    </section>
  )
}
