
import React, { useState } from 'react';
import { Scissors, Calendar, User, Info, MessageSquare, Instagram, Menu, X } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbd600] text-black relative overflow-x-hidden">
      {/* Dynamic Responsive Navigation Bar */}
      <header className="px-6 md:px-20 py-8 flex justify-between items-center sticky top-0 bg-[#fbd600]/90 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-12 h-12 bg-[#3e2723] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <span className="text-white font-brand text-2xl italic">N</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-brand italic tracking-tight uppercase leading-none">NEV THE BARBER</h1>
            <p className="text-[8px] text-zinc-600 font-black tracking-[0.4em] uppercase">Legendary Grooming</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <button onClick={() => onViewChange('customer')} className="text-[10px] font-black uppercase tracking-widest text-[#b32b2b] hover:text-black">Home</button>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-black">About</button>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-black">Pricing</button>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-black">Contact</button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => onViewChange('barber')} className="px-6 py-2 bg-[#3e2723] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
            <User size={14} /> Staff Login
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-10 h-10 flex items-center justify-center z-50 relative">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#fbd600] border-t border-black/10 shadow-2xl p-6 flex flex-col gap-6 md:hidden z-40">
            <button onClick={() => { onViewChange('customer'); setIsMobileMenuOpen(false); }} className="text-left text-sm font-black uppercase tracking-widest text-[#b32b2b]">Home</button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-left text-sm font-black uppercase tracking-widest text-[#3e2723]">About</button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-left text-sm font-black uppercase tracking-widest text-[#3e2723]">Pricing</button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-left text-sm font-black uppercase tracking-widest text-[#3e2723]">Contact</button>
            <hr className="border-black/10" />
            <button onClick={() => { onViewChange('barber'); setIsMobileMenuOpen(false); }} className="px-6 py-3 bg-[#3e2723] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <User size={16} /> Staff Login
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      {/* Footer / Mobile Nav */}
      <footer className="bg-[#3e2723] text-[#fbd600] py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-brand italic uppercase">Vibe The Vibe</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-2">Durban's Finest Grooming Establishment</p>
          </div>
          <div className="flex gap-6">
            <Instagram size={20} className="hover:scale-125 transition-transform cursor-pointer" />
            <MessageSquare size={20} className="hover:scale-125 transition-transform cursor-pointer" />
          </div>
          <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">© 2024 Nev the Barber. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
