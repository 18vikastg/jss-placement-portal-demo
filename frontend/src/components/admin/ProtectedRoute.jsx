import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children, allowedRoles = ['recruiter']}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user === null || !allowedRoles.includes(user.role)){
            navigate("/");
        }
    },[user, allowedRoles, navigate]);

    if(user === null || !allowedRoles.includes(user.role)){
        return null;
    }

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;