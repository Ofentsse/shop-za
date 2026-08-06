import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import DressStyles from '../components/DressStyles'
import Testimonials from '../components/Testimonials'

import {
  newArrivals,
  topSelling,
} from '../data/storeData'

export default function HomePage() {
  return (
    <main>
      <Hero />

      <ProductSection
        id="new-arrivals"
        title="NEW ARRIVALS"
        products={newArrivals}
      />

      <ProductSection
        id="top-selling"
        title="TOP SELLING"
        products={topSelling}
        bordered
      />

      <DressStyles />

      <Testimonials />
    </main>
  )
}