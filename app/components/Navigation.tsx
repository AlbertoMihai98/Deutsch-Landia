'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
  Star,
  Volume2,
  VolumeX,
  Settings
} from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                SchnellDeutsch
              </span>
              <span className="block text-xs text-gray-600">pentru copii</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
              <Home className="w-5 h-5" />
              <span className="font-medium">Acasă</span>
            </Link>
            
            <Link href="/lectii" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Lecții</span>
            </Link>
            
            <Link href="/der-die-das" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
              <Gamepad2 className="w-5 h-5" />
              <span className="font-medium">Der/Die/Das</span>
            </Link>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-700">1,250 puncte</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}