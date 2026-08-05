import { Mail } from 'lucide-react'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const footerGroups = [
  {
    title: 'COMPANY',
    links: ['About', 'Features', 'Works', 'Career'],
  },
  {
    title: 'HELP',
    links: [
      'Customer Support',
      'Delivery Details',
      'Terms & Conditions',
      'Privacy Policy',
    ],
  },
  {
    title: 'FAQ',
    links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  },
  {
    title: 'RESOURCES',
    links: [
      'Free eBooks',
      'Development Tutorial',
      'How to - Blog',
      'YouTube Playlist',
    ],
  },
]

const paymentMethods = ['VISA', 'MC', 'PayPal', ' Pay', 'G Pay']

export default function Footer() {
  function handleNewsletterSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email')

    console.log('Newsletter subscription:', email)

    form.reset()
  }

  return (
    <footer className="mt-24 bg-[#f0f0f0]">
      <div className="page-shell relative">
        {/* Newsletter section */}
        <div className="-translate-y-1/2 rounded-[22px] bg-black px-6 py-7 text-white lg:flex lg:items-center lg:justify-between lg:px-10 lg:py-9">
          <h2 className="display-title max-w-xl text-3xl leading-[0.95] lg:text-[40px]">
            STAY UP TO DATE ABOUT
            <br />
            OUR LATEST OFFERS
          </h2>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-6 flex w-full max-w-md flex-col gap-3 lg:mt-0"
          >
            <label className="flex h-12 items-center gap-3 rounded-full bg-white px-4 text-black/40">
              <Mail size={18} />

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
              />
            </label>

            <button
              type="submit"
              className="h-12 rounded-full bg-white text-sm font-medium text-black transition hover:bg-white/85"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="-mt-10 grid gap-10 pb-10 lg:grid-cols-[1.45fr_repeat(4,1fr)] lg:gap-12">
          <div>
            <h3 className="text-3xl font-black tracking-tight">
              SHOP.CO
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-6 text-black/50">
              We have clothes that suit your style and which
              you&apos;re proud to wear. From women to men.
            </p>

            {/* Social media icons */}
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="X"
                className="grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-white transition hover:bg-black hover:text-white"
              >
                <FaXTwitter size={14} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-white transition hover:bg-black hover:text-white"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-white transition hover:bg-black hover:text-white"
              >
                <FaGithub size={15} />
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-medium tracking-[3px]">
                {group.title}
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-black/50">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition hover:text-black"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and payment methods */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 py-6 text-center text-xs text-black/45 sm:flex-row sm:text-left">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>

          <div className="flex flex-wrap justify-center gap-2">
            {paymentMethods.map((paymentMethod) => (
              <span
                key={paymentMethod}
                className="rounded bg-white px-2 py-1 text-[10px] font-bold text-black shadow-sm"
              >
                {paymentMethod}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}