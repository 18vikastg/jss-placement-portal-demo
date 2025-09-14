// NewLinkFolio localStorage utilities
const STORAGE_KEYS = {
    PROFILE: 'newLinkfolioProfile',
    ALUMNI_CONNECTIONS: 'newLinkfolioAlumniConnections',
    MESSAGES: 'newLinkfolioMessages',
    NOTIFICATIONS: 'newLinkfolioNotifications',
    SCHEDULED_LINKS: 'newLinkfolioScheduledLinks',
    USER_PREFERENCES: 'newLinkfolioPreferences'
};

// Profile data management
export const profileStorage = {
    save: (profileData) => {
        try {
            const dataWithTimestamp = {
                ...profileData,
                updatedAt: new Date().toISOString(),
                version: '1.0'
            };
            localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('Error saving profile data:', error);
            return false;
        }
    },

    load: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading profile data:', error);
            return null;
        }
    },

    clear: () => {
        try {
            localStorage.removeItem(STORAGE_KEYS.PROFILE);
            return true;
        } catch (error) {
            console.error('Error clearing profile data:', error);
            return false;
        }
    },

    exists: () => {
        return localStorage.getItem(STORAGE_KEYS.PROFILE) !== null;
    }
};

// Alumni connections management
export const alumniStorage = {
    saveConnections: (connections) => {
        try {
            const dataWithTimestamp = {
                connections,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.ALUMNI_CONNECTIONS, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('Error saving alumni connections:', error);
            return false;
        }
    },

    loadConnections: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.ALUMNI_CONNECTIONS);
            return data ? JSON.parse(data).connections : [];
        } catch (error) {
            console.error('Error loading alumni connections:', error);
            return [];
        }
    },

    toggleFollow: (alumniId) => {
        try {
            const connections = alumniStorage.loadConnections();
            const existingIndex = connections.findIndex(conn => conn.alumniId === alumniId);
            
            if (existingIndex >= 0) {
                connections.splice(existingIndex, 1);
            } else {
                connections.push({
                    alumniId,
                    followedAt: new Date().toISOString(),
                    status: 'following'
                });
            }
            
            alumniStorage.saveConnections(connections);
            return connections;
        } catch (error) {
            console.error('Error toggling follow status:', error);
            return [];
        }
    },

    isFollowing: (alumniId) => {
        try {
            const connections = alumniStorage.loadConnections();
            return connections.some(conn => conn.alumniId === alumniId);
        } catch (error) {
            console.error('Error checking follow status:', error);
            return false;
        }
    }
};

// Messages management
export const messagesStorage = {
    save: (messages) => {
        try {
            const dataWithTimestamp = {
                messages,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('Error saving messages:', error);
            return false;
        }
    },

    load: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
            return data ? JSON.parse(data).messages : [];
        } catch (error) {
            console.error('Error loading messages:', error);
            return [];
        }
    },

    markAsRead: (messageId) => {
        try {
            const messages = messagesStorage.load();
            const messageIndex = messages.findIndex(msg => msg.id === messageId);
            
            if (messageIndex >= 0) {
                messages[messageIndex].isRead = true;
                messages[messageIndex].readAt = new Date().toISOString();
                messagesStorage.save(messages);
            }
            
            return messages;
        } catch (error) {
            console.error('Error marking message as read:', error);
            return [];
        }
    },

    markAllAsRead: () => {
        try {
            const messages = messagesStorage.load();
            const updatedMessages = messages.map(msg => ({
                ...msg,
                isRead: true,
                readAt: new Date().toISOString()
            }));
            
            messagesStorage.save(updatedMessages);
            return updatedMessages;
        } catch (error) {
            console.error('Error marking all messages as read:', error);
            return [];
        }
    }
};

// Notifications management
export const notificationsStorage = {
    save: (notifications) => {
        try {
            const dataWithTimestamp = {
                notifications,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('Error saving notifications:', error);
            return false;
        }
    },

    load: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
            return data ? JSON.parse(data).notifications : [];
        } catch (error) {
            console.error('Error loading notifications:', error);
            return [];
        }
    },

    markAsRead: (notificationId) => {
        try {
            const notifications = notificationsStorage.load();
            const notificationIndex = notifications.findIndex(notif => notif.id === notificationId);
            
            if (notificationIndex >= 0) {
                notifications[notificationIndex].isRead = true;
                notifications[notificationIndex].readAt = new Date().toISOString();
                notificationsStorage.save(notifications);
            }
            
            return notifications;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return [];
        }
    },

    clearAll: () => {
        try {
            localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
            return true;
        } catch (error) {
            console.error('Error clearing notifications:', error);
            return false;
        }
    }
};

// Scheduled links management
export const scheduledLinksStorage = {
    save: (scheduledLinks) => {
        try {
            const dataWithTimestamp = {
                scheduledLinks,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.SCHEDULED_LINKS, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('Error saving scheduled links:', error);
            return false;
        }
    },

    load: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.SCHEDULED_LINKS);
            return data ? JSON.parse(data).scheduledLinks : [];
        } catch (error) {
            console.error('Error loading scheduled links:', error);
            return [];
        }
    },

    add: (linkData) => {
        try {
            const scheduledLinks = scheduledLinksStorage.load();
            const newLink = {
                ...linkData,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                status: 'scheduled'
            };
            
            scheduledLinks.push(newLink);
            scheduledLinksStorage.save(scheduledLinks);
            return newLink;
        } catch (error) {
            console.error('Error adding scheduled link:', error);
            return null;
        }
    },

    updateStatus: (linkId, status) => {
        try {
            const scheduledLinks = scheduledLinksStorage.load();
            const linkIndex = scheduledLinks.findIndex(link => link.id === linkId);
            
            if (linkIndex >= 0) {
                scheduledLinks[linkIndex].status = status;
                scheduledLinks[linkIndex].updatedAt = new Date().toISOString();
                scheduledLinksStorage.save(scheduledLinks);
            }
            
            return scheduledLinks;
        } catch (error) {
            console.error('Error updating link status:', error);
            return [];
        }
    }
};

// User preferences management
export const preferencesStorage = {
    save: (preferences) => {
        try {
            const dataWithTimestamp = {
                ...preferences,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('Error saving user preferences:', error);
            return false;
        }
    },

    load: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
            return data ? JSON.parse(data) : {
                theme: 'light',
                notifications: true,
                emailUpdates: true,
                language: 'en'
            };
        } catch (error) {
            console.error('Error loading user preferences:', error);
            return {
                theme: 'light',
                notifications: true,
                emailUpdates: true,
                language: 'en'
            };
        }
    },

    update: (key, value) => {
        try {
            const preferences = preferencesStorage.load();
            preferences[key] = value;
            preferencesStorage.save(preferences);
            return preferences;
        } catch (error) {
            console.error('Error updating user preference:', error);
            return null;
        }
    }
};

// Utility functions
export const clearAllData = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing all NewLinkFolio data:', error);
        return false;
    }
};

export const exportData = () => {
    try {
        const allData = {};
        Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
            const data = localStorage.getItem(storageKey);
            if (data) {
                allData[key] = JSON.parse(data);
            }
        });
        
        return {
            ...allData,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
    } catch (error) {
        console.error('Error exporting data:', error);
        return null;
    }
};

export const importData = (data) => {
    try {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format');
        }
        
        Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
            if (data[key]) {
                localStorage.setItem(storageKey, JSON.stringify(data[key]));
            }
        });
        
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
};

// Data validation utilities
export const validateProfileData = (profileData) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'location', 'objective'];
    const missingFields = requiredFields.filter(field => !profileData[field] || profileData[field].trim() === '');
    
    return {
        isValid: missingFields.length === 0,
        missingFields,
        completionPercentage: Math.round((requiredFields.length - missingFields.length) / requiredFields.length * 100)
    };
};

export const getStorageUsage = () => {
    try {
        let totalSize = 0;
        const usage = {};
        
        Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
            const data = localStorage.getItem(storageKey);
            const size = data ? new Blob([data]).size : 0;
            usage[key] = {
                size,
                sizeKB: Math.round(size / 1024 * 100) / 100,
                exists: !!data
            };
            totalSize += size;
        });
        
        return {
            total: {
                size: totalSize,
                sizeKB: Math.round(totalSize / 1024 * 100) / 100,
                sizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100
            },
            breakdown: usage
        };
    } catch (error) {
        console.error('Error calculating storage usage:', error);
        return null;
    }
};
