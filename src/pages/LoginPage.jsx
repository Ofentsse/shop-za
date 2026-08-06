import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from 'lucide-react'

import { useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { useAuth } from '../context/AuthContext'

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email address is required'),

  password: yup
    .string()
    .required('Password is required'),
})

function FormError({ message }) {
  if (!message) {
    return null
  }

  return (
    <p className="mt-1 text-xs text-[#ff3333]">
      {message}
    </p>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] =
    useState(false)

  const { login } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const destination =
    location.state?.from || '/account'

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: yupResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function submitLogin(formData) {
    try {
      await login(formData)

      toast.success('Welcome back')

      navigate(destination, {
        replace: true,
      })
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to sign in. Check your email and password.'

      toast.error(message)
    }
  }

  return (
    <main className="page-shell py-10 lg:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-black/10 lg:grid-cols-2">
        <section className="hidden bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link
              to="/"
              className="text-3xl font-black tracking-tight"
            >
              SHOP.CO
            </Link>

            <h1 className="display-title mt-20 text-5xl leading-[0.95]">
              WELCOME
              <br />
              BACK
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
              Sign in to manage your account,
              view your orders and continue
              shopping.
            </p>
          </div>

          <p className="text-xs text-white/45">
            Find clothes that match your style.
          </p>
        </section>

        <section className="px-5 py-9 sm:px-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-medium uppercase tracking-[3px] text-black/40">
              Customer account
            </p>

            <h2 className="display-title mt-3 text-4xl">
              SIGN IN
            </h2>

            <p className="mt-3 text-sm text-black/50">
              Enter your details to access your
              SHOP.CO account.
            </p>

            <form
              onSubmit={handleSubmit(
                submitLogin,
              )}
              className="mt-8 space-y-5"
              noValidate
            >
              <div>
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium"
                >
                  Email address
                </label>

                <div
                  className={[
                    'mt-2 flex h-12 items-center gap-3 rounded-full border px-4',
                    errors.email
                      ? 'border-[#ff3333]'
                      : 'border-black/10 focus-within:border-black',
                  ].join(' ')}
                >
                  <Mail
                    size={18}
                    className="shrink-0 text-black/40"
                  />

                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    {...register('email')}
                  />
                </div>

                <FormError
                  message={
                    errors.email?.message
                  }
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium underline underline-offset-2"
                  >
                    Forgot password?
                  </button>
                </div>

                <div
                  className={[
                    'mt-2 flex h-12 items-center gap-3 rounded-full border px-4',
                    errors.password
                      ? 'border-[#ff3333]'
                      : 'border-black/10 focus-within:border-black',
                  ].join(' ')}
                >
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-black/40"
                  />

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    {...register('password')}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    className="shrink-0 text-black/45"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <FormError
                  message={
                    errors.password?.message
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Signing in...'
                  : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-black/55">
              Do not have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-black underline underline-offset-2"
              >
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}