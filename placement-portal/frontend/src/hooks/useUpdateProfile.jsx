import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const useUpdateProfile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePersonalInfo = async (data) => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, data, {
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
            
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, data, {
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
            
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, data, {
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
            
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, data, {
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
            
            // Add additional data
            Object.keys(additionalData).forEach(key => {
                formData.append(key, additionalData[key]);
            });
            
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
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
        // Since we don't have a dedicated completion endpoint, 
        // we'll calculate it on the frontend based on user data
        return 0; // Placeholder - this can be calculated based on user profile data
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
