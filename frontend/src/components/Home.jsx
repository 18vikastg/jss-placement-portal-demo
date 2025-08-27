import { useEffect } from 'react'
import Navbar from './shared/NavbarNew'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import FeaturesSection from './FeaturesSection'
import CompanyShowcase from './CompanyShowcase'
import TestimonialsSection from './TestimonialsSection'
import CTASection from './CTASection'
import AboutJSSSection from './AboutJSSSection'
import CollegePlacementStats from './CollegePlacementStats'
import WelcomeModal from './WelcomeModal'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user?.role, navigate]);
  return (
    <div className='min-h-screen bg-white'>
      <WelcomeModal />
      <Navbar />
      <HeroSection />
      <AboutJSSSection />
      <CollegePlacementStats />
      <FeaturesSection />
      <CompanyShowcase />
      <CategoryCarousel />
      <LatestJobs />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home