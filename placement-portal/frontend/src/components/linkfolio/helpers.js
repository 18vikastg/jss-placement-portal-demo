// Enhanced utility helpers for NewLinkFolio
import { profileStorage } from './storage';

// Format date utilities
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

// Performance utilities
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ID generation
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// String utilities
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

// File utilities
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isImageFile = (file) => {
  return file && file.type.startsWith('image/');
};

export const createFilePreview = (file) => {
  return URL.createObjectURL(file);
};

export const revokeFilePreview = (url) => {
  URL.revokeObjectURL(url);
};

// Profile completion utilities
export const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;
  
  const requiredFields = [
    'firstName', 'lastName', 'email', 'phone', 'location', 'objective'
  ];
  
  const optionalFields = [
    'profilePicture', 'skills', 'interestedJobs'
  ];
  
  let completedRequired = 0;
  let completedOptional = 0;
  
  requiredFields.forEach(field => {
    if (profile[field] && profile[field].toString().trim() !== '') {
      completedRequired++;
    }
  });
  
  optionalFields.forEach(field => {
    if (field === 'skills' || field === 'interestedJobs') {
      if (profile[field] && Array.isArray(profile[field]) && profile[field].length > 0) {
        completedOptional++;
      }
    } else if (profile[field]) {
      completedOptional++;
    }
  });
  
  // Required fields worth 70%, optional worth 30%
  const requiredScore = (completedRequired / requiredFields.length) * 70;
  const optionalScore = (completedOptional / optionalFields.length) * 30;
  
  return Math.round(requiredScore + optionalScore);
};

export const getProfileCompletionSuggestions = (profile) => {
  const suggestions = [];
  
  if (!profile?.profilePicture) {
    suggestions.push('Add a professional profile picture');
  }
  
  if (!profile?.skills || profile.skills.length === 0) {
    suggestions.push('Add your technical skills');
  }
  
  if (!profile?.interestedJobs || profile.interestedJobs.length === 0) {
    suggestions.push('Add job positions you\'re interested in');
  }
  
  if (!profile?.objective || profile.objective.length < 50) {
    suggestions.push('Write a more detailed career objective');
  }
  
  return suggestions;
};

// Search and filter utilities
export const filterAlumni = (alumni, filters) => {
  let filtered = [...alumni];
  
  // Text search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(person => 
      person.name.toLowerCase().includes(searchLower) ||
      person.company.toLowerCase().includes(searchLower) ||
      person.position.toLowerCase().includes(searchLower) ||
      person.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  }
  
  // Company filter
  if (filters.company) {
    filtered = filtered.filter(person => person.company === filters.company);
  }
  
  // Status filter
  if (filters.status) {
    filtered = filtered.filter(person => person.status === filters.status);
  }
  
  // Graduation year filter
  if (filters.graduationYear) {
    filtered = filtered.filter(person => person.graduationYear === parseInt(filters.graduationYear));
  }
  
  // Skills filter
  if (filters.skills && filters.skills.length > 0) {
    filtered = filtered.filter(person => 
      filters.skills.some(skill => 
        person.skills.some(personSkill => 
          personSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }
  
  // Following filter
  if (filters.following === 'true') {
    filtered = filtered.filter(person => person.isFollowing);
  }
  
  // Featured filter
  if (filters.featured === 'true') {
    filtered = filtered.filter(person => person.isFeatured);
  }
  
  return filtered;
};

export const sortAlumni = (alumni, sortBy, sortOrder = 'asc') => {
  const sorted = [...alumni].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
      case 'graduationYear':
        comparison = a.graduationYear - b.graduationYear;
        break;
      case 'lastActive':
        comparison = new Date(b.lastActive) - new Date(a.lastActive);
        break;
      default:
        return 0;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};

// Analytics utilities
export const getProfileAnalytics = () => {
  const profile = profileStorage.load();
  if (!profile) return null;
  
  return {
    completionPercentage: calculateProfileCompletion(profile),
    lastUpdated: profile.updatedAt,
    skillsCount: profile.skills?.length || 0,
    jobInterestsCount: profile.interestedJobs?.length || 0,
    profileViews: Math.floor(Math.random() * 100) + 20, // Simulated
    connectionRequests: Math.floor(Math.random() * 10), // Simulated
  };
};

// Export utilities
export const exportProfileData = () => {
  const profile = profileStorage.load();
  if (!profile) return null;
  
  const exportData = {
    ...profile,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `linkfolio-profile-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Theme utilities
export const getThemePreference = () => {
  return localStorage.getItem('linkfolio-theme') || 'light';
};

export const setThemePreference = (theme) => {
  localStorage.setItem('linkfolio-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

// Notification utilities
export const createSuccessNotification = (message) => {
  return {
    id: generateId(),
    type: 'success',
    title: 'Success',
    message,
    timestamp: new Date().toISOString(),
    isRead: false,
    priority: 'normal'
  };
};

export const createErrorNotification = (message) => {
  return {
    id: generateId(),
    type: 'error',
    title: 'Error',
    message,
    timestamp: new Date().toISOString(),
    isRead: false,
    priority: 'high'
  };
};

export const createInfoNotification = (title, message) => {
  return {
    id: generateId(),
    type: 'info',
    title,
    message,
    timestamp: new Date().toISOString(),
    isRead: false,
    priority: 'normal'
  };
};
