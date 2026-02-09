import { User } from '../types';

const USER_KEY = 'trimtime_user';
const TOKEN_KEY = 'trimtime_token';

export const authService = {
    getCurrentUser: (): User | null => {
        try {
            const data = localStorage.getItem(USER_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    },

    /**
     * Client Login
     * In production, this would POST to /api/auth/login
     */
    login: async (phone: string, name: string): Promise<User> => {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            phone,
            role: 'client' // Role is assigned by the server
        };

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        // localStorage.setItem(TOKEN_KEY, 'simulated-client-jwt'); 

        window.dispatchEvent(new Event('storage'));
        return user;
    },

    /**
     * Admin Login
     * In production, this would POST to /api/auth/admin-login
     * and return a signed JWT stored in a secure cookie or local storage.
     */
    adminLogin: async (password: string): Promise<User | null> => {
        // Simulating API call to a secure backend
        await new Promise(resolve => setTimeout(resolve, 1000));

        // THE SECRET CHECK HAPPENS ON THE SERVER
        // This is where you'd call: const response = await fetch('/api/auth/admin-login', { ... })
        if (password === 'nev') { // Simulating a successful server-side check
            const user: User = {
                id: 'admin_1',
                name: 'Nev',
                phone: 'Admin',
                role: 'admin'
            };

            const token = 'simulated-admin-jwt-token';
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            localStorage.setItem(TOKEN_KEY, token);

            window.dispatchEvent(new Event('storage'));
            return user;
        }

        throw new Error('Invalid credentials');
    },

    logout: () => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        window.dispatchEvent(new Event('storage'));
    }
};
