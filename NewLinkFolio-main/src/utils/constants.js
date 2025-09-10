// Application constants
export const APP_CONFIG = {
  NAME: 'LinkFolio',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional Network Platform for JSS Academy of Technical Education',
  AUTHOR: 'JSS Academy of Technical Education',
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  WEBSOCKET_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:3001',
};

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_SETUP: '/profile-setup',
  PORTFOLIO: '/portfolio',
  EDIT_PROFILE: '/edit-profile',
  ALUMNI_LINK: '/alumni',
  MESSAGING: '/messaging',
  NOTIFICATIONS: '/notifications',
};

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  PROFILE: {
    GET: '/profile/me',
    UPDATE: '/profile/me',
    PICTURE: '/profile/picture',
    STATS: '/profile/stats',
    SEARCH: '/profile/search',
  },
  ALUMNI: {
    DIRECTORY: '/alumni/directory',
    SEARCH: '/alumni/search',
    CONNECT: '/alumni/connect',
    CONNECTIONS: '/alumni/connections',
    REQUESTS: '/alumni/connection-requests',
  },
  MESSAGES: {
    THREADS: '/messages/threads',
    SEND: '/messages/send',
    UNREAD_COUNT: '/messages/unread-count',
  },
  NOTIFICATIONS: {
    GET: '/notifications',
    MARK_READ: '/notifications/mark-read',
    SETTINGS: '/notifications/settings',
    UNREAD_COUNT: '/notifications/unread-count',
  },
};

export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
  },
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  PROFILE_PICTURE: {
    MAX_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png'],
  },
};

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system',
};

export const NOTIFICATION_TYPES = {
  CONNECTION_REQUEST: 'connection_request',
  MESSAGE: 'message',
  PROFILE_UPDATE: 'profile_update',
  SYSTEM: 'system',
};

export const USER_ROLES = {
  STUDENT: 'student',
  ALUMNI: 'alumni',
  ADMIN: 'admin',
};

export const EDUCATION_LEVELS = [
  'Engineering',
  '12th/PU',
  '10th/SLC',
  'Post Graduate',
  'PhD',
  'Other',
];

export const SKILL_CATEGORIES = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Tools & Technologies',
  'Soft Skills',
  'Languages',
  'Other',
];
