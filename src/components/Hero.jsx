const stats = [
  {
    value: '200+',
    label: 'International Brands',
  },
  {
    value: '2,000+',
    label: 'High-Quality Products',
  },
  {
    value: '30,000+',
    label: 'Happy Customers',
  },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="overflow-hidden bg-[#f2f0f1]"
    >
      <div className="page-shell grid min-h-[380px] lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="relative z-10 pb-8 pt-8 sm:pt-12 lg:pb-16 lg:pt-14">
          <h1 className="display-title max-w-2xl text-[38px] leading-[0.93] sm:text-5xl lg:text-[64px]">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-black/55 lg:text-base">
            Browse through our diverse range of meticulously
            crafted garments, designed to bring out your
            individuality and cater to your sense of style.
          </p>

          <a
            href="#new-arrivals"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-10 text-sm font-medium text-white transition hover:bg-black/80 sm:w-auto"
          >
            Shop Now
          </a>

          <div className="mt-8 grid grid-cols-2 gap-y-5 sm:flex sm:flex-wrap lg:mt-10">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  'px-4 first:pl-0 sm:min-w-[145px]',
                  index > 0
                    ? 'sm:border-l sm:border-black/10'
                    : '',
                  index === 2
                    ? 'col-span-2 mx-auto sm:mx-0'
                    : '',
                ].join(' ')}
              >
                <p className="text-2xl font-bold lg:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] text-black/45 lg:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[330px] lg:min-h-[382px]">
          <span className="sparkle sparkle-small left-[5%] top-[18%] lg:left-[4%] lg:top-[42%]" />

          <span className="sparkle right-[8%] top-[5%] lg:right-[2%] lg:top-[15%]" />

          <img
            src="/assets/hero-model.png"
            alt="Fashion models wearing black and white streetwear"
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain lg:left-auto lg:right-0 lg:translate-x-0"
          />
        </div>
      </div>

      <div
        id="brands"
        className="bg-black py-5 text-white lg:py-6"
      >
        <div className="page-shell flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center sm:justify-between lg:gap-5">
          <span className="brand-serif text-2xl lg:text-[30px]">
            VERSACE
          </span>

          <span className="brand-serif text-2xl font-semibold tracking-tighter lg:text-[30px]">
            ZARA
          </span>

          <span className="brand-serif text-2xl lg:text-[30px]">
            GUCCI
          </span>

          <span className="brand-serif text-2xl font-black tracking-wide lg:text-[30px]">
            PRADA
          </span>

          <span className="text-2xl font-light tracking-tight lg:text-[30px]">
            Calvin Klein
          </span>
        </div>
      </div>
    </section>
  )
}