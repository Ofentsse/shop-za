import ProductCard from './ProductCard'

export default function ProductSection({
  id,
  title,
  products,
  bordered = false,
}) {
  return (
    <section
      id={id}
      className={[
        'page-shell py-12 lg:py-16',
        bordered ? 'border-t border-black/10' : '',
      ].join(' ')}
    >
      <h2 className="display-title text-center text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2 lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="h-12 w-full rounded-full border border-black/10 text-sm font-medium transition hover:bg-black hover:text-white sm:w-52"
        >
          View All
        </button>
      </div>
    </section>
  )
}