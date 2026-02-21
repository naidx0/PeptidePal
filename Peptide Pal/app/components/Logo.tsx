import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-1 ${className}`}>
      <span className="text-2xl font-bold tracking-tighter text-black uppercase">
        Peptide<span className="font-light italic font-serif">Pal</span>
      </span>
      <div className="w-2 h-2 rounded-full bg-black ml-1 animate-pulse" />
    </Link>
  )
}
