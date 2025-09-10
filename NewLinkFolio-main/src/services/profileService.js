import api from './api';

// Profile management service
export const profileService = {
  // Get user profile
  async getProfile(userId = null) {
    try {
      const endpoint = userId ? `/profile/${userId}` : '/profile/me';
      return await api.get(endpoint);
    } catch (error) {
      throw new Error(`Failed to get profile: ${error.message}`);
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      return await api.put('/profile/me', profileData);
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  },

  // Upload profile picture
  async uploadProfilePicture(file) {
    try {
      return await api.uploadFile('/profile/picture', file);
    } catch (error) {
      throw new Error(`Failed to upload picture: ${error.message}`);
    }
  },

  // Delete profile picture
  async deleteProfilePicture() {
    try {
      return await api.delete('/profile/picture');
    } catch (error) {
      throw new Error(`Failed to delete picture: ${error.message}`);
    }
  },

  // Get profile statistics
  async getProfileStats() {
    try {
      return await api.get('/profile/stats');
    } catch (error) {
      throw new Error(`Failed to get profile stats: ${error.message}`);
    }
  },

  // Search profiles
  async searchProfiles(searchParams) {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      return await api.get(`/profile/search?${queryString}`);
    } catch (error) {
      throw new Error(`Failed to search profiles: ${error.message}`);
    }
  }
};
