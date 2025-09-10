import api from './api';

// Messaging service
export const messagingService = {
  // Get message threads
  async getMessageThreads() {
    try {
      return await api.get('/messages/threads');
    } catch (error) {
      throw new Error(`Failed to get message threads: ${error.message}`);
    }
  },

  // Get messages in a thread
  async getMessages(threadId, page = 1, limit = 50) {
    try {
      return await api.get(`/messages/threads/${threadId}?page=${page}&limit=${limit}`);
    } catch (error) {
      throw new Error(`Failed to get messages: ${error.message}`);
    }
  },

  // Send message
  async sendMessage(threadId, message, type = 'text') {
    try {
      return await api.post(`/messages/threads/${threadId}`, {
        content: message,
        type: type
      });
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  },

  // Create new thread
  async createThread(participantId, initialMessage = '') {
    try {
      return await api.post('/messages/threads', {
        participantId,
        initialMessage
      });
    } catch (error) {
      throw new Error(`Failed to create thread: ${error.message}`);
    }
  },

  // Mark messages as read
  async markAsRead(threadId, messageIds = []) {
    try {
      return await api.put(`/messages/threads/${threadId}/read`, {
        messageIds
      });
    } catch (error) {
      throw new Error(`Failed to mark messages as read: ${error.message}`);
    }
  },

  // Delete message
  async deleteMessage(messageId) {
    try {
      return await api.delete(`/messages/${messageId}`);
    } catch (error) {
      throw new Error(`Failed to delete message: ${error.message}`);
    }
  },

  // Delete thread
  async deleteThread(threadId) {
    try {
      return await api.delete(`/messages/threads/${threadId}`);
    } catch (error) {
      throw new Error(`Failed to delete thread: ${error.message}`);
    }
  },

  // Upload file in message
  async uploadFile(threadId, file) {
    try {
      return await api.uploadFile(`/messages/threads/${threadId}/upload`, file);
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  },

  // Get unread count
  async getUnreadCount() {
    try {
      return await api.get('/messages/unread-count');
    } catch (error) {
      throw new Error(`Failed to get unread count: ${error.message}`);
    }
  }
};
