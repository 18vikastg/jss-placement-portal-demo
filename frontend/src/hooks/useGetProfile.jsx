import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { PROFILE_API_END_POINT } from "@/utils/constants";
import axios from "axios";

const useGetProfile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const res = await axios.get(`${PROFILE_API_END_POINT}/get`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error.response?.data?.message || "Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [dispatch]);

    return { loading, error };
};

export default useGetProfile;
