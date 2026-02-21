import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Shop All', href: '#shop' },
    { name: 'Protocols', href: '#protocols' },
    { name: 'Science', href: '#science' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#Fdfcf8] border-b border-black/5">
      
      {/* Top Banner */}
      <div className="bg-black text-white text-[10px] font-bold tracking-widest text-center py-2 uppercase">
        Free Shipping on all domestic orders over $150
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-50 bg-[#Fdfcf8]">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-black hover:opacity-50 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button className="text-xs font-bold uppercase tracking-widest text-black hover:opacity-50">
              Account
            </button>
            <button className="flex items-center gap-2 hover:opacity-50 transition-opacity">
               <span className="text-xs font-bold uppercase tracking-widest">Cart</span>
               <div className="relative">
                 <ShoppingBag className="w-5 h-5" />
                 <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-black text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">0</span>
               </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-6">
            <button className="flex items-center gap-2">
               <ShoppingBag className="w-5 h-5" />
               <span className="text-[10px] font-bold bg-black text-white rounded-full w-3.5 h-3.5 flex items-center justify-center -ml-2 -mt-2">0</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gray-600 p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[100px] z-40 bg-[#Fdfcf8] px-6 py-12 flex flex-col items-center text-center space-y-8 h-[calc(100vh-100px)] border-t border-black/5"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-3xl font-black uppercase tracking-tighter text-black hover:text-gray-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-8 border-t border-black/10 w-full">
              <button className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800">
                Log In / Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
