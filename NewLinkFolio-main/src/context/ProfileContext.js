import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { profileStorage } from '../utils/storage';

// Profile context
const ProfileContext = createContext();

// Profile reducer
const profileReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOAD_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null,
      };
    case 'LOAD_PROFILE_FAILURE':
      return {
        ...state,
        loading: false,
        profile: null,
        error: action.payload,
      };
    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        updating: true,
        error: null,
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        updating: false,
        profile: { ...state.profile, ...action.payload },
        error: null,
      };
    case 'UPDATE_PROFILE_FAILURE':
      return {
        ...state,
        updating: false,
        error: action.payload,
      };
    case 'UPLOAD_PICTURE_START':
      return {
        ...state,
        uploadingPicture: true,
        error: null,
      };
    case 'UPLOAD_PICTURE_SUCCESS':
      return {
        ...state,
        uploadingPicture: false,
        profile: { ...state.profile, profilePicture: action.payload },
        error: null,
      };
    case 'UPLOAD_PICTURE_FAILURE':
      return {
        ...state,
        uploadingPicture: false,
        error: action.payload,
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
  profile: null,
  loading: false,
  updating: false,
  uploadingPicture: false,
  error: null,
};

// Profile provider component
export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Load profile from storage on mount
  useEffect(() => {
    const loadProfileFromStorage = () => {
      const storedProfile = profileStorage.get();
      if (storedProfile) {
        dispatch({
          type: 'LOAD_PROFILE_SUCCESS',
          payload: storedProfile,
        });
      }
    };

    loadProfileFromStorage();
  }, []);

  // Load profile from API
  const loadProfile = async (userId = null) => {
    dispatch({ type: 'LOAD_PROFILE_START' });
    try {
      const profile = await profileService.getProfile(userId);
      dispatch({
        type: 'LOAD_PROFILE_SUCCESS',
        payload: profile,
      });
      profileStorage.save(profile);
      return profile;
    } catch (error) {
      dispatch({
        type: 'LOAD_PROFILE_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE_START' });
    try {
      const updatedProfile = await profileService.updateProfile(profileData);
      dispatch({
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: updatedProfile,
      });
      profileStorage.save(updatedProfile);
      return updatedProfile;
    } catch (error) {
      dispatch({
        type: 'UPDATE_PROFILE_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file) => {
    dispatch({ type: 'UPLOAD_PICTURE_START' });
    try {
      const response = await profileService.uploadProfilePicture(file);
      dispatch({
        type: 'UPLOAD_PICTURE_SUCCESS',
        payload: response.profilePicture,
      });
      return response;
    } catch (error) {
      dispatch({
        type: 'UPLOAD_PICTURE_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  // Delete profile picture
  const deleteProfilePicture = async () => {
    dispatch({ type: 'UPLOAD_PICTURE_START' });
    try {
      await profileService.deleteProfilePicture();
      dispatch({
        type: 'UPLOAD_PICTURE_SUCCESS',
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: 'UPLOAD_PICTURE_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  // Search profiles
  const searchProfiles = async (searchParams) => {
    try {
      return await profileService.searchProfiles(searchParams);
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
    loadProfile,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    searchProfiles,
    clearError,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;
