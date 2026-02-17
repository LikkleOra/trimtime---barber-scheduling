
import React, { useState } from 'react';
import { Scissors, Calendar, User, Info, MessageSquare, Instagram, Menu, X } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  currentStep: number;
  onGoToSection: (sectionId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, currentStep, onGoToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onGoToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbd600] text-black relative overflow-x-hidden">
      {/* Dynamic Responsive Navigation Bar */}
      <header className="px-4 md:px-20 py-4 md:py-8 flex justify-between items-center sticky top-0 bg-[#fbd600]/90 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onClick={() => { onViewChange('customer'); onGoToSection('hero-section'); }}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3e2723] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white font-brand text-xl md:text-2xl italic">F</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg md:text-xl font-brand italic tracking-tight uppercase leading-none">FADEZONE-Grooming</h1>
            <p className="text-[8px] text-zinc-600 font-black tracking-[0.4em] uppercase">Premium Grooming</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <button onClick={() => handleNavClick('about-section')} className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-[#b32b2b] transition-colors">About</button>
          <button onClick={() => handleNavClick('prices-section')} className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-[#b32b2b] transition-colors">Pricing</button>
          <button onClick={() => handleNavClick('contact-section')} className="text-[10px] font-black uppercase tracking-widest text-[#3e2723] hover:text-[#b32b2b] transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={() => onViewChange('barber')} className="w-9 h-9 md:w-10 md:h-10 border-2 border-[#3e2723] rounded-full flex items-center justify-center hover:bg-[#3e2723] hover:text-white transition-all">
            <User size={16} />
          </button>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#fbd600]/98 backdrop-blur-xl z-40 flex flex-col items-center justify-start pt-16 gap-8 md:hidden">
          <button onClick={() => handleNavClick('about-section')} className="text-lg font-black uppercase tracking-widest text-[#3e2723] hover:text-[#b32b2b] transition-colors">About</button>
          <button onClick={() => handleNavClick('prices-section')} className="text-lg font-black uppercase tracking-widest text-[#3e2723] hover:text-[#b32b2b] transition-colors">Pricing</button>
          <button onClick={() => handleNavClick('contact-section')} className="text-lg font-black uppercase tracking-widest text-[#3e2723] hover:text-[#b32b2b] transition-colors">Contact</button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#3e2723] text-[#fbd600] py-8 md:py-12 px-4 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-brand italic uppercase">Vibe The Vibe</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-2">Johannesburg's Finest Grooming Establishment</p>
          </div>
          <div className="flex gap-6">
            <Instagram size={20} className="hover:scale-125 transition-transform cursor-pointer" />
            <MessageSquare size={20} className="hover:scale-125 transition-transform cursor-pointer" />
          </div>
          <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">© 2024 Fadezone Grooming. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
