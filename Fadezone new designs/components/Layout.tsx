
import React from 'react';
import { Scissors, Calendar, User, Info, MessageSquare, Instagram, Menu } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
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
          <button className="text-[10px] font-black uppercase tracking-widest text-[#b32b2b] hover:text-black">About Nev</button>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-black">Pricing</button>
          <button onClick={() => onViewChange('customer')} className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-black">Bookings</button>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-black">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => onViewChange('barber')} className="w-10 h-10 border-2 border-[#3e2723] rounded-full flex items-center justify-center hover:bg-[#3e2723] hover:text-white transition-all">
            <User size={18} />
          </button>
          <button className="md:hidden w-10 h-10 flex items-center justify-center">
            <Menu size={24} />
          </button>
        </div>
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
