'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ImageWithFallback } from './ImageWithFallback'
import { Marquee } from './Marquee'

const heroImage =
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80'

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-100px)] bg-[#Fdfcf8] text-black pt-32 lg:pt-24 border-b border-black">
      <div className="border-t border-b border-black py-2 bg-[#Fdfcf8]">
        <Marquee
          items={['Science-Backed', 'Made in USA', 'Pure Ingredients', 'Third-Party Tested', 'Cruelty Free']}
          speed={30}
          className="text-xs font-mono uppercase tracking-widest text-black/80"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[70vh]">
        <div className="flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-24 border-r-0 lg:border-r border-black bg-[#Fdfcf8]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-xl"
          >
            <div className="inline-block px-3 py-1 border border-black text-[10px] font-bold uppercase tracking-widest bg-white">
              Est. 2024
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
              The <br />
              Future <br />
              Is <br />
              <span className="italic font-serif font-light lowercase tracking-normal text-gray-400">
                Optimized
              </span>
            </h1>

            <p className="text-sm md:text-base font-medium text-gray-500 max-w-sm leading-relaxed tracking-wide">
              High-performance peptide solutions for the modern human. Clean ingredients. Clinical efficacy. No
              compromise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/intake"
                className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group border border-black"
              >
                Shop Protocols
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href="#science"
                className="px-8 py-4 bg-transparent text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all border border-black flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[50vh] lg:h-auto overflow-hidden bg-gray-100 border-t lg:border-t-0 border-black">
          <ImageWithFallback
            src={heroImage}
            alt="Minimalist Lab Aesthetic"
            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-out"
          />
          <div className="absolute bottom-6 left-6 bg-white border border-black px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">Fig. 01 — Lab Environment</span>
          </div>
        </div>
      </div>
    </section>
  )
}
