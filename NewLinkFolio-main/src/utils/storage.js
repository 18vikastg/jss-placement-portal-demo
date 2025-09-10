// Local storage utilities

// Set item in localStorage
export const setStorageItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error('Error setting localStorage item:', error);
    return false;
  }
};

// Get item from localStorage
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue;
  }
};

// Remove item from localStorage
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing localStorage item:', error);
    return false;
  }
};

// Clear all localStorage
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Check if localStorage is available
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PROFILE: 'userProfile',
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications',
  MESSAGES: 'messages',
  ALUMNI_CONNECTIONS: 'alumniConnections',
  PROFILE_SETUP: 'profileSetup',
  LINKFOLIO_PROFILE: 'linkfolioProfile', // For app.html compatibility
};

// Profile storage functions
export const profileStorage = {
  save: (profile) => setStorageItem(STORAGE_KEYS.USER_PROFILE, profile),
  get: () => getStorageItem(STORAGE_KEYS.USER_PROFILE),
  remove: () => removeStorageItem(STORAGE_KEYS.USER_PROFILE),
  update: (updates) => {
    const currentProfile = profileStorage.get();
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...updates };
      return profileStorage.save(updatedProfile);
    }
    return false;
  }
};

// Auth storage functions
export const authStorage = {
  saveToken: (token) => setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token),
  getToken: () => getStorageItem(STORAGE_KEYS.AUTH_TOKEN),
  removeToken: () => removeStorageItem(STORAGE_KEYS.AUTH_TOKEN),
  isAuthenticated: () => !!authStorage.getToken()
};

// Theme storage functions
export const themeStorage = {
  save: (theme) => setStorageItem(STORAGE_KEYS.THEME, theme),
  get: () => getStorageItem(STORAGE_KEYS.THEME, 'light'),
  remove: () => removeStorageItem(STORAGE_KEYS.THEME)
};

// Language storage functions
export const languageStorage = {
  save: (language) => setStorageItem(STORAGE_KEYS.LANGUAGE, language),
  get: () => getStorageItem(STORAGE_KEYS.LANGUAGE, 'en'),
  remove: () => removeStorageItem(STORAGE_KEYS.LANGUAGE)
};

// Notifications storage functions
export const notificationStorage = {
  save: (notifications) => setStorageItem(STORAGE_KEYS.NOTIFICATIONS, notifications),
  get: () => getStorageItem(STORAGE_KEYS.NOTIFICATIONS, []),
  remove: () => removeStorageItem(STORAGE_KEYS.NOTIFICATIONS),
  add: (notification) => {
    const notifications = notificationStorage.get();
    notifications.unshift(notification);
    return notificationStorage.save(notifications);
  },
  markAsRead: (notificationId) => {
    const notifications = notificationStorage.get();
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    return notificationStorage.save(updatedNotifications);
  }
};

// Messages storage functions
export const messageStorage = {
  save: (messages) => setStorageItem(STORAGE_KEYS.MESSAGES, messages),
  get: () => getStorageItem(STORAGE_KEYS.MESSAGES, {}),
  remove: () => removeStorageItem(STORAGE_KEYS.MESSAGES),
  saveThread: (threadId, messages) => {
    const allMessages = messageStorage.get();
    allMessages[threadId] = messages;
    return messageStorage.save(allMessages);
  },
  getThread: (threadId) => {
    const allMessages = messageStorage.get();
    return allMessages[threadId] || [];
  }
};

// Alumni connections storage functions
export const alumniStorage = {
  save: (connections) => setStorageItem(STORAGE_KEYS.ALUMNI_CONNECTIONS, connections),
  get: () => getStorageItem(STORAGE_KEYS.ALUMNI_CONNECTIONS, []),
  remove: () => removeStorageItem(STORAGE_KEYS.ALUMNI_CONNECTIONS),
  add: (connection) => {
    const connections = alumniStorage.get();
    connections.push(connection);
    return alumniStorage.save(connections);
  },
  remove: (connectionId) => {
    const connections = alumniStorage.get();
    const filteredConnections = connections.filter(conn => conn.id !== connectionId);
    return alumniStorage.save(filteredConnections);
  }
};

// Profile setup storage functions (for app.html compatibility)
export const profileSetupStorage = {
  save: (profile) => setStorageItem(STORAGE_KEYS.PROFILE_SETUP, profile),
  get: () => getStorageItem(STORAGE_KEYS.PROFILE_SETUP),
  remove: () => removeStorageItem(STORAGE_KEYS.PROFILE_SETUP),
  update: (updates) => {
    const currentProfile = profileSetupStorage.get();
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...updates };
      return profileSetupStorage.save(updatedProfile);
    }
    return false;
  }
};

// LinkFolio profile storage functions (for app.html compatibility)
export const linkfolioStorage = {
  save: (profile) => setStorageItem(STORAGE_KEYS.LINKFOLIO_PROFILE, profile),
  get: () => getStorageItem(STORAGE_KEYS.LINKFOLIO_PROFILE),
  remove: () => removeStorageItem(STORAGE_KEYS.LINKFOLIO_PROFILE),
  update: (updates) => {
    const currentProfile = linkfolioStorage.get();
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...updates };
      return linkfolioStorage.save(updatedProfile);
    }
    return false;
  }
};
