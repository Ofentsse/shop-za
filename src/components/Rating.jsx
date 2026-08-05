export default function Rating({ value }) {
  const fullStars = Math.floor(value)

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex text-[17px] leading-none text-[#ffc633]"
        aria-label={`${value} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= fullStars ? '★' : '☆'}
          </span>
        ))}
      </div>

      <span className="text-xs text-black/55">
        {value}/5
      </span>
    </div>
  )
}