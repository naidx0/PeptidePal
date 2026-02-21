import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-[#Fdfcf8] text-black border-t border-black">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black">
        <div className="p-12 flex flex-col justify-between min-h-[300px]">
          <Logo />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-8">
            Los Angeles, CA <br />
            Est. 2024
          </p>
        </div>

        <div className="p-12 flex flex-col gap-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Shop</h4>
          <Link href="/intake" className="text-sm font-bold uppercase hover:underline">
            Peptides
          </Link>
          <Link href="/intake" className="text-sm font-bold uppercase hover:underline">
            Protocols
          </Link>
          <Link href="/intake" className="text-sm font-bold uppercase hover:underline">
            Bundles
          </Link>
          <Link href="/intake" className="text-sm font-bold uppercase hover:underline">
            New Arrivals
          </Link>
        </div>

        <div className="p-12 flex flex-col gap-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Support</h4>
          <Link href="#" className="text-sm font-bold uppercase hover:underline">
            FAQ
          </Link>
          <Link href="#" className="text-sm font-bold uppercase hover:underline">
            Contact
          </Link>
          <Link href="#" className="text-sm font-bold uppercase hover:underline">
            Shipping
          </Link>
          <Link href="#" className="text-sm font-bold uppercase hover:underline">
            Returns
          </Link>
        </div>

        <div className="p-12 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Newsletter</h4>
            <p className="text-sm font-medium mb-6">Join the optimization movement.</p>
          </div>

          <div className="flex border-b border-black pb-2">
            <input
              type="email"
              placeholder="ENTER EMAIL"
              className="w-full bg-transparent text-sm font-bold uppercase placeholder:text-gray-400 focus:outline-none"
            />
            <button className="text-sm font-bold uppercase hover:text-gray-500">→</button>
          </div>
        </div>
      </div>

      <div className="border-t border-black p-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <span>© {new Date().getFullYear()} Peptide Pal Inc.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-black">
            Privacy
          </Link>
          <Link href="#" className="hover:text-black">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
