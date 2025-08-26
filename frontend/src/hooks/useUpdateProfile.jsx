import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { PROFILE_API_END_POINT } from "@/utils/constants";
import axios from "axios";

const useUpdateProfile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePersonalInfo = async (data) => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.put(`${PROFILE_API_END_POINT}/personal`, data, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                return res.data;
            }
        } catch (error) {
            console.error("Error updating personal info:", error);
            setError(error.response?.data?.message || "Failed to update personal info");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateAcademicInfo = async (data) => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.put(`${PROFILE_API_END_POINT}/academic`, data, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                return res.data;
            }
        } catch (error) {
            console.error("Error updating academic info:", error);
            setError(error.response?.data?.message || "Failed to update academic info");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateSkillsAndProjects = async (data) => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.put(`${PROFILE_API_END_POINT}/skills`, data, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                return res.data;
            }
        } catch (error) {
            console.error("Error updating skills and projects:", error);
            setError(error.response?.data?.message || "Failed to update skills and projects");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updatePlacementPreferences = async (data) => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.put(`${PROFILE_API_END_POINT}/preferences`, data, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                return res.data;
            }
        } catch (error) {
            console.error("Error updating placement preferences:", error);
            setError(error.response?.data?.message || "Failed to update placement preferences");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const uploadDocument = async (file, documentType, additionalData = {}) => {
        try {
            setLoading(true);
            setError(null);
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('documentType', documentType);
            
            // Add additional data for certificates
            Object.keys(additionalData).forEach(key => {
                formData.append(key, additionalData[key]);
            });
            
            const res = await axios.post(`${PROFILE_API_END_POINT}/upload`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                return res.data;
            }
        } catch (error) {
            console.error("Error uploading document:", error);
            setError(error.response?.data?.message || "Failed to upload document");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getProfileCompletion = async () => {
        try {
            const res = await axios.get(`${PROFILE_API_END_POINT}/completion`, {
                withCredentials: true
            });
            
            if (res.data.success) {
                return res.data.completion;
            }
        } catch (error) {
            console.error("Error getting profile completion:", error);
            setError(error.response?.data?.message || "Failed to get profile completion");
            throw error;
        }
    };

    return {
        loading,
        error,
        updatePersonalInfo,
        updateAcademicInfo,
        updateSkillsAndProjects,
        updatePlacementPreferences,
        uploadDocument,
        getProfileCompletion
    };
};

export default useUpdateProfile;
