import {
  ChevronDown,
  ChevronRight,
  Minus,
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
} from 'lucide-react'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import toast from 'react-hot-toast'

import ProductSection from '../components/ProductSection'
import { useCart } from '../context/CartContext'

import {
  getProductById,
  productReviews,
  relatedProducts,
} from '../data/storeData'

function Stars({ rating = 0 }) {
  return (
    <div
      className="flex items-center gap-0.5 text-[#ffc633]"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating)
        const halfFilled =
          !filled && star - 0.5 <= rating

        return (
          <span
            key={star}
            className={[
              'text-lg leading-none',
              filled
                ? ''
                : halfFilled
                  ? 'opacity-55'
                  : 'text-black/10',
            ].join(' ')}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

function ReviewCard({
  review,
  hiddenOnMobile = false,
}) {
  return (
    <article
      className={[
        'rounded-2xl border border-black/10 p-5 sm:p-6',
        hiddenOnMobile ? 'hidden md:block' : '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <Stars rating={review.rating} />

        <button
          type="button"
          aria-label={`Options for ${review.name}'s review`}
          className="text-black/40 transition hover:text-black"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <h3 className="font-bold">
          {review.name}
        </h3>

        <span
          title="Verified customer"
          className="grid h-4 w-4 place-items-center rounded-full bg-[#01ab31] text-[10px] font-bold text-white"
        >
          ✓
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-black/55">
        “{review.text}”
      </p>

      <p className="mt-4 text-xs font-medium text-black/55">
        Posted on {review.date}
      </p>
    </article>
  )
}

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { addItem } = useCart()

  const product = useMemo(
    () => getProductById(productId),
    [productId],
  )

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0)

  const [selectedColor, setSelectedColor] =
    useState(product?.colors?.[0]?.name ?? '')

  const [selectedSize, setSelectedSize] =
    useState(product?.sizes?.[2] ?? 'Large')

  const [quantity, setQuantity] = useState(1)

  const [showAllReviews, setShowAllReviews] =
    useState(false)

  useEffect(() => {
    setSelectedImageIndex(0)
    setSelectedColor(
      product?.colors?.[0]?.name ?? '',
    )
    setSelectedSize(
      product?.sizes?.[2] ??
        product?.sizes?.[0] ??
        'Large',
    )
    setQuantity(1)
    setShowAllReviews(false)
  }, [product])

  if (!product) {
    return (
      <main className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-[3px] text-black/40">
          Product unavailable
        </p>

        <h1 className="display-title mt-3 text-4xl sm:text-5xl">
          PRODUCT NOT-3 text-4xl FOUND
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-black/55">
          The product you are looking for does not
          exist or may have been removed.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/80"
        >
          Return Home
        </Link>
      </main>
    )
  }

  const gallery =
    product.gallery?.length > 0
      ? product.gallery
      : [product.image]

  const currentImage =
    gallery[selectedImageIndex] ?? gallery[0]

  function reduceQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    )
  }

  function increaseQuantity() {
    setQuantity(
      (currentQuantity) => currentQuantity + 1,
    )
  }

  function handleAddToCart() {
    const color =
      selectedColor ||
      product.colors?.[0]?.name ||
      'Default'

    const size =
      selectedSize ||
      product.sizes?.[0] ||
      'Standard'

    addItem(
      product,
      quantity,
      size,
      color,
    )

    toast.success(
      `${quantity} × ${product.name} added to cart`,
    )
  }

  return (
    <main>
      {/* Product information */}
      <section className="page-shell py-6 lg:py-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-black/45 sm:text-sm"
        >
          <Link
            to="/"
            className="transition hover:text-black"
          >
            Home
          </Link>

          <ChevronRight size={14} />

          <Link
            to="/category/casual"
            className="transition hover:text-black"
          >
            Shop
          </Link>

          <ChevronRight size={14} />

          <span>{product.gender}</span>

          <ChevronRight size={14} />

          <span className="text-black">
            {product.category}
          </span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Product gallery */}
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row">
            <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:w-[125px] lg:flex-col lg:overflow-visible lg:pb-0">
              {gallery.map((image, index) => {
                const active =
                  selectedImageIndex === index

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    aria-label={`Show product image ${index + 1}`}
                    onClick={() =>
                      setSelectedImageIndex(index)
                    }
                    className={[
                      'h-[92px] min-w-[92px] overflow-hidden rounded-xl bg-[#f0eeed] transition lg:h-[125px] lg:w-[125px]',
                      active
                        ? 'border border-black'
                        : 'border border-transparent hover:border-black/20',
                    ].join(' ')}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                )
              })}
            </div>

            <div className="order-1 aspect-square min-w-0 flex-1 overflow-hidden rounded-2xl bg-[#f0eeed] lg:order-2">
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product details */}
          <div>
            <h1 className="display-title text-[34px] uppercase leading-[0.95] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <Stars rating={product.rating} />

              <span className="text-sm text-black/60">
                {product.rating}/5
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold">
                ${product.price}
              </span>

              {product.oldPrice && (
                <span className="text-3xl font-bold text-black/30 line-through">
                  ${product.oldPrice}
                </span>
              )}

              {product.discount && (
                <span className="rounded-full bg-[#ffebeb] px-3 py-1.5 text-xs font-medium text-[#ff3333]">
                  -{product.discount}%
                </span>
              )}
            </div>

            <p className="mt-5 border-b border-black/10 pb-6 text-sm leading-6 text-black/55">
              {product.description}
            </p>

            {/* Colour selection */}
            {product.colors?.length > 0 && (
              <div className="border-b border-black/10 py-5">
                <p className="text-sm text-black/55">
                  Select Colors
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const active =
                      selectedColor === color.name

                    return (
                      <button
                        key={color.name}
                        type="button"
                        aria-label={`Select ${color.name}`}
                        aria-pressed={active}
                        title={color.name}
                        onClick={() =>
                          setSelectedColor(color.name)
                        }
                        style={{
                          backgroundColor:
                            color.value,
                        }}
                        className={[
                          'grid h-10 w-10 place-items-center rounded-full border text-sm font-bold transition',
                          color.name
                            .toLowerCase()
                            .includes('white')
                            ? 'border-black/15 text-black'
                            : 'border-transparent text-white',
                          active
                            ? 'ring-2 ring-black ring-offset-2'
                            : '',
                        ].join(' ')}
                      >
                        {active && '✓'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes?.length > 0 && (
              <div className="border-b border-black/10 py-5">
                <p className="text-sm text-black/55">
                  Choose Size
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {product.sizes.map((size) => {
                    const active =
                      selectedSize === size

                    return (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={[
                          'rounded-full px-5 py-3 text-sm transition',
                          active
                            ? 'bg-black text-white'
                            : 'bg-[#f0f0f0] text-black/50 hover:text-black',
                        ].join(' ')}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity and add to cart */}
            <div className="mt-5 flex gap-3">
              <div className="flex h-12 w-[120px] shrink-0 items-center justify-between rounded-full bg-[#f0f0f0] px-4 sm:w-[140px]">
                <button
                  type="button"
                  aria-label="Reduce quantity"
                  onClick={reduceQuantity}
                  disabled={quantity === 1}
                  className="disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-5 text-center text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={increaseQuantity}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="h-12 flex-1 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="page-shell pt-12 lg:pt-16">
        <div className="grid grid-cols-3 border-b border-black/10 text-center text-xs sm:text-sm">
          <button
            type="button"
            className="border-b-2 border-transparent py-4 text-black/45"
          >
            Product Details
          </button>

          <button
            type="button"
            className="border-b-2 border-black py-4 font-medium"
          >
            Rating &amp; Reviews
          </button>

          <button
            type="button"
            className="border-b-2 border-transparent py-4 text-black/45"
          >
            FAQs
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="font-bold">
            All Reviews{' '}
            <span className="text-sm font-normal text-black/40">
              ({productReviews.length})
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Filter reviews"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#f0f0f0]"
            >
              <SlidersHorizontal size={17} />
            </button>

            <button
              type="button"
              className="hidden h-10 items-center gap-2 rounded-full bg-[#f0f0f0] px-5 text-sm sm:flex"
            >
              Latest
              <ChevronDown size={15} />
            </button>

            <button
              type="button"
              className="h-10 rounded-full bg-black px-4 text-xs font-medium text-white sm:px-6 sm:text-sm"
            >
              Write a Review
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {productReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              hiddenOnMobile={
                !showAllReviews && index >= 3
              }
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setShowAllReviews(
                (currentValue) => !currentValue,
              )
            }
            className="rounded-full border border-black/10 px-8 py-3 text-sm font-medium transition hover:border-black"
          >
            {showAllReviews
              ? 'Show Fewer Reviews'
              : 'Load More Reviews'}
          </button>
        </div>
      </section>

      {/* Related products */}
      <ProductSection
        title="YOU MIGHT ALSO LIKE"
        products={relatedProducts}
        showViewAll={false}
      />
    </main>
  )
}