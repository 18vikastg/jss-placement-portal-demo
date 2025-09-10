import api from './api';

// Authentication service
export const authService = {
  // User signup
  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response.token) {
        api.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  },

  // User login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.token) {
        api.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  // User logout
  async logout() {
    try {
      await api.post('/auth/logout');
      api.clearToken();
      return { success: true };
    } catch (error) {
      api.clearToken(); // Clear token even if API call fails
      throw new Error(`Logout failed: ${error.message}`);
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await api.get('/auth/me');
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  },

  // Refresh token
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      if (response.token) {
        api.setToken(response.token);
      }
      return response;
    } catch (error) {
      api.clearToken();
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!api.token;
  }
};
