import {
  LogOut,
  Mail,
  Package,
  ShoppingBag,
  UserRound,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useAuth } from '../context/AuthContext'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()

    toast.success('You have signed out')

    navigate('/', {
      replace: true,
    })
  }

  const fullName = [
    user?.firstName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <main className="page-shell py-10 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-black/10 p-5">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-black text-white">
            <UserRound size={28} />
          </div>

          <h1 className="mt-4 text-xl font-bold">
            {fullName || 'SHOP.CO Customer'}
          </h1>

          <p className="mt-1 text-sm text-black/50">
            {user?.email}
          </p>

          <nav className="mt-6 space-y-2">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl bg-black px-4 py-3 text-left text-sm text-white"
            >
              <UserRound size={18} />
              Account Details
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-[#f0f0f0]"
            >
              <Package size={18} />
              My Orders
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-[#ff3333] hover:bg-[#ffebeb]"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </aside>

        <section className="rounded-2xl border border-black/10 p-5 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[3px] text-black/40">
            My account
          </p>

          <h2 className="display-title mt-3 text-3xl sm:text-4xl">
            ACCOUNT DETAILS
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f0f0f0] p-5">
              <UserRound
                size={21}
                className="text-black/45"
              />

              <p className="mt-4 text-xs text-black/45">
                Full name
              </p>

              <p className="mt-1 font-semibold">
                {fullName || 'Not provided'}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f0f0f0] p-5">
              <Mail
                size={21}
                className="text-black/45"
              />

              <p className="mt-4 text-xs text-black/45">
                Email address
              </p>

              <p className="mt-1 break-all font-semibold">
                {user?.email}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f0f0f0] p-5 sm:col-span-2">
              <ShoppingBag
                size={21}
                className="text-black/45"
              />

              <p className="mt-4 text-xs text-black/45">
                Account status
              </p>

              <p className="mt-1 font-semibold">
                Active customer
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}