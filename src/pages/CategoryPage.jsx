import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react'

import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import CategoryFilters from '../components/CategoryFilters'
import ProductCard from '../components/ProductCard'

import {
  newArrivals,
  relatedProducts,
  topSelling,
} from '../data/storeData'

const catalogProducts = [
  ...relatedProducts,
  ...newArrivals,
  ...topSelling,
]

const itemsPerPage = 9

function formatCategoryName(categorySlug) {
  if (!categorySlug) {
    return 'Casual'
  }

  return categorySlug
    .split('-')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(' ')
}

export default function CategoryPage() {
  const { categorySlug } = useParams()

  const categoryName =
    formatCategoryName(categorySlug)

  const [filterOpen, setFilterOpen] =
    useState(false)

  const [selectedCategory, setSelectedCategory] =
    useState('')

  const [selectedColor, setSelectedColor] =
    useState('')

  const [selectedSize, setSelectedSize] =
    useState('Large')

  const [selectedStyle, setSelectedStyle] =
    useState(categoryName)

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(300)

  const [sortBy, setSortBy] =
    useState('Most Popular')

  const [currentPage, setCurrentPage] =
    useState(1)

  const filteredProducts = useMemo(() => {
    let products = catalogProducts.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice,
    )

    if (selectedCategory) {
      products = products.filter(
        (product) =>
          product.category
            ?.toLowerCase()
            .includes(
              selectedCategory.toLowerCase(),
            ),
      )
    }

    if (sortBy === 'Price: Low to High') {
      products = [...products].sort(
        (a, b) => a.price - b.price,
      )
    }

    if (sortBy === 'Price: High to Low') {
      products = [...products].sort(
        (a, b) => b.price - a.price,
      )
    }

    if (sortBy === 'Highest Rated') {
      products = [...products].sort(
        (a, b) => b.rating - a.rating,
      )
    }

    return products
  }, [
    maxPrice,
    minPrice,
    selectedCategory,
    sortBy,
  ])

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / itemsPerPage,
    ),
  )

  const safePage = Math.min(
    currentPage,
    totalPages,
  )

  const startIndex =
    (safePage - 1) * itemsPerPage

  const displayedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    )

  function applyFilters() {
    setCurrentPage(1)
    setFilterOpen(false)
  }

  function previousPage() {
    setCurrentPage((page) =>
      Math.max(1, page - 1),
    )
  }

  function nextPage() {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1),
    )
  }

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedStyle,
    setSelectedStyle,
    onApply: applyFilters,
  }

  return (
    <main className="page-shell py-6 lg:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-black/45 sm:text-sm">
        <Link
          to="/"
          className="transition hover:text-black"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <span className="text-black">
          {categoryName}
        </span>
      </nav>

      <div className="mt-6 grid gap-7 lg:grid-cols-[255px_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <CategoryFilters {...filterProps} />
        </aside>

        {/* Products */}
        <section>
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-baseline gap-2">
              <h1 className="truncate text-2xl font-bold sm:text-3xl">
                {categoryName}
              </h1>

              <p className="hidden text-sm text-black/45 sm:block">
                Showing{' '}
                {filteredProducts.length === 0
                  ? 0
                  : startIndex + 1}
                –
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredProducts.length,
                )}{' '}
                of {filteredProducts.length} Products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open filters"
                onClick={() =>
                  setFilterOpen(true)
                }
                className="grid h-10 w-10 place-items-center rounded-full bg-[#f0f0f0] lg:hidden"
              >
                <SlidersHorizontal size={17} />
              </button>

              <label className="hidden items-center gap-1 text-sm md:flex">
                <span className="text-black/45">
                  Sort by:
                </span>

                <select
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(
                      event.target.value,
                    )
                    setCurrentPage(1)
                  }}
                  className="cursor-pointer bg-transparent font-semibold outline-none"
                >
                  <option>Most Popular</option>
                  <option>
                    Price: Low to High
                  </option>
                  <option>
                    Price: High to Low
                  </option>
                  <option>Highest Rated</option>
                </select>

                <ChevronDown size={15} />
              </label>
            </div>
          </div>

          <p className="mt-1 text-xs text-black/45 sm:hidden">
            Showing{' '}
            {filteredProducts.length === 0
              ? 0
              : startIndex + 1}
            –
            {Math.min(
              startIndex + itemsPerPage,
              filteredProducts.length,
            )}{' '}
            of {filteredProducts.length} Products
          </p>

          {displayedProducts.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:mt-7">
              {displayedProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-black/10">
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-black/50">
                  Try changing your selected filters.
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
            <button
              type="button"
              onClick={previousPage}
              disabled={safePage === 1}
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-35 sm:px-4 sm:text-sm"
            >
              <ArrowLeft size={15} />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                {
                  length: Math.min(
                    totalPages,
                    5,
                  ),
                },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={[
                    'grid h-9 w-9 place-items-center rounded-lg text-xs',
                    safePage === page
                      ? 'bg-[#f0f0f0] font-semibold'
                      : 'text-black/50',
                  ].join(' ')}
                >
                  {page}
                </button>
              ))}

              {totalPages > 5 && (
                <>
                  <span className="px-1 text-black/40">
                    ...
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(
                        totalPages,
                      )
                    }
                    className="grid h-9 w-9 place-items-center rounded-lg text-xs text-black/50"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={safePage === totalPages}
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-35 sm:px-4 sm:text-sm"
            >
              Next
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>

      {/* Mobile filters */}
      <CategoryFilters
        {...filterProps}
        mobile
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
      />
    </main>
  )
}