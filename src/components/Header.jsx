import { useState } from 'react'

import {
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from 'lucide-react'

export default function Header() {
  const [showPromotion, setShowPromotion] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white">
      {showPromotion && (
        <div className="relative bg-black px-10 py-2 text-center text-[10px] text-white sm:text-xs">
          Sign up and get 20% off your first order.{' '}

          <button
            type="button"
            className="font-semibold underline underline-offset-2"
          >
            Sign Up Now
          </button>

          <button
            type="button"
            aria-label="Close promotion"
            onClick={() => setShowPromotion(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div className="border-b border-black/5 bg-white">
        <div className="page-shell flex h-16 items-center gap-3 lg:h-[74px] lg:gap-8">
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          <a
            href="#top"
            className="shrink-0 text-2xl font-black tracking-tight lg:text-[30px]"
          >
            SHOP.ZA
          </a>

          <nav className="hidden items-center gap-6 text-sm lg:flex">
            <a
              href="#new-arrivals"
              className="transition hover:opacity-60"
            >
              On Sale
            </a>

            <a
              href="#new-arrivals"
              className="transition hover:opacity-60"
            >
              New Arrivals
            </a>

            <a
              href="#brands"
              className="transition hover:opacity-60"
            >
              Brands
            </a>
          </nav>

          <label className="ml-auto hidden h-11 flex-1 items-center gap-3 rounded-full bg-[#f0f0f0] px-4 text-black/40 lg:flex">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search for products..."
              className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35"
            />
          </label>

          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <button
              type="button"
              aria-label="Search"
              className="lg:hidden"
            >
              <Search size={21} />
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />
            </button>

            <button
              type="button"
              aria-label="Account"
            >
              <UserRound size={21} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-black/10 px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold">
              <a
                href="#new-arrivals"
                onClick={() => setMenuOpen(false)}
              >
                On Sale
              </a>

              <a
                href="#new-arrivals"
                onClick={() => setMenuOpen(false)}
              >
                New Arrivals
              </a>

              <a
                href="#brands"
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}