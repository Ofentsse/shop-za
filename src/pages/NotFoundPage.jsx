import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[3px] text-black/40">
        Error 404
      </p>

      <h1 className="display-title mt-4 text-5xl">
        PAGE NOT FOUND
      </h1>

      <p className="mt-4 max-w-lg text-black/55">
        The page or product you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-black px-10 text-sm font-medium text-white"
      >
        Return Home
      </Link>
    </main>
  )
}