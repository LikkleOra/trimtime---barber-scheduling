
import React from 'react';
import { WORKING_HOURS } from '../constants';
import { Booking } from '../types';

interface TimeGridProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  bookings: Booking[];
}

const TimeGrid: React.FC<TimeGridProps> = ({ selectedDate, selectedTime, onTimeSelect, bookings }) => {
  const generateSlots = () => {
    const slots: string[] = [];
    const { start, end, interval } = WORKING_HOURS;
    for (let hour = start; hour < end; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  };

  const slots = generateSlots();
  const dateStr = selectedDate.toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
      {slots.map((time) => {
        const isOccupied = bookings.some(b => b.date === dateStr && b.time === time);
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            disabled={isOccupied}
            onClick={() => onTimeSelect(time)}
            className={`
              py-4 px-2 min-h-[48px] rounded-lg border-2 text-xs font-black transition-all uppercase tracking-widest
              ${isOccupied
                ? 'bg-zinc-100 border-zinc-100 text-zinc-300 cursor-not-allowed line-through opacity-50'
                : isSelected
                  ? 'bg-[#fbd600] border-[#fbd600] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-105 z-10 transform -translate-y-1'
                  : 'bg-black border-black text-white hover:bg-zinc-900 hover:border-zinc-800 hover:-translate-y-1 hover:shadow-lg'}
            `}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
};

export default TimeGrid;
