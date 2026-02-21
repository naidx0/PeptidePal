'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight, FlaskConical, Activity, Zap } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'

const aboutImage =
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=1080&q=80'

export function About() {
  const benefits = [
    {
      title: 'Cellular Repair',
      icon: FlaskConical,
      desc: 'Accelerate tissue regeneration at the molecular level.',
    },
    {
      title: 'Cognitive Boost',
      icon: Zap,
      desc: 'Enhance focus, memory, and mental clarity.',
    },
    {
      title: 'Peak Performance',
      icon: Activity,
      desc: 'Maximize athletic output and recovery speed.',
    },
  ]

  return (
    <section id="about" className="bg-[#Fdfcf8] text-black border-b border-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black">
          <div className="p-8 lg:p-16 border-r border-black flex flex-col justify-between">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">
                // 01. The Science
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                Optimization <br /> Built on <br />{' '}
                <span className="font-serif italic lowercase font-light text-gray-400">Bio-Chemistry</span>
              </h2>
            </div>

            <div className="mt-8">
              <p className="text-sm md:text-base font-medium leading-relaxed max-w-md text-gray-600">
                We are a team of scientists, doctors, and biohackers focused on pushing the boundaries of human
                potential. From peptide synthesis to personalized protocol design, we help high-performers unlock
                their biological ceiling.
              </p>
              <Link
                href="/intake"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
              >
                Meet The Experts
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-[50vh] lg:h-auto border-t lg:border-t-0 border-black overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={aboutImage}
              alt="Organic Shapes"
              className="w-full h-full object-cover opacity-80 mix-blend-multiply"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[12rem] font-black text-black/5 rotate-90 lg:rotate-0 select-none">DNA</span>
            </div>
          </div>
        </div>

        <div id="science" className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black bg-white">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 lg:p-12 hover:bg-gray-50 transition-colors group cursor-default"
            >
              <div className="mb-6 flex justify-between items-start">
                <span className="text-xs font-mono text-gray-400">0{index + 1}</span>
                <benefit.icon className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
