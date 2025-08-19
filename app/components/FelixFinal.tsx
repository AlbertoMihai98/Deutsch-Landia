// app/components/FelixFinal.tsx

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNaturalVoice } from './useVoice'
import { Volume2 } from 'lucide-react'

export default function FelixFinal() {
  const [speechBubble, setSpeechBubble] = useState('')
  const [hasSpoken, setHasSpoken] = useState(false)
  const { speak, isSpeaking, bestVoice } = useNaturalVoice()
  
  const handleClick = () => {
    const phrases = [
      { 
        de: "Hallo! Ich bin Felix der Fuchs!", 
        ro: "Salut! Sunt Felix Vulpea! 🦊" 
      },
      { 
        de: "Lass uns zusammen lernen!", 
        ro: "Hai să învățăm împreună! 📚" 
      },
      { 
        de: "Du machst das super!", 
        ro: "Te descurci super! ⭐" 
      }
    ]

    const phrase = hasSpoken 
      ? phrases[Math.floor(Math.random() * phrases.length)]
      : phrases[0]

    setSpeechBubble(phrase.ro)
    speak(phrase.de, { character: 'felix' })
    
    if (!hasSpoken) setHasSpoken(true)
    
    // Ascunde bubble după 3 secunde
    setTimeout(() => setSpeechBubble(''), 3000)
  }

  return (
    <div className="relative">
      {/* Speech Bubble */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-xl whitespace-nowrap z-20"
          >
            <p className="text-sm font-bold">{speechBubble}</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Felix */}
      <motion.div
        className="text-8xl cursor-pointer select-none"
        animate={{ 
          rotate: isSpeaking ? [-5, 5, -5] : 0,
          scale: isSpeaking ? 1.1 : 1
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        transition={{ 
          rotate: { repeat: Infinity, duration: 0.5 },
          scale: { duration: 0.2 }
        }}
      >
        🦊
      </motion.div>

      {/* Indicator */}
      {!hasSpoken && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            Click pe mine!
          </div>
        </motion.div>
      )}

      {/* Voice Info */}
      {bestVoice && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xs text-gray-400">
            {bestVoice.name.includes('Natural') && '✨ Voce naturală'}
          </p>
        </div>
      )}
    </div>
  )
}