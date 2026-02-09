
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'client' | 'admin';
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export type ViewType = 'client' | 'admin';
