import axios from 'axios';
import { User } from '@/contexts/UserContext';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userService = {
  async fetchUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  async fetchUserById(id: number): Promise<User> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },
};