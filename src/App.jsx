import Header from './components/Header'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import DressStyles from './components/DressStyles'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

import {
  newArrivals,
  topSelling,
} from './data/storeData'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

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

      <Footer />
    </div>
  )
}