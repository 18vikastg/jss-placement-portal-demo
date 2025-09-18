import React, { useState } from 'react'
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2, Home, Briefcase, Search, Building, TrendingUp, Menu, X, Users, BookOpen, Mic, Globe } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // Handle different types of errors
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
                // If server is down, still log out the user locally
                dispatch(setUser(null));
                navigate("/");
                toast.error("Server connection failed. You have been logged out locally.");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        }
    }

    return (
        <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 h-20'>
                {/* Logo */}
                <div className='flex items-center flex-shrink-0'>
                    <Link to="/" className='flex items-center space-x-4'>
                        <img 
                            src="/jss logo.png" 
                            alt="JSS Academy of Technical Education Logo" 
                            className='h-14 w-auto object-contain'
                        />
                        <div className='flex flex-col'>
                            <h1 className='text-3xl font-black bg-gradient-to-r from-red-800 to-red-950 bg-clip-text text-transparent tracking-tight leading-none'>
                                <span className='text-red-900'>JSSATE</span>
                                <span className='text-amber-600 ml-2 text-xl font-bold'>PrepLink</span>
                            </h1>
                            <p className='text-xs text-gray-600 font-semibold tracking-wide uppercase mt-1'>JSS Academy • Technical Education</p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-4'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/recruiter/dashboard" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Home className='w-4 h-4' />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/companies" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Building className='w-4 h-4' />
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : user && user.role === 'faculty' ? (
                                <>
                                    <li>
                                        <Link to="/faculty/dashboard" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Home className='w-4 h-4' />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/faculty/students" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Users className='w-4 h-4' />
                                            Students
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/faculty/placements" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <TrendingUp className='w-4 h-4' />
                                            Placements
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Search className='w-4 h-4' />
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            ) : user && user.role === 'student' ? (
                                <>
                                    {/* Core Navigation */}
                                    <li>
                                        <Link to="/student/dashboard" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 font-medium'>
                                            <Home className='w-4 h-4' />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/opportunities" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 font-medium'>
                                            <TrendingUp className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/applications" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 font-medium'>
                                            <Briefcase className='w-4 h-4' />
                                            Applications
                                        </Link>
                                    </li>
                                    
                                    {/* Separator */}
                                    <li className='border-l border-gray-200 h-8 mx-2'></li>
                                    
                                    {/* Tools & Features */}
                                    <li>
                                        <Link 
                                            to="/preparation" 
                                            className='flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-800 text-white hover:from-red-800 hover:to-red-900 transition-all duration-200 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg text-sm'
                                        >
                                            <BookOpen className='w-4 h-4' />
                                            Prep Hub
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/student/mock-interview" 
                                            className='flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-700 text-white hover:from-amber-700 hover:to-yellow-800 transition-all duration-200 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg text-sm'
                                        >
                                            <Mic className='w-4 h-4' />
                                            Practice
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/student/linkfolio" 
                                            className='flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-700 text-white hover:from-purple-700 hover:to-blue-800 transition-all duration-200 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg text-sm'
                                        >
                                            <Globe className='w-4 h-4' />
                                            LinkFolio
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Home className='w-4 h-4' />
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Search className='w-4 h-4' />
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    {/* Auth Section */}
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="ghost" className='text-gray-700 hover:text-red-700 hover:bg-red-50'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className='bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-6'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer border-2 border-red-200 hover:border-red-400 transition-colors'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 p-0 border-0 shadow-xl'>
                                    <div className='bg-white rounded-xl overflow-hidden'>
                                        <div className='bg-gradient-to-r from-red-700 to-red-900 p-4 text-white'>
                                            <div className='flex items-center gap-3'>
                                                <Avatar className='border-2 border-white'>
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-semibold'>{user?.fullname}</h4>
                                                    <p className='text-red-100 text-sm'>{user?.profile?.bio || 'Welcome back!'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-4 space-y-2'>
                                            {user && user.role === 'student' && (
                                                <Link to="/student/profile">
                                                    <Button variant="ghost" className='w-full justify-start gap-2 hover:bg-red-50 hover:text-red-700'>
                                                        <User2 className='w-4 h-4' />
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            )}
                                            {user && user.role !== 'student' && (
                                                <Link to="/profile">
                                                    <Button variant="ghost" className='w-full justify-start gap-2 hover:bg-red-50 hover:text-red-700'>
                                                        <User2 className='w-4 h-4' />
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button onClick={logoutHandler} variant="ghost" className='w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700'>
                                                <LogOut className='w-4 h-4' />
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile menu button */}
                <div className='lg:hidden'>
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='p-2 text-gray-700 hover:text-red-600 transition-colors'
                    >
                        {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className='lg:hidden bg-white border-t border-gray-100'>
                    <div className='px-4 py-4 space-y-2'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/recruiter/dashboard" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Home className='w-4 h-4' />
                                    Dashboard
                                </Link>
                                <Link to="/admin/companies" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Building className='w-4 h-4' />
                                    Companies
                                </Link>
                                <Link to="/admin/jobs" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Briefcase className='w-4 h-4' />
                                    Jobs
                                </Link>
                            </>
                        ) : user && user.role === 'faculty' ? (
                            <>
                                <Link to="/faculty/dashboard" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Home className='w-4 h-4' />
                                    Dashboard
                                </Link>
                                <Link to="/faculty/students" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Users className='w-4 h-4' />
                                    Students
                                </Link>
                                <Link to="/faculty/placements" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <TrendingUp className='w-4 h-4' />
                                    Placements
                                </Link>
                                <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Search className='w-4 h-4' />
                                    Browse
                                </Link>
                            </>
                        ) : user && user.role === 'student' ? (
                            <>
                                <Link to="/student/dashboard" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Home className='w-4 h-4' />
                                    Dashboard
                                </Link>
                                <Link to="/opportunities" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <TrendingUp className='w-4 h-4' />
                                    Opportunities
                                </Link>
                                <Link to="/student/applications" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Briefcase className='w-4 h-4' />
                                    My Applications
                                </Link>
                                <Link to="/student/profile" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <User2 className='w-4 h-4' />
                                    Profile
                                </Link>
                                <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Search className='w-4 h-4' />
                                    Browse Jobs
                                </Link>
                                <Link 
                                    to="/preparation" 
                                    className='flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-800 text-white hover:from-red-800 hover:to-red-900 transition-all duration-200 px-3 py-2 rounded-lg font-medium shadow-md'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <BookOpen className='w-4 h-4' />
                                    📚 Prep Hub
                                </Link>
                                <Link 
                                    to="/student/mock-interview" 
                                    className='flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-700 text-white hover:from-amber-700 hover:to-yellow-800 transition-all duration-200 px-3 py-2 rounded-lg font-medium shadow-md'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Mic className='w-4 h-4' />
                                    🎤 Practice
                                </Link>
                                <Link 
                                    to="/student/linkfolio" 
                                    className='flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-700 text-white hover:from-purple-700 hover:to-blue-800 transition-all duration-200 px-3 py-2 rounded-lg font-medium shadow-md'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Globe className='w-4 h-4' />
                                    🌐 Portfolio
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Home className='w-4 h-4' />
                                    Home
                                </Link>
                                <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Search className='w-4 h-4' />
                                    Browse
                                </Link>
                            </>
                        )}
                        
                        {!user && (
                            <div className='pt-4 border-t border-gray-100 space-y-2'>
                                <Link to="/login" className='block'>
                                    <Button variant="ghost" className='w-full justify-start text-gray-700 hover:text-red-700 hover:bg-red-50'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" className='block'>
                                    <Button className='w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
