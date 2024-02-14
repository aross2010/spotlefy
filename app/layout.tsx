import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AccessTokenContextProvider from './context/acess-token-context'
import ToasterContext from './context/toast-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotelfy',
  description:
    "Turn any Spotify playlist, or an artist's tracks into a heardle game.",
}

export const fetchCache = 'force-no-store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full bg-gray-950 text-gray-50 flex flex-col items-center justify-center`}
      >
        <AccessTokenContextProvider>
          <ToasterContext />
          <main className="w-full h-full max-w-[800px] px-5">{children}</main>
        </AccessTokenContextProvider>
      </body>
    </html>
  )
}
