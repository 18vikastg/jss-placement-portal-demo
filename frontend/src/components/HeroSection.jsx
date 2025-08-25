import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, TrendingUp, Users, Building, Award } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import SmartSearchBar from './SmartSearchBar';

const HeroSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 min-h-[80vh] flex items-center'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
                <div className='text-center'>
                    <div className='flex flex-col gap-8 my-10'>
                        <div className='space-y-6'>
                            <span className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-100 to-orange-100 text-red-800 font-semibold text-sm border border-red-200'>
                                <Award className='w-4 h-4 mr-2' />
                                JSS Academy of Technical Education, Bengaluru - Since 1997
                            </span>
                            <h1 className='text-6xl md:text-7xl font-bold leading-tight'>
                                Your Career Journey
                                <span className='bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent block'>
                                    Starts at JSSATE
                                </span>
                            </h1>
                            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                                Connect with top companies, explore exciting opportunities, and kickstart your professional journey through JSS Academy of Technical Education&apos;s premier placement platform - PrepLink.
                            </p>
                        </div>
                        
                        <SmartSearchBar onSearch={handleSearch} />

                        {/* Stats Section */}
                        <div className='flex flex-wrap justify-center gap-8 mt-12'>
                            <div className='flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg'>
                                <div className='p-3 bg-red-100 rounded-lg'>
                                    <Building className='w-6 h-6 text-red-700' />
                                </div>
                                <div>
                                    <div className='text-2xl font-bold text-gray-800'>200+</div>
                                    <div className='text-sm text-gray-600'>Top Recruiters</div>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg'>
                                <div className='p-3 bg-green-100 rounded-lg'>
                                    <Users className='w-6 h-6 text-green-600' />
                                </div>
                                <div>
                                    <div className='text-2xl font-bold text-gray-800'>5000+</div>
                                    <div className='text-sm text-gray-600'>Students Placed</div>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg'>
                                <div className='p-3 bg-orange-100 rounded-lg'>
                                    <TrendingUp className='w-6 h-6 text-orange-600' />
                                </div>
                                <div>
                                    <div className='text-2xl font-bold text-gray-800'>₹8.5L</div>
                                    <div className='text-sm text-gray-600'>Average Package</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection