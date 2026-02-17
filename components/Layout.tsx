
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
    <div className="min-h-screen flex flex-col bg-[#fbd600] text-black relative overflow-x-hidden selection:bg-black selection:text-[#fbd600]">
      {/* Redesigned Navbar */}
      <header className="px-6 md:px-12 py-5 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#fbd600]/90 border-b border-black/5">

        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { onViewChange('customer'); onGoToSection('hero-section'); }}>
          <div className="w-10 h-10 bg-black flex items-center justify-center -skew-x-12 shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-[#fbd600] font-black italic text-sm skew-x-12">FZ</span>
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none skew-x-[-10deg]">FADEZONE-Grooming</h1>
          </div>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          <button onClick={() => handleNavClick('about-section')} className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-[#b32b2b] transition-colors">About</button>
          <button onClick={() => handleNavClick('prices-section')} className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-[#b32b2b] transition-colors">Pricing</button>
          <button onClick={() => handleNavClick('contact-section')} className="text-xs font-black uppercase tracking-[0.2em] text-black hover:text-[#b32b2b] transition-colors">Contact</button>
        </nav>

        {/* User Icon & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('barber')}
            className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-[#fbd600] transition-all"
          >
            <User size={20} />
          </button>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-[#fbd600] z-40 flex flex-col items-center justify-start pt-12 gap-10 md:hidden">
          <button onClick={() => handleNavClick('about-section')} className="text-2xl font-black uppercase tracking-tighter italic text-black">About</button>
          <button onClick={() => handleNavClick('prices-section')} className="text-2xl font-black uppercase tracking-tighter italic text-black">Pricing</button>
          <button onClick={() => handleNavClick('contact-section')} className="text-2xl font-black uppercase tracking-tighter italic text-black">Contact</button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-[#fbd600] py-12 px-6 text-center border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl font-brand italic uppercase tracking-tighter">FADEZONE</h2>
          <div className="flex gap-8">
            <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
            <MessageSquare size={20} className="hover:text-white transition-colors cursor-pointer" />
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-50">© 2024 Fadezone Grooming. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
