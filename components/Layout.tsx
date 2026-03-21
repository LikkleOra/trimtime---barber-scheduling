
import React, { useState } from 'react';
import { Home, Calendar, ShoppingBag, User, Menu, X, Landmark, Zap } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbd600] text-black relative">
      {/* Top Branding Bar */}
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 bg-[#fbd600] z-50">
        <button className="p-2">
            <Menu size={32} strokeWidth={3} />
        </button>
        
        <h1 className="text-4xl font-brand italic tracking-tighter uppercase leading-none text-black">
            FADEZONE
        </h1>

        <button onClick={() => onViewChange('staff')} className="p-2">
            <User size={32} strokeWidth={3} />
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 pb-24 relative overflow-x-hidden">
        {children}
      </main>

      {/* Chunky Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#fbd600] border-t-[6px] border-black px-8 py-6 flex justify-between items-center z-50">
        <button 
            onClick={() => onViewChange('home')}
            className={`flex flex-col items-center gap-2 transition-all ${activeView === 'home' ? 'scale-110' : 'opacity-40'}`}
        >
            <div className={`p-2 ${activeView === 'home' ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-transparent text-black'}`}>
                <Landmark size={32} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-brand italic uppercase tracking-widest leading-none">Home</span>
        </button>

        <button 
            onClick={() => onViewChange('bookings')}
            className={`flex flex-col items-center gap-2 transition-all ${activeView === 'bookings' ? 'scale-110' : 'opacity-40'}`}
        >
            <div className={`p-2 ${activeView === 'bookings' ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-transparent text-black'}`}>
                <Calendar size={32} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-brand italic uppercase tracking-widest leading-none">Bookings</span>
        </button>

        <button 
            onClick={() => onViewChange('store')}
            className={`flex flex-col items-center gap-2 transition-all ${activeView === 'store' ? 'scale-110' : 'opacity-40'}`}
        >
            <div className={`p-2 ${activeView === 'store' ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-transparent text-black'}`}>
                <ShoppingBag size={32} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-brand italic uppercase tracking-widest leading-none">Store</span>
        </button>

        <button 
            onClick={() => onViewChange('profile')}
            className={`flex flex-col items-center gap-2 transition-all ${activeView === 'profile' ? 'scale-110' : 'opacity-40'}`}
        >
            <div className={`p-2 ${activeView === 'profile' ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-transparent text-black'}`}>
                <Zap size={32} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-brand italic uppercase tracking-widest leading-none">Profile</span>
        </button>
      </nav>

    </div>
  );
};

export default Layout;
