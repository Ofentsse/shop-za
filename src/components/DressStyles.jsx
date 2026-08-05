import { dressStyles } from '../data/storeData'

export default function DressStyles() {
  return (
    <section className="page-shell py-8 lg:py-14">
      <div className="rounded-[28px] bg-[#f0f0f0] px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <h2 className="display-title text-center text-3xl leading-none sm:text-4xl lg:text-5xl">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {dressStyles.map((style, index) => (
            <button
              key={style.id}
              type="button"
              className={[
                'overflow-hidden rounded-2xl bg-white text-left',
                'transition hover:-translate-y-0.5 hover:shadow-card',
                index === 0 || index === 3
                  ? 'lg:col-span-2'
                  : 'lg:col-span-3',
              ].join(' ')}
            >
              <img
                src={style.image}
                alt={`${style.title} dress style`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}