'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Check, ArrowUpRight, Sparkles, Zap, Crown } from 'lucide-react'

const PLANS = [
  {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'Start your optimization journey',
    price: 134.99,
    peptides: '1–2 peptides',
    features: [
      'Personalized 1–2 peptide protocol',
      'Step-by-step video tutorial & injection guide',
      'Syringe & supplies guide (if needed)',
      'In-app progress tracker',
      'AI feedback chatbot — 24/7 protocol support',
      'Dosage & timing optimization',
    ],
    cta: 'Get started',
    icon: Sparkles,
    popular: false,
  },
  {
    id: 'accelerate',
    name: 'Accelerate',
    tagline: 'Go deeper with expert guidance',
    price: 204.99,
    peptides: 'Up to 4 peptides',
    features: [
      'Everything in Foundation',
      'Up to 4 peptides in your stack',
      'Bi-weekly calls with peptide professionals',
      'Lifetime in-app feedback & adjustments',
      'Protocol refinement based on your progress',
      'Priority support',
    ],
    cta: 'Start optimizing',
    icon: Zap,
    popular: true,
  },
  {
    id: 'pioneer',
    name: 'Pioneer',
    tagline: 'Full-spectrum optimization',
    price: 349.99,
    peptides: 'Up to 7 peptides & supplements',
    features: [
      'Everything in Accelerate',
      'Up to 7 peptides and targeted supplements',
      'Weekly 1:1 check-in calls',
      'Dedicated protocol mentor',
      'Lab interpretation & biomarker tracking',
      'Custom cycling & protocol evolution',
    ],
    cta: 'Join Pioneer',
    icon: Crown,
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#Fdfcf8] text-black border-b border-black">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">
            // 02. Pricing
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
            Protocols <br />
            <span className="font-serif italic lowercase font-light text-gray-400">Built for you</span>
          </h2>
          <p className="text-base md:text-lg font-medium text-gray-600 max-w-2xl mx-auto">
            Approximate monthly investment. All plans include personalized protocols, support, and the Peptide Pal app.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 border border-black">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col ${
                plan.popular
                  ? 'lg:border-x border-black bg-black text-white'
                  : 'bg-white'
              } border-b lg:border-b-0 border-black`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
                  Most popular
                </div>
              )}
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <plan.icon
                    className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-black'}`}
                  />
                  <span className="text-xs font-mono text-gray-500">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-6">{plan.tagline}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black tracking-tighter">${plan.price}</span>
                  <span className="text-sm font-medium text-gray-500 ml-1">/mo</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">
                  {plan.peptides}
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-white' : 'text-black'
                        }`}
                      />
                      <span className={plan.popular ? 'text-white/90' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/intake"
                  className={`inline-flex items-center justify-center gap-2 w-full py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs font-medium text-gray-500 mt-8">
          All prices are approximate. Final pricing determined after your personalized protocol is created.
        </p>
      </div>
    </section>
  )
}
