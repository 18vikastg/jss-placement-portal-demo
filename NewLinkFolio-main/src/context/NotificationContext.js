import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import { notificationStorage } from '../utils/storage';

// Notification context
const NotificationContext = createContext();

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOAD_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        notifications: action.payload,
        error: null,
      };
    case 'LOAD_NOTIFICATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0,
      };
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case 'UPDATE_UNREAD_COUNT':
      return {
        ...state,
        unreadCount: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load notifications from storage on mount
  useEffect(() => {
    const loadNotificationsFromStorage = () => {
      const storedNotifications = notificationStorage.get();
      if (storedNotifications) {
        dispatch({
          type: 'LOAD_NOTIFICATIONS_SUCCESS',
          payload: storedNotifications,
        });
      }
    };

    loadNotificationsFromStorage();
  }, []);

  // Load notifications from API
  const loadNotifications = async (page = 1, limit = 20) => {
    dispatch({ type: 'LOAD_NOTIFICATIONS_START' });
    try {
      const response = await notificationService.getNotifications(page, limit);
      dispatch({
        type: 'LOAD_NOTIFICATIONS_SUCCESS',
        payload: response.notifications,
      });
      notificationStorage.save(response.notifications);
      return response;
    } catch (error) {
      dispatch({
        type: 'LOAD_NOTIFICATIONS_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  // Add notification
  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: notification,
    });
    notificationStorage.add(notification);
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      dispatch({
        type: 'MARK_AS_READ',
        payload: notificationId,
      });
      notificationStorage.markAsRead(notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      dispatch({ type: 'MARK_ALL_AS_READ' });
      const notifications = state.notifications.map(notification => ({
        ...notification,
        read: true,
      }));
      notificationStorage.save(notifications);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      dispatch({
        type: 'DELETE_NOTIFICATION',
        payload: notificationId,
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Get unread count
  const getUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      dispatch({
        type: 'UPDATE_UNREAD_COUNT',
        payload: response.count,
      });
      return response.count;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  };

  // Update notification settings
  const updateSettings = async (settings) => {
    try {
      return await notificationService.updateNotificationSettings(settings);
    } catch (error) {
      throw error;
    }
  };

  // Get notification settings
  const getSettings = async () => {
    try {
      return await notificationService.getNotificationSettings();
    } catch (error) {
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    loadNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    updateSettings,
    getSettings,
    clearError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
