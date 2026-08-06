import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react'

import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { useAuth } from '../context/AuthContext'

const registerSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(
      2,
      'First name must contain at least 2 characters',
    )
    .required('First name is required'),

  lastName: yup
    .string()
    .trim()
    .min(
      2,
      'Last name must contain at least 2 characters',
    )
    .required('Last name is required'),

  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email address is required'),

  password: yup
    .string()
    .min(
      8,
      'Password must contain at least 8 characters',
    )
    .matches(
      /[A-Z]/,
      'Password must contain an uppercase letter',
    )
    .matches(
      /[a-z]/,
      'Password must contain a lowercase letter',
    )
    .matches(
      /\d/,
      'Password must contain a number',
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'Passwords do not match',
    )
    .required('Confirm your password'),

  acceptTerms: yup
    .boolean()
    .oneOf(
      [true],
      'You must accept the terms and conditions',
    ),
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

function TextField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  icon: Icon,
  error,
  registration,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium"
      >
        {label}
      </label>

      <div
        className={[
          'mt-2 flex h-12 items-center gap-3 rounded-full border px-4',
          error
            ? 'border-[#ff3333]'
            : 'border-black/10 focus-within:border-black',
        ].join(' ')}
      >
        <Icon
          size={18}
          className="shrink-0 text-black/40"
        />

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          {...registration}
        />
      </div>

      <FormError message={error} />
    </div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] =
    useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

  const { register: createAccount } =
    useAuth()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: yupResolver(registerSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  async function submitRegistration(
    formData,
  ) {
    const {
      confirmPassword,
      acceptTerms,
      ...registrationData
    } = formData

    try {
      await createAccount(
        registrationData,
      )

      toast.success(
        'Your account has been created',
      )

      navigate('/account', {
        replace: true,
      })
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to create your account.'

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
              JOIN
              <br />
              SHOP.CO
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
              Create an account to save your
              cart, follow orders and enjoy a
              faster checkout experience.
            </p>
          </div>

          <p className="text-xs text-white/45">
            Style made personal.
          </p>
        </section>

        <section className="px-5 py-9 sm:px-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-medium uppercase tracking-[3px] text-black/40">
              New customer
            </p>

            <h2 className="display-title mt-3 text-4xl">
              CREATE ACCOUNT
            </h2>

            <form
              onSubmit={handleSubmit(
                submitRegistration,
              )}
              className="mt-8 space-y-5"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  id="register-first-name"
                  label="First name"
                  placeholder="First name"
                  autoComplete="given-name"
                  icon={UserRound}
                  error={
                    errors.firstName?.message
                  }
                  registration={register(
                    'firstName',
                  )}
                />

                <TextField
                  id="register-last-name"
                  label="Last name"
                  placeholder="Last name"
                  autoComplete="family-name"
                  icon={UserRound}
                  error={
                    errors.lastName?.message
                  }
                  registration={register(
                    'lastName',
                  )}
                />
              </div>

              <TextField
                id="register-email"
                label="Email address"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                icon={Mail}
                error={errors.email?.message}
                registration={register('email')}
              />

              <div>
                <label
                  htmlFor="register-password"
                  className="text-sm font-medium"
                >
                  Password
                </label>

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
                    id="register-password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    autoComplete="new-password"
                    placeholder="Create a password"
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
                    className="text-black/45"
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

              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm password
                </label>

                <div
                  className={[
                    'mt-2 flex h-12 items-center gap-3 rounded-full border px-4',
                    errors.confirmPassword
                      ? 'border-[#ff3333]'
                      : 'border-black/10 focus-within:border-black',
                  ].join(' ')}
                >
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-black/40"
                  />

                  <input
                    id="register-confirm-password"
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    {...register(
                      'confirmPassword',
                    )}
                  />

                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current,
                      )
                    }
                    className="text-black/45"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <FormError
                  message={
                    errors.confirmPassword
                      ?.message
                  }
                />
              </div>

              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-black"
                    {...register('acceptTerms')}
                  />

                  <span className="text-xs leading-5 text-black/55">
                    I agree to the{' '}
                    <a
                      href="#"
                      className="font-medium text-black underline"
                    >
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a
                      href="#"
                      className="font-medium text-black underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                <FormError
                  message={
                    errors.acceptTerms?.message
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Creating account...'
                  : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-black/55">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-black underline underline-offset-2"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}