import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook,
  ArrowRight,
  Heart
} from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/jss logo.png" 
                alt="JSS Logo" 
                className='h-10 w-auto object-contain'
              />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  PrepLink
                </h2>
                <p className="text-sm text-gray-400">by JSSATE Bengaluru</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              JSS Academy of Technical Education&apos;s premier placement platform. 
              Connecting students with leading companies since 1997. Excellence in education, excellence in placements.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Browse Companies
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => window.open('http://localhost:3002', '_blank')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  📊 Placement Analytics
                </button>
              </li>
              <li>
                <Link to="/preparation" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  📚 Preparation Hub
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Recruiters</h3>
            <ul className="space-y-3">
              {['Post Jobs', 'Search Candidates', 'Campus Hiring', 'Recruitment Solutions', 'Pricing Plans'].map((link, index) => (
                <li key={index}>
                  <Link to="#" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-red-400" />
                placement@jssateb.ac.in
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-red-400" />
                +91 80 2841 9000
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-red-400" />
                Bengaluru, Karnataka, India
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold mb-3">Subscribe to Newsletter</h4>
              <p className="text-sm text-gray-300 mb-4">Get latest job updates and career tips</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-red-500 text-sm"
                />
                <Button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg rounded-l-none">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 PrepLink by JSSATE Bengaluru. All rights reserved. Built with{' '}
              <Heart className="w-4 h-4 inline text-red-500" />{' '}
              for your career success.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Cookie Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer