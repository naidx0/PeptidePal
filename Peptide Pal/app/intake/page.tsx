'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { FormData, PeptideRecommendation } from '@/lib/types'
import { Logo } from '../components/Logo'

// ─── Constants ────────────────────────────────────────────────────────────────

const GOALS = [
  { id: 'fat_loss', label: 'Fat Loss', description: 'Reduce body fat percentage' },
  { id: 'muscle_gain', label: 'Muscle Gain', description: 'Build lean muscle mass' },
  { id: 'longevity', label: 'Longevity', description: 'Support long-term healthspan' },
  { id: 'anti_aging', label: 'Anti-Aging', description: 'Reduce aging biomarkers' },
  { id: 'recovery', label: 'Recovery', description: 'Accelerate tissue repair' },
  { id: 'sleep', label: 'Sleep Optimization', description: 'Improve sleep quality & depth' },
  { id: 'cognitive', label: 'Cognitive Performance', description: 'Enhance focus & memory' },
]

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { id: 'lightly_active', label: 'Lightly Active', desc: '1–3 days/week' },
  { id: 'moderately_active', label: 'Moderately Active', desc: '3–5 days/week' },
  { id: 'very_active', label: 'Very Active', desc: '6–7 days/week' },
  { id: 'extremely_active', label: 'Extremely Active', desc: 'Athletes or physical job' },
]

const INGESTION_OPTIONS = [
  { id: 'oral', label: 'Oral', desc: 'Capsules, sublingual, sprays' },
  { id: 'injection', label: 'Injection', desc: 'Subcutaneous / intramuscular' },
  { id: 'pen', label: 'Pen', desc: 'Pre-filled injection pen' },
]

const INITIAL_FORM_DATA: FormData = {
  email: '',
  phone: '',
  preferredIngestion: '',
  name: '',
  age: '',
  heightFt: '',
  heightIn: '',
  weight: '',
  biologicalSex: '',
  goals: [],
  activityLevel: '',
  healthConditions: '',
  medications: '',
}

const TOTAL_STEPS = 6

// ─── Shared styles (matches landing page) ──────────────────────────────────────

const pageBg = 'bg-[#Fdfcf8]'
const inputClass =
  'w-full px-4 py-3.5 border border-black text-sm font-medium uppercase tracking-widest placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white'
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-black mb-2'

// ─── Main Component ────────────────────────────────────────────────────────────

export default function IntakePage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [recommendations, setRecommendations] = useState<PeptideRecommendation[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId],
    }))
  }

  const canContinue = (): boolean => {
    if (step === 1) return formData.email.trim() !== '' && formData.phone.trim() !== '' && formData.preferredIngestion !== ''
    if (step === 2) return formData.name.trim() !== '' && formData.age !== ''
    if (step === 3) return formData.heightFt !== '' && formData.weight !== '' && formData.biologicalSex !== ''
    if (step === 4) return formData.goals.length > 0
    if (step === 5) return formData.activityLevel !== ''
    return true
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Failed to get recommendations')
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setRecommendations(data.recommendations)
    } catch {
      setError('Something went wrong generating your protocol. Please try again.')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setRecommendations(null)
    setStep(1)
    setFormData(INITIAL_FORM_DATA)
    setError(null)
  }

  if (isLoading) return <LoadingView />
  if (recommendations) {
    return <ResultsView recommendations={recommendations} formData={formData} onReset={handleReset} />
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div className={`min-h-screen ${pageBg} text-black`}>
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-200 z-50">
        <div className="h-full bg-black transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <header className="pt-10 px-6 border-b border-black/5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Logo />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{step} / {TOTAL_STEPS}</span>
        </div>
      </header>

      <main className="px-6 py-10">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center gap-2 mb-10">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i + 1 === step ? 'w-6 h-2 bg-black' : i + 1 < step ? 'w-2 h-2 bg-black/50' : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="border border-black p-8 md:p-10 bg-white">
            {step === 1 && <StepContact formData={formData} onChange={updateFormData} />}
            {step === 2 && <StepPersonalInfo formData={formData} onChange={updateFormData} />}
            {step === 3 && <StepMeasurements formData={formData} onChange={updateFormData} />}
            {step === 4 && <StepGoals formData={formData} onToggle={toggleGoal} />}
            {step === 5 && <StepActivityLevel formData={formData} onChange={updateFormData} />}
            {step === 6 && <StepHealthConditions formData={formData} onChange={updateFormData} />}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-4 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={step < TOTAL_STEPS ? () => setStep(s => s + 1) : handleSubmit}
              disabled={!canContinue()}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                canContinue()
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step < TOTAL_STEPS ? 'Continue →' : 'Generate my protocol →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── Step 1: Contact info + preferred ingestion ─────────────────────────────────

function StepContact({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <StepHeader
        title="Contact & preferences"
        subtitle="We'll use this to deliver your protocol and factor in how you prefer to take peptides."
      />
      <div className="space-y-6">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => onChange('email', e.target.value)}
            placeholder="YOU@EMAIL.COM"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => onChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Preferred way of ingesting peptides</label>
          <div className="space-y-2">
            {INGESTION_OPTIONS.map(opt => {
              const selected = formData.preferredIngestion === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange('preferredIngestion', opt.id)}
                  className={`w-full flex items-center justify-between px-4 py-4 border text-left transition-all ${
                    selected ? 'border-black bg-black text-white' : 'border-black hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest">{opt.label}</span>
                    <span className={`block text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                      {opt.desc}
                    </span>
                  </div>
                  {selected && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: Personal info ─────────────────────────────────────────────────────

function StepPersonalInfo({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <StepHeader title="The basics" subtitle="Tell us about yourself so we can personalize your protocol." />
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Full name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => onChange('name', e.target.value)}
            placeholder="YOUR NAME"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={e => onChange('age', e.target.value)}
            placeholder="35"
            min="18"
            max="100"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Measurements ──────────────────────────────────────────────────────

function StepMeasurements({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <StepHeader title="Body measurements" subtitle="Helps calibrate dosing for your profile." />
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Height</label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="number"
                value={formData.heightFt}
                onChange={e => onChange('heightFt', e.target.value)}
                placeholder="5"
                min="3"
                max="8"
                className={`${inputClass} pr-10`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">FT</span>
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                value={formData.heightIn}
                onChange={e => onChange('heightIn', e.target.value)}
                placeholder="10"
                min="0"
                max="11"
                className={`${inputClass} pr-10`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">IN</span>
            </div>
          </div>
        </div>
        <div>
          <label className={labelClass}>Weight</label>
          <div className="relative">
            <input
              type="number"
              value={formData.weight}
              onChange={e => onChange('weight', e.target.value)}
              placeholder="170"
              min="50"
              max="500"
              className={`${inputClass} pr-14`}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">LBS</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>Biological sex</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange('biologicalSex', value)}
                className={`py-3.5 border text-xs font-bold uppercase tracking-widest transition-all ${
                  formData.biologicalSex === value
                    ? 'border-black bg-black text-white'
                    : 'border-black hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Goals ─────────────────────────────────────────────────────────────

function StepGoals({ formData, onToggle }: { formData: FormData; onToggle: (id: string) => void }) {
  return (
    <div>
      <StepHeader title="Primary goals" subtitle="Select all that apply." />
      <div className="space-y-2">
        {GOALS.map(goal => {
          const selected = formData.goals.includes(goal.id)
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onToggle(goal.id)}
              className={`w-full flex items-center justify-between px-4 py-4 border text-left transition-all ${
                selected ? 'border-black bg-black text-white' : 'border-black hover:bg-gray-50'
              }`}
            >
              <div>
                <span className="text-sm font-bold uppercase tracking-widest">{goal.label}</span>
                <span className={`block text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                  {goal.description}
                </span>
              </div>
              {selected && (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 5: Activity ──────────────────────────────────────────────────────────

function StepActivityLevel({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <StepHeader title="Activity level" subtitle="Your training frequency helps refine recommendations." />
      <div className="space-y-2">
        {ACTIVITY_LEVELS.map(level => {
          const selected = formData.activityLevel === level.id
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange('activityLevel', level.id)}
              className={`w-full flex items-center justify-between px-4 py-4 border text-left transition-all ${
                selected ? 'border-black bg-black text-white' : 'border-black hover:bg-gray-50'
              }`}
            >
              <div>
                <span className="text-sm font-bold uppercase tracking-widest">{level.label}</span>
                <span className={`block text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                  {level.desc}
                </span>
              </div>
              {selected && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 6: Health ────────────────────────────────────────────────────────────

function StepHealthConditions({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <StepHeader title="Health history" subtitle="Optional. Helps flag interactions." />
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Health conditions <span className="text-gray-400 font-normal">optional</span></label>
          <textarea
            value={formData.healthConditions}
            onChange={e => onChange('healthConditions', e.target.value)}
            placeholder="e.g. Type 2 diabetes, hypothyroidism..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className={labelClass}>Medications / supplements <span className="text-gray-400 font-normal">optional</span></label>
          <textarea
            value={formData.medications}
            onChange={e => onChange('medications', e.target.value)}
            placeholder="e.g. Metformin, thyroid meds..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="border border-black p-4 bg-[#Fdfcf8]">
          <p className="text-xs font-medium text-gray-600">
            <strong>Privacy:</strong> Your data is only used for this session and is never stored.
          </p>
        </div>
      </div>
    </div>
  )
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-black uppercase tracking-tighter text-black mb-2">{title}</h1>
      <p className="text-sm font-medium text-gray-500">{subtitle}</p>
    </div>
  )
}

// ─── Loading View ──────────────────────────────────────────────────────────────

const LOADING_STEPS = [
  { emoji: '🧬', label: 'Analyzing your biological profile...' },
  { emoji: '💉', label: 'Scanning peptide database...' },
  { emoji: '🔬', label: 'Cross-referencing research studies...' },
  { emoji: '📊', label: 'Calculating optimal dosages...' },
  { emoji: '🧪', label: 'Building your custom protocol...' },
  { emoji: '✅', label: 'Finalizing your recommendations...' },
]

function LoadingView() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, LOADING_STEPS.length - 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`min-h-screen ${pageBg} flex flex-col px-6`}>
      <header className="pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <Logo />
        </div>
      </header>
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 border border-black mb-6 animate-pulse">
            <span className="text-5xl">{LOADING_STEPS[currentStep].emoji}</span>
          </div>
          <p key={currentStep} className="text-xl font-bold uppercase tracking-widest text-black">
            {LOADING_STEPS[currentStep].label}
          </p>
        </div>
        <div className="space-y-2 mb-10">
          {LOADING_STEPS.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 py-2 px-3 border ${
                index === currentStep ? 'border-black bg-white' : 'border-black/20'
              } ${index < currentStep ? 'opacity-60' : ''}`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                  index < currentStep ? 'bg-black text-white' : index === currentStep ? 'border border-black' : 'bg-gray-200'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </span>
              <span className={`text-sm ${index < currentStep ? 'line-through text-gray-500' : 'font-medium'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((currentStep + 1) / LOADING_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Results View ──────────────────────────────────────────────────────────────

function ResultsView({
  recommendations,
  formData,
  onReset,
}: {
  recommendations: PeptideRecommendation[]
  formData: FormData
  onReset: () => void
}) {
  return (
    <div className={`min-h-screen ${pageBg} text-black`}>
      <div className="border-b border-black bg-black text-white px-6 py-3">
        <p className="text-xs font-bold uppercase tracking-widest text-center">
          ⚠️ For research & educational purposes only. Not medical advice. Consult a physician.
        </p>
      </div>
      <header className="border-b border-black px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo />
          <button onClick={onReset} className="text-xs font-bold uppercase tracking-widest hover:opacity-50">
            ← Start over
          </button>
        </div>
      </header>
      <main className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-3">
              {formData.name ? `${formData.name}'s` : 'Your'} research protocol
            </h1>
            <p className="text-gray-500 font-medium">Based on your profile and goals.</p>
          </div>
          {formData.goals.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {formData.goals.map(goalId => {
                const goal = GOALS.find(g => g.id === goalId)
                return goal ? (
                  <span key={goalId} className="px-3 py-1 border border-black text-xs font-bold uppercase tracking-widest">
                    {goal.label}
                  </span>
                ) : null
              })}
            </div>
          )}
          <div className="space-y-4">
            {recommendations.map((peptide, index) => (
              <div key={index} className="border border-black overflow-hidden">
                <div className="px-6 py-5 border-b border-black">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 border border-black flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-tight mb-2">{peptide.name}</h2>
                      <p className="text-gray-600 text-sm mb-2">{peptide.mechanism}</p>
                      <p className="text-sm font-medium">{peptide.whyItFits}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-black">
                  <div className="px-5 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Dosage</span>
                    <p className="text-sm font-medium mt-1">{peptide.typicalDosage}</p>
                  </div>
                  <div className="px-5 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Frequency</span>
                    <p className="text-sm font-medium mt-1">{peptide.frequency}</p>
                  </div>
                  <div className="px-5 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Best time</span>
                    <p className="text-sm font-medium mt-1">{peptide.bestTimeToAdminister}</p>
                  </div>
                  <div className="px-5 py-4 sm:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Stacking</span>
                    <p className="text-sm font-medium mt-1">{peptide.stackingOptions}</p>
                  </div>
                  <div className="px-5 py-4 sm:col-span-2 lg:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Caution</span>
                    <p className="text-sm font-medium mt-1">{peptide.contraindications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 border border-black p-6">
            <p className="text-sm font-medium">
              This is for <strong>research and educational purposes only</strong>. Peptides are research chemicals
              not approved by the FDA. Always consult a licensed physician.
            </p>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={onReset}
              className="px-8 py-4 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Generate a new protocol
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
