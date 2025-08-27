import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, Palette, Sun, Moon } from 'lucide-react'
import { Button } from '../ui/button'

export default function EnhancementToggle() {
  const [isEnhanced, setIsEnhanced] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleEnhanced = () => {
    setIsEnhanced(!isEnhanced)
    // Redirect to classic or enhanced version
    if (isEnhanced) {
      window.location.href = '/preparation/classic'
    } else {
      window.location.href = '/preparation'
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
    >
      {/* Enhancement Toggle */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={toggleEnhanced}
          className={`w-14 h-14 rounded-full shadow-2xl ${
            isEnhanced 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
              : 'bg-gradient-to-r from-gray-600 to-gray-800'
          } hover:shadow-3xl transition-all duration-300`}
          title={isEnhanced ? "Switch to Classic View" : "Switch to Enhanced View"}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={toggleDarkMode}
          className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-3xl transition-all duration-300"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </Button>
      </motion.div>

      {/* Accessibility Toggle */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-3xl transition-all duration-300"
          title="Accessibility Options"
        >
          <Palette className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Floating label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        className="absolute right-16 top-0 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium text-gray-700"
      >
        ✨ Enhanced Experience
      </motion.div>
    </motion.div>
  )
}
