'use client'

import { Toaster } from 'react-hot-toast'

export default function ToasterContext() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            width: 'auto',
          },
        }}
      />
    </>
  )
}
