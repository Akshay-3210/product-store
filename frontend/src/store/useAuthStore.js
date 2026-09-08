import { create } from 'zustand';
import axios from 'axios';

// NEXT_PUBLIC_BASE_URL is the existing local configuration name. Keep
// NEXT_PUBLIC_API_URL as an alias so deployments can use either name.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || '';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Initialize store from localStorage on the client side
  initAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        set({ token, isAuthenticated: true });
      }
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      const { token, user } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      set({ user, token, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed'
      };
    }
  },

  signup: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, { email, password });
      const { token, user } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      set({ user, token, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Signup failed'
      };
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
