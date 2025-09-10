import api from './api';

// Notification service
export const notificationService = {
  // Get notifications
  async getNotifications(page = 1, limit = 20) {
    try {
      return await api.get(`/notifications?page=${page}&limit=${limit}`);
    } catch (error) {
      throw new Error(`Failed to get notifications: ${error.message}`);
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      return await api.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  },

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      return await api.put('/notifications/mark-all-read');
    } catch (error) {
      throw new Error(`Failed to mark all notifications as read: ${error.message}`);
    }
  },

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      return await api.delete(`/notifications/${notificationId}`);
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  },

  // Get notification settings
  async getNotificationSettings() {
    try {
      return await api.get('/notifications/settings');
    } catch (error) {
      throw new Error(`Failed to get notification settings: ${error.message}`);
    }
  },

  // Update notification settings
  async updateNotificationSettings(settings) {
    try {
      return await api.put('/notifications/settings', settings);
    } catch (error) {
      throw new Error(`Failed to update notification settings: ${error.message}`);
    }
  },

  // Get unread count
  async getUnreadCount() {
    try {
      return await api.get('/notifications/unread-count');
    } catch (error) {
      throw new Error(`Failed to get unread count: ${error.message}`);
    }
  },

  // Subscribe to push notifications
  async subscribeToPushNotifications(subscription) {
    try {
      return await api.post('/notifications/push/subscribe', subscription);
    } catch (error) {
      throw new Error(`Failed to subscribe to push notifications: ${error.message}`);
    }
  },

  // Unsubscribe from push notifications
  async unsubscribeFromPushNotifications() {
    try {
      return await api.delete('/notifications/push/subscribe');
    } catch (error) {
      throw new Error(`Failed to unsubscribe from push notifications: ${error.message}`);
    }
  }
};
