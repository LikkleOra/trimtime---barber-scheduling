
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
      <nav className="fixed bottom-0 left-0 right-0 bg-[#fbd600] border-t-4 border-black px-6 py-4 flex justify-between items-center z-50">
        <button 
            onClick={() => onViewChange('home')}
            className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${activeView === 'home' ? 'text-black' : 'text-black/40'}`}
        >
            <div className={`p-1 ${activeView === 'home' ? 'bg-black text-white rounded-lg' : ''}`}>
                <Landmark size={28} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>

        <button 
            onClick={() => onViewChange('bookings')}
            className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${activeView === 'bookings' ? 'text-black' : 'text-black/40'}`}
        >
            <div className={`p-1 ${activeView === 'bookings' ? 'bg-black text-white rounded-lg' : ''}`}>
                <Calendar size={28} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Bookings</span>
        </button>

        <button 
            onClick={() => onViewChange('store')}
            className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${activeView === 'store' ? 'text-black' : 'text-black/40'}`}
        >
            <div className={`p-1 ${activeView === 'store' ? 'bg-black text-white rounded-lg' : ''}`}>
                <ShoppingBag size={28} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Store</span>
        </button>

        <button 
            onClick={() => onViewChange('profile')}
            className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${activeView === 'profile' ? 'text-black' : 'text-black/40'}`}
        >
            <div className={`p-1 ${activeView === 'profile' ? 'bg-black text-white rounded-lg' : ''}`}>
                <Zap size={28} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
