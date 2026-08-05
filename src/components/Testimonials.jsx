import { useRef } from 'react'

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react'

import { testimonials } from '../data/storeData'

export default function Testimonials() {
  const trackRef = useRef(null)

  function scrollTestimonials(direction) {
    trackRef.current?.scrollBy({
      left: direction * 340,
      behavior: 'smooth',
    })
  }

  return (
    <section className="page-shell py-12 lg:py-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="display-title max-w-xl text-3xl leading-none sm:text-4xl lg:text-5xl">
          OUR HAPPY CUSTOMERS
        </h2>

        <div className="flex shrink-0 gap-4">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => scrollTestimonials(-1)}
          >
            <ArrowLeft size={21} />
          </button>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => scrollTestimonials(1)}
          >
            <ArrowRight size={21} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto"
      >
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="min-w-[290px] snap-start rounded-2xl border border-black/10 p-6 sm:min-w-[360px] lg:min-w-[390px]"
          >
            <div className="text-xl tracking-[2px] text-[#ffc633]">
              ★★★★★
            </div>

            <div className="mt-2 flex items-center gap-1 text-base font-bold">
              {testimonial.name}

              <BadgeCheck
                size={17}
                className="fill-[#01ab31] text-white"
              />
            </div>

            <p className="mt-3 text-sm leading-6 text-black/55">
              “{testimonial.text}”
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}