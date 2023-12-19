import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12">
      <Link
        href="https://alexross.vercel.app"
        className="text-gray-600 text-sm underline"
      >
        Alex Ross
      </Link>
    </footer>
  )
}
