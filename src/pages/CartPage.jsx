import {
  ArrowRight,
  ChevronRight,
  Minus,
  Plus,
  Tag,
  Trash2,
} from 'lucide-react'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <article className="flex gap-3 border-b border-black/10 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:gap-4">
      <Link
        to={`/products/${item.productId}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f0eeed] sm:h-32 sm:w-32"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/products/${item.productId}`}
              className="block truncate font-bold transition hover:opacity-60 sm:text-lg"
            >
              {item.name}
            </Link>

            <p className="mt-1 text-xs sm:text-sm">
              Size:{' '}
              <span className="text-black/55">
                {item.size}
              </span>
            </p>

            <p className="mt-0.5 text-xs sm:text-sm">
              Color:{' '}
              <span className="text-black/55">
                {item.color}
              </span>
            </p>
          </div>

          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.cartId)}
            className="shrink-0 text-[#ff3333]"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <p className="text-xl font-bold sm:text-2xl">
            ${item.price}
          </p>

          <div className="flex h-9 items-center gap-4 rounded-full bg-[#f0f0f0] px-3 sm:h-11 sm:px-4">
            <button
              type="button"
              aria-label="Reduce quantity"
              onClick={() =>
                updateQuantity(
                  item.cartId,
                  item.quantity - 1,
                )
              }
            >
              <Minus size={16} />
            </button>

            <span className="min-w-3 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() =>
                updateQuantity(
                  item.cartId,
                  item.quantity + 1,
                )
              }
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function OrderRow({
  label,
  value,
  valueClassName = '',
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-black/55">
        {label}
      </span>

      <span
        className={`text-sm font-bold ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  )
}

export default function CartPage() {
  const {
    cartItems,
    subtotal,
    discount,
    discountRate,
    deliveryFee,
    total,
  } = useCart()

  const [promoCode, setPromoCode] = useState('')

  function applyPromoCode(event) {
    event.preventDefault()

    if (!promoCode.trim()) {
      toast.error('Enter a promo code')
      return
    }

    toast.success('20% discount applied')
  }

  function checkout() {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    toast.success('Proceeding to checkout')
  }

  return (
    <main className="page-shell py-6 lg:py-8">
      <nav className="flex items-center gap-2 text-xs text-black/45 sm:text-sm">
        <Link
          to="/"
          className="transition hover:text-black"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <span className="text-black">
          Cart
        </span>
      </nav>

      <h1 className="display-title mt-5 text-3xl sm:text-4xl lg:text-5xl">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <section className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-black/10 px-5 text-center">
          <h2 className="text-2xl font-bold">
            Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-black/50">
            Add some products to continue shopping.
          </p>

          <Link
            to="/category/casual"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white"
          >
            Continue Shopping
          </Link>
        </section>
      ) : (
        <div className="mt-7 grid items-start gap-5 lg:grid-cols-[1.45fr_1fr]">
          <section className="rounded-2xl border border-black/10 p-4 sm:p-5">
            {cartItems.map((item) => (
              <CartItem
                key={item.cartId}
                item={item}
              />
            ))}
          </section>

          <aside className="rounded-2xl border border-black/10 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">
              <OrderRow
                label="Subtotal"
                value={`$${subtotal}`}
              />

              <OrderRow
                label={`Discount (-${Math.round(
                  discountRate * 100,
                )}%)`}
                value={`-$${discount}`}
                valueClassName="text-[#ff3333]"
              />

              <OrderRow
                label="Delivery Fee"
                value={`$${deliveryFee}`}
              />
            </div>

            <div className="my-5 border-t border-black/10" />

            <div className="flex items-center justify-between">
              <span className="text-base">
                Total
              </span>

              <span className="text-xl font-bold sm:text-2xl">
                ${total}
              </span>
            </div>

            <form
              onSubmit={applyPromoCode}
              className="mt-5 flex gap-2"
            >
              <label className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f0f0f0] px-4 text-black/35">
                <Tag size={17} />

                <input
                  type="text"
                  value={promoCode}
                  onChange={(event) =>
                    setPromoCode(event.target.value)
                  }
                  placeholder="Add promo code"
                  className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-black/35"
                />
              </label>

              <button
                type="submit"
                className="h-12 rounded-full bg-black px-6 text-sm font-medium text-white"
              >
                Apply
              </button>
            </form>

            <button
              type="button"
              onClick={checkout}
              className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/80"
            >
              Go to Checkout
              <ArrowRight size={17} />
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}