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
        <div className='relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 min-h-[85vh] flex items-center overflow-hidden'>
            {/* Enhanced JSS Building Background with Professional Overlay */}
            <div className='absolute inset-0 overflow-hidden'>
                {/* Primary Background Image */}
                <div 
                    className='absolute right-0 top-0 w-3/5 h-full opacity-12 bg-no-repeat bg-right bg-cover transform scale-105'
                    style={{
                        backgroundImage: "url('/jss front.jpeg')",
                        filter: 'sepia(20%) saturate(120%) hue-rotate(-10deg) brightness(1.1)',
                        maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)'
                    }}
                ></div>
                
                {/* Secondary Subtle Pattern Overlay */}
                <div 
                    className='absolute right-0 top-0 w-2/3 h-full opacity-8'
                    style={{
                        background: `
                            radial-gradient(circle at 70% 30%, rgba(136, 19, 55, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(217, 119, 6, 0.1) 0%, transparent 50%)
                        `
                    }}
                ></div>
            </div>
            
            {/* Enhanced Gradient Overlay for Better Text Readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-amber-900/10'></div>
            
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20'>
                <div className='text-center lg:text-left lg:flex lg:items-center'>
                    <div className='lg:w-2/3 xl:w-3/5'>
                        <div className='space-y-8 my-12'>
                            {/* Enhanced JSS Academy Badge */}
                            <div className='flex justify-center lg:justify-start'>
                                <span className='inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-red-800 to-red-900 text-white font-bold text-base shadow-2xl border border-red-700/20 backdrop-blur-sm'>
                                    <Award className='w-5 h-5 mr-3 text-yellow-400' />
                                    <span className='text-yellow-400 text-lg font-black'>JSSATE</span>
                                    <span className='mx-2'>Academy of Technical Education</span>
                                    <span className='text-red-200 ml-2'>• Est. 1997</span>
                                </span>
                            </div>

                            {/* Prominent JSSATE Branding */}
                            <div className='space-y-6'>
                                <h1 className='text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight'>
                                    <span className='block text-gray-900 mb-2'>
                                        Your Career Journey
                                    </span>
                                    <span className='block'>
                                        <span className='bg-gradient-to-r from-red-800 via-red-900 to-red-950 bg-clip-text text-transparent'>
                                            Starts at 
                                        </span>
                                        <span className='bg-gradient-to-r from-amber-600 via-yellow-600 to-yellow-700 bg-clip-text text-transparent ml-4 relative'>
                                            JSSATE
                                            {/* Subtle underline accent with JSS colors */}
                                            <div className='absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-red-700 opacity-30 rounded-full transform translate-y-2'></div>
                                        </span>
                                    </span>
                                </h1>
                                
                                <p className='text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-medium'>
                                    Connect with <span className='text-red-800 font-semibold'>top-tier companies</span>, explore exciting opportunities, and accelerate your professional journey through 
                                    <span className='text-amber-700 font-bold'> JSS Academy&apos;s</span> premier placement ecosystem.
                                </p>
                            </div>
                            
                            {/* Enhanced CTA Section */}
                            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4'>
                                <SmartSearchBar onSearch={handleSearch} />
                            </div>

                            {/* Professional Stats Cards */}
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto lg:mx-0'>
                                <div className='group bg-white/90 backdrop-blur-sm px-6 py-6 rounded-2xl shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
                                    <div className='flex items-center gap-4'>
                                        <div className='p-4 bg-gradient-to-br from-red-700 to-red-800 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                            <Building className='w-7 h-7 text-white' />
                                        </div>
                                        <div>
                                            <div className='text-3xl font-black text-gray-800 bg-gradient-to-r from-red-700 to-red-800 bg-clip-text text-transparent'>200+</div>
                                            <div className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>Top Recruiters</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='group bg-white/90 backdrop-blur-sm px-6 py-6 rounded-2xl shadow-xl border border-amber-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
                                    <div className='flex items-center gap-4'>
                                        <div className='p-4 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                            <Users className='w-7 h-7 text-white' />
                                        </div>
                                        <div>
                                            <div className='text-3xl font-black text-gray-800 bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent'>5000+</div>
                                            <div className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>Students Placed</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='group bg-white/90 backdrop-blur-sm px-6 py-6 rounded-2xl shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
                                    <div className='flex items-center gap-4'>
                                        <div className='p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                            <TrendingUp className='w-7 h-7 text-white' />
                                        </div>
                                        <div>
                                            <div className='text-3xl font-black text-gray-800 bg-gradient-to-r from-red-700 to-red-800 bg-clip-text text-transparent'>₹8.5L</div>
                                            <div className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>Average Package</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Analytics Feature Banner */}
                            <div className='mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6'>
                                <div className='bg-gradient-to-r from-red-800 to-red-900 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl flex items-center gap-3'>
                                    <span className='text-2xl'>📊</span>
                                    <span>Interactive Placement Analytics Dashboard</span>
                                </div>
                                <button 
                                    onClick={() => window.open('http://localhost:3002', '_blank')}
                                    className='bg-gradient-to-r from-amber-600 to-yellow-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-amber-700 hover:to-yellow-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105'
                                >
                                    Explore Analytics →
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side space for background image visibility */}
                    <div className='hidden lg:block lg:w-1/3 xl:w-2/5'></div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection