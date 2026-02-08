
import { Booking } from '../types';

const STORAGE_KEY = 'trimtime_bookings';

export const bookingService = {
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addBooking: (booking: Booking): void => {
    const bookings = bookingService.getBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    // Dispatch custom event for real-time simulation in same browser
    window.dispatchEvent(new Event('storage'));
  },

  updateBookingStatus: (id: string, status: 'confirmed' | 'cancelled'): void => {
    const bookings = bookingService.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      window.dispatchEvent(new Event('storage'));
    }
  },

  getReviews: (): any[] => {
    const data = localStorage.getItem('trimtime_reviews');
    return data ? JSON.parse(data) : [];
  },

  addReview: (review: any): void => {
    const reviews = bookingService.getReviews();
    reviews.push(review);
    localStorage.setItem('trimtime_reviews', JSON.stringify(reviews));
    window.dispatchEvent(new Event('storage'));
  },

  deleteBooking: (id: string): void => {
    const bookings = bookingService.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  }
};
