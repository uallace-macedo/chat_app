import { create } from 'zustand';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await api.get('/auth/check');
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.log('ERRO [store/useAuthStore]: checkAuth_func = ' + error.message);
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({isSigningUp: true});
    try {
      const res = await api.post('/auth/signup', data);
      toast.success('Conta criada com sucesso!');
      set({ authUser: res.data });
    } catch (error) {
      console.log('ERRO [store/useAuthStore]: signup_func = ' + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ authUser: null });
      toast.success('Deslogou com sucesso!');
    } catch (error) {
      console.log('ERRO [store/useAuthStore]: logout_func = ' + error.message);
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post('/auth/login', data);
      toast.success('Login efetuado com sucesso!');
      set({ authUser: res.data });
    } catch (error) {
      console.log('ERRO [store/useAuthStore]: login_func = ' + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  }
}));