import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Pricing } from './components/Pricing'
import { Stats } from './components/Stats'
import { Footer } from './components/Footer'

export default function LandingPage() {
  return (
    <div className="bg-[#Fdfcf8] min-h-screen text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Pricing />
      <Stats />
      <Footer />
    </div>
  )
}
