import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'

const icons = [
  {
    href: 'https://www.linkedin.com/in/alex-ross-32b278236',
    icon: <FaLinkedin className="text-2xl" />,
  },
  {
    href: 'https://www.github.com/aross2010',
    icon: <FaGithub className="text-2xl" />,
  },
  {
    href: 'mailto:adross1027@gmail.com',
    icon: <GrMail className="text-2xl" />,
  },
] as const

export default function Footer() {
  return (
    <footer className="w-full px-2 py-10 text-gray-400 flex justify-center">
      <section className="w-full max-w-[1100px] flex justify-center">
        <div className="flex sm:flex-row flex-col items-center gap-2">
          <small>
            Data from{' '}
            <a
              className="hover:underline"
              href="https://developer.spotify.com/"
            >
              Spotify
            </a>
            . ©{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
            })}{' '}
            by{' '}
            <a
              href="https://www.adross.dev"
              className="hover:underline"
              target="_blank"
            >
              Alex Ross
            </a>
            .
          </small>
          <div className="flex items-center gap-1">
            {icons.map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                className="rounded-full p-2  hover:bg-gray-700 transition-all"
                target="_blank"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </footer>
  )
}
