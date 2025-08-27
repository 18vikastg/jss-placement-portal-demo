import { motion } from 'framer-motion'

// Simple animated background component as fallback
export default function AnimatedBackground({ variant = 'brain' }) {
  const getElements = () => {
    switch (variant) {
      case 'brain':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated circles representing brain/knowledge */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-30"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-40"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        )
      
      case 'books':
        return (
          <div className="relative w-full h-full">
            {/* Floating book-like elements */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-8 h-10 rounded-sm shadow-lg opacity-30`}
                style={{
                  background: `linear-gradient(45deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 70%))`,
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        )
      
      case 'particles':
        return (
          <div className="relative w-full h-full">
            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-purple-400 opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {getElements()}
    </div>
  )
}
