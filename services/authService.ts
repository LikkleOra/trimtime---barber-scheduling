import { User } from '../types';

const USER_KEY = 'trimtime_user';
const ADMIN_PASSWORD = 'nev'; // Simple for demo, in production use real auth

export const authService = {
    getCurrentUser: (): User | null => {
        const data = localStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    },

    login: (phone: string, name: string): User => {
        // Check if it's the admin
        let role: 'client' | 'admin' = 'client';
        if (phone === '0000' && name.toLowerCase() === 'admin') {
            role = 'admin';
        }

        const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            phone,
            role
        };

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
        return user;
    },

    adminLogin: (password: string): User | null => {
        if (password === ADMIN_PASSWORD) {
            const user: User = {
                id: 'admin',
                name: 'Nev',
                phone: 'Admin',
                role: 'admin'
            };
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            window.dispatchEvent(new Event('storage'));
            return user;
        }
        return null;
    },

    logout: () => {
        localStorage.removeItem(USER_KEY);
        window.dispatchEvent(new Event('storage'));
    }
};
