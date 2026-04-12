import { apiClient } from '../api/client';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const params = new URLSearchParams();
    params.append('username', credentials.email);
    params.append('password', credentials.password);

    const response = await apiClient.post<{ access_token: string, token_type: string }>('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }

    const user = await this.getCurrentUser();
    return { ...response.data, user };
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<{ access_token: string, token_type: string }>('/auth/register', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }

    const user = await this.getCurrentUser();
    return { ...response.data, user };
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  }
};
