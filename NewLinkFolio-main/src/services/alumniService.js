import api from './api';

// Alumni network service
export const alumniService = {
  // Get alumni directory
  async getAlumniDirectory(filters = {}) {
    try {
      const queryString = new URLSearchParams(filters).toString();
      return await api.get(`/alumni/directory?${queryString}`);
    } catch (error) {
      throw new Error(`Failed to get alumni directory: ${error.message}`);
    }
  },

  // Search alumni
  async searchAlumni(searchQuery, filters = {}) {
    try {
      const params = { q: searchQuery, ...filters };
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/alumni/search?${queryString}`);
    } catch (error) {
      throw new Error(`Failed to search alumni: ${error.message}`);
    }
  },

  // Get alumni profile
  async getAlumniProfile(alumniId) {
    try {
      return await api.get(`/alumni/${alumniId}`);
    } catch (error) {
      throw new Error(`Failed to get alumni profile: ${error.message}`);
    }
  },

  // Send connection request
  async sendConnectionRequest(alumniId, message = '') {
    try {
      return await api.post(`/alumni/${alumniId}/connect`, { message });
    } catch (error) {
      throw new Error(`Failed to send connection request: ${error.message}`);
    }
  },

  // Accept connection request
  async acceptConnectionRequest(requestId) {
    try {
      return await api.post(`/alumni/connections/${requestId}/accept`);
    } catch (error) {
      throw new Error(`Failed to accept connection request: ${error.message}`);
    }
  },

  // Reject connection request
  async rejectConnectionRequest(requestId) {
    try {
      return await api.post(`/alumni/connections/${requestId}/reject`);
    } catch (error) {
      throw new Error(`Failed to reject connection request: ${error.message}`);
    }
  },

  // Get connections
  async getConnections() {
    try {
      return await api.get('/alumni/connections');
    } catch (error) {
      throw new Error(`Failed to get connections: ${error.message}`);
    }
  },

  // Get connection requests
  async getConnectionRequests() {
    try {
      return await api.get('/alumni/connection-requests');
    } catch (error) {
      throw new Error(`Failed to get connection requests: ${error.message}`);
    }
  },

  // Remove connection
  async removeConnection(alumniId) {
    try {
      return await api.delete(`/alumni/connections/${alumniId}`);
    } catch (error) {
      throw new Error(`Failed to remove connection: ${error.message}`);
    }
  }
};
