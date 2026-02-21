'use client'

import { motion } from 'motion/react'

export function Stats() {
  const stats = [
    { label: 'Peptides Available', value: '50+' },
    { label: 'Purity Guaranteed', value: '99.9%' },
    { label: 'Happy Clients', value: '15k+' },
    { label: 'Expert Support', value: '24/7' },
  ]

  return (
    <section className="bg-black text-white border-b border-white/20">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/20 border-t border-white/20">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 md:p-12 flex flex-col justify-between aspect-square md:aspect-auto md:h-64 hover:bg-white/5 transition-colors group cursor-default"
          >
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
              [ {stat.label} ]
            </span>
            <span className="text-5xl md:text-6xl font-black tracking-tighter self-end group-hover:scale-110 transition-transform origin-bottom-right">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
