import React, { useState } from 'react'
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2, Home, Briefcase, Search, Building, TrendingUp, Menu, X } from "lucide-react"
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
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16'>
                {/* Logo */}
                <div className='flex items-center'>
                    <Link to="/" className='flex items-center space-x-3'>
                        <img 
                            src="/jss logo.png" 
                            alt="JSS Academy of Technical Education Logo" 
                            className='h-12 w-auto object-contain'
                        />
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent'>
                                PrepLink
                            </h1>
                            <span className='text-xs text-gray-600 font-medium'>JSSATE Bengaluru</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
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
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Home className='w-4 h-4' />
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/opportunities" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <TrendingUp className='w-4 h-4' />
                                            Opportunities
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
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
                <div className='md:hidden'>
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='p-2 text-gray-700 hover:text-purple-600 transition-colors'
                    >
                        {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className='md:hidden bg-white border-t border-gray-100'>
                    <div className='px-4 py-4 space-y-2'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/admin/companies" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Building className='w-4 h-4' />
                                    Companies
                                </Link>
                                <Link to="/admin/jobs" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Briefcase className='w-4 h-4' />
                                    Jobs
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Home className='w-4 h-4' />
                                    Home
                                </Link>
                                <Link to="/jobs" className='flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50'>
                                    <Briefcase className='w-4 h-4' />
                                    Opportunities
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
