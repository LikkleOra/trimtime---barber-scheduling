
import React from 'react';

interface TornEdgeProps {
  position?: 'top' | 'bottom';
  color?: string;
}

const TornEdge: React.FC<TornEdgeProps> = ({ position = 'top', color = 'white' }) => (
  <svg 
    className={`absolute left-[-4px] right-[-4px] w-[calc(100%+8px)] h-4 z-20 ${position === 'top' ? 'top-[-12px]' : 'bottom-[-12px] rotate-180'}`}
    viewBox="0 0 100 10" 
    preserveAspectRatio="none"
  >
    <polygon points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill={color} />
    <polyline points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" fill="none" stroke="black" strokeWidth="2" />
  </svg>
);

export default TornEdge;
