import { useSelector } from "react-redux";

const useGetProfile = () => {
    const { user } = useSelector(store => store.auth);
    
    // Since user data comes from login and is stored in Redux,
    // we don't need to make additional API calls
    // This hook provides consistent interface for accessing user data
    
    return { user, loading: false, error: null };
};

export default useGetProfile;
