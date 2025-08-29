import React, { useEffect, useState } from 'react'
import Navbar from '../shared/NavbarNew'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT, FACULTY_AUTH_API_END_POINT, RECRUITER_AUTH_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            dispatch(setLoading(true));
            
            // Choose API endpoint based on role
            let apiEndpoint;
            switch(input.role) {
                case 'student':
                    apiEndpoint = `${USER_API_END_POINT}/login`;
                    break;
                case 'faculty':
                    apiEndpoint = `${FACULTY_AUTH_API_END_POINT}/login`;
                    break;
                case 'recruiter':
                    apiEndpoint = `${RECRUITER_AUTH_API_END_POINT}/login`;
                    break;
                default:
                    toast.error("Invalid role selected");
                    return;
            }

            const res = await axios.post(apiEndpoint, {
                email: input.email,
                password: input.password,
                role: input.role
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            
            if (res.data.success) {
                // Set user data based on role
                let userData;
                switch(input.role) {
                    case 'student':
                        userData = res.data.user;
                        break;
                    case 'faculty':
                        userData = { ...res.data.faculty, role: 'faculty' };
                        break;
                    case 'recruiter':
                        userData = { ...res.data.recruiter, role: 'recruiter' };
                        break;
                }
                
                dispatch(setUser(userData));
                // Role-based navigation
                const userRole = input.role;
                switch (userRole) {
                    case 'student':
                        navigate("/student/dashboard");
                        break;
                    case 'faculty':
                        navigate("/faculty/dashboard");
                        break;
                    case 'recruiter':
                        navigate("/recruiter/dashboard");
                        break;
                    default:
                        navigate("/");
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            // Role-based redirection
            const userRole = user.role;
            switch (userRole) {
                case 'student':
                    navigate("/student/dashboard");
                    break;
                case 'faculty':
                    navigate("/faculty/dashboard");
                    break;
                case 'recruiter':
                    navigate("/recruiter/dashboard");
                    break;
                default:
                    navigate("/");
            }
        }
    },[user, navigate])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>
                    <div className='my-5'>
                        <Label className="text-base font-medium">Select Role</Label>
                        <RadioGroup className="flex items-center gap-6 mt-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="student" className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="faculty"
                                    name="role"
                                    value="faculty"
                                    checked={input.role === 'faculty'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="faculty" className="cursor-pointer">Faculty</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="recruiter" className="cursor-pointer">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don&apos;t have an account? <Link to="/signup" className='text-red-700 hover:text-red-800 font-medium'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login