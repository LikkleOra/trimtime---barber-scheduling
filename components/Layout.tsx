
import React, { useState } from 'react';
import { Home, Calendar, User, Menu, X, Landmark, Zap, MapPin, Info } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen bg-black text-black selection:bg-black selection:text-[#FFD700]">
      <div className="desktop-center flex flex-col relative pb-[70px]">
        {/* Compressed Header */}
        <header className="px-6 h-[64px] flex justify-between items-center sticky top-0 bg-[#FFD700] z-50 border-b-4 border-black">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center transform rotate-3 shadow-solid-4px">
                <Zap size={20} className="text-[#FFD700]" strokeWidth={3} />
             </div>
             <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none text-black">
                FADEZONE
             </h1>
          </div>

          <button onClick={() => onViewChange('staff')} className="p-2 active:scale-95 transition-transform">
              <User size={28} strokeWidth={3} className="text-black" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden bg-[#F2F2F2]">
          {children}
        </main>

        {/* Compact Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] h-[72px] bg-[#FFD700] border-t-4 border-black px-2 flex justify-between items-center z-[100]">
          {[
            { id: 'home', icon: Landmark, label: 'Home' },
            { id: 'bookings', icon: Calendar, label: 'Book' },
            { id: 'about', icon: Info, label: 'About' },
            { id: 'contacts', icon: MapPin, label: 'Reach' },
            { id: 'profile', icon: Zap, label: 'Me' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`flex flex-col items-center gap-0.5 transition-all ${activeView === item.id ? 'opacity-100 scale-105' : 'opacity-60'}`}
            >
              <div className="p-1 flex items-center justify-center">
                <item.icon size={24} strokeWidth={3} className="text-black" />
              </div>
              <span className="text-[9px] font-black italic uppercase tracking-tighter text-black">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
};

export default Layout;

