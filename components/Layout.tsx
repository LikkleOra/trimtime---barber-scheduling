
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
    <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A] selection:bg-[#8B1E3F] selection:text-white">
      <div className="desktop-center flex flex-col relative pb-[90px]">
        {/* Top Branding Bar */}
        <header className="px-6 h-[80px] flex justify-between items-center sticky top-0 bg-[#F5F5F5] z-50 border-b border-black/5">
          <button className="p-2 active:scale-95 transition-transform">
              <Menu size={28} strokeWidth={2} className="text-black" />
          </button>
          
          <h1 className="text-2xl font-display uppercase tracking-[0.2em] leading-none text-black">
              FADEZONE
          </h1>

          <button onClick={() => onViewChange('staff')} className="p-2 active:scale-95 transition-transform">
              <User size={28} strokeWidth={2} className="text-black" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden">
          {children}
        </main>

        {/* Premium Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[75px] bg-[#1A1A1A] border-t border-[#2D2D2D] px-8 flex justify-between items-center z-[100]">
          {[
            { id: 'home', icon: Landmark, label: 'Home' },
            { id: 'bookings', icon: Calendar, label: 'Book' },
            { id: 'store', icon: ShoppingBag, label: 'Store' },
            { id: 'profile', icon: Zap, label: 'Fades' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`flex flex-col items-center gap-1 transition-all ${activeView === item.id ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className={`p-2 transition-all duration-200 flex items-center justify-center ${activeView === item.id ? 'text-[#D4A84B]' : 'text-[#6B7280]'}`}>
                <item.icon size={26} strokeWidth={2.5} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${activeView === item.id ? 'text-[#D4A84B]' : 'text-[#6B7280]'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>


      </div>
    </div>
  );
};


export default Layout;
