import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Lightbulb, Heart, Coffee, Target } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

export default function WelcomeHelper() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    {
      icon: Lightbulb,
      title: "Smart Learning Path",
      message: "Start with aptitude basics, then move to coding. Take breaks every 45 minutes!",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Heart,
      title: "Stay Motivated",
      message: "Remember why you started. Every small step counts towards your dream job!",
      color: "from-pink-400 to-red-400"
    },
    {
      icon: Coffee,
      title: "Healthy Habits",
      message: "Stay hydrated, get enough sleep, and don't forget to take care of yourself.",
      color: "from-brown-400 to-amber-400"
    },
    {
      icon: Target,
      title: "Goal Setting",
      message: "Set small daily goals. Consistency beats intensity in preparation!",
      color: "from-green-400 to-emerald-400"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length)
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isVisible, tips.length])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('welcomeHelperDismissed', 'true')
  }

  // Don't show if user has dismissed it before
  useEffect(() => {
    const dismissed = localStorage.getItem('welcomeHelperDismissed')
    if (dismissed) {
      setIsVisible(false)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className={`p-4 bg-gradient-to-r ${tips[currentTip].color} text-white relative`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-white hover:bg-white/20 w-6 h-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center gap-3 mb-2">
                  {React.createElement(tips[currentTip].icon, { className: "w-6 h-6" })}
                  <h3 className="font-semibold text-lg">{tips[currentTip].title}</h3>
                </div>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {tips[currentTip].message}
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Tip {currentTip + 1} of {tips.length}</span>
                  <div className="flex gap-1">
                    {tips.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTip ? 'bg-purple-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTip((prev) => (prev + 1) % tips.length)}
                  className="w-full mt-3 text-xs"
                >
                  Next Tip
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
