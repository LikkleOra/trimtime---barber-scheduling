
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
    <div className="min-h-screen bg-[#FFD700] text-black selection:bg-black selection:text-[#FFD700]">
      <div className="desktop-center flex flex-col relative pb-[90px]">
        {/* Top Branding Bar */}
        <header className="px-6 h-[80px] flex justify-between items-center sticky top-0 bg-[#FFD700] z-50 border-b-4 border-black border-t-4 mt-4">
          <button className="p-2 active:scale-95 transition-transform">
              <Menu size={32} strokeWidth={4} />
          </button>
          
          <h1 className="text-3xl text-aggressive leading-none">
              FADEZONE
          </h1>

          <button onClick={() => onViewChange('staff')} className="p-2 active:scale-95 transition-transform">
              <User size={32} strokeWidth={4} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden">
          {children}
        </main>

        {/* Extra-Tall Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[90px] bg-black border-t-4 border-black px-8 flex justify-between items-center z-[100]">
          {[
            { id: 'home', icon: Landmark, label: 'Home' },
            { id: 'bookings', icon: Calendar, label: 'Book' },
            { id: 'store', icon: ShoppingBag, label: 'Store' },
            { id: 'profile', icon: Zap, label: 'Fades' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`flex flex-col items-center gap-1 transition-all ${activeView === item.id ? 'scale-110' : 'opacity-60'}`}
            >
              <div className={`p-2 transition-all duration-200 flex items-center justify-center ${activeView === item.id ? 'bg-[#FF0000] text-black border-2 border-black -skew-x-12' : 'text-[#FFD700]'}`}>
                <item.icon size={28} strokeWidth={3} className={activeView === item.id ? 'skew-x-12' : ''} />
              </div>
              <span className={`text-[10px] font-brand italic uppercase tracking-wider ${activeView === item.id ? 'text-[#FFD700]' : 'text-[#FFD700]/60'}`}>
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
