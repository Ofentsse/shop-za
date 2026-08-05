import Rating from './Rating'

export default function ProductCard({ product }) {
  return (
    <article className="min-w-[185px] flex-1 sm:min-w-[220px] lg:min-w-0">
      <div className="aspect-square overflow-hidden rounded-2xl bg-[#f0eeed]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
        />
      </div>

      <h3 className="mt-3 truncate text-base font-bold lg:text-lg">
        {product.name}
      </h3>

      <div className="mt-1">
        <Rating value={product.rating} />
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <span className="text-xl font-bold lg:text-2xl">
          ${product.price}
        </span>

        {product.oldPrice && (
          <span className="text-xl font-bold text-black/35 line-through lg:text-2xl">
            ${product.oldPrice}
          </span>
        )}

        {product.discount && (
          <span className="rounded-full bg-[#ffebeb] px-2.5 py-1 text-[10px] font-medium text-[#ff3333]">
            -{product.discount}%
          </span>
        )}
      </div>
    </article>
  )
}