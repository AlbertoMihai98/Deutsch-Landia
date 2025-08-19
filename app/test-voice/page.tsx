'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Mic } from 'lucide-react'

// Felix cu sistem de voce îmbunătățit
export default function FelixEnhanced() {
  const [isTalking, setIsTalking] = useState(false)
  const [speechBubble, setSpeechBubble] = useState('')
  const [hasSpoken, setHasSpoken] = useState(false)
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      
      // Filtrează și sortează vocile germane după calitate
      const germanVoices = voices.filter(v => 
        v.lang.includes('de') || v.lang.includes('DE')
      ).sort((a, b) => {
        // Prioritizează vocile Google și Microsoft Natural
        const scoreA = getVoiceScore(a.name)
        const scoreB = getVoiceScore(b.name)
        return scoreB - scoreA
      })

      console.log('Voci germane găsite:', germanVoices.map(v => v.name))
      setAvailableVoices(germanVoices)
      
      // Selectează cea mai bună voce
      if (germanVoices.length > 0) {
        setCurrentVoice(germanVoices[0])
      }
    }

    loadVoices()
    speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [])

  const getVoiceScore = (name: string): number => {
    // Sistem de scoring pentru voci
    if (name.includes('Natural')) return 100  // Microsoft Natural voices
    if (name.includes('Google')) return 90    // Google voices
    if (name.includes('Microsoft')) return 80 // Other Microsoft voices
    if (name.includes('Premium')) return 70   // Premium voices
    if (name.includes('Enhanced')) return 60  // Enhanced voices
    return 10 // Default voices
  }

  const speak = async (text: string) => {
    // Oprește orice vorbire anterioară
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance()
    
    // Procesează textul pentru pronunție mai naturală
    const processedText = text
      .replace(/\./g, '...')   // Pauze mai lungi la punct
      .replace(/!/g, '!..')    // Pauză după exclamare
      .replace(/,/g, ',.')     // Pauză scurtă la virgulă
      .replace(/\?/g, '?..')   // Pauză după întrebare

    utterance.text = processedText
    utterance.lang = 'de-DE'
    
    // Folosește cea mai bună voce disponibilă
    if (currentVoice) {
      utterance.voice = currentVoice
      console.log('Folosesc vocea:', currentVoice.name)
    }
    
    // Setări optimizate pentru fiecare tip de voce
    if (currentVoice?.name.includes('Natural')) {
      // Voci Microsoft Natural - foarte realiste
      utterance.rate = 1.0
      utterance.pitch = 1.1
      utterance.volume = 1.0
    } else if (currentVoice?.name.includes('Google')) {
      // Voci Google - bune dar mai robotice
      utterance.rate = 0.95
      utterance.pitch = 1.15
      utterance.volume = 1.0
    } else {
      // Voci standard - necesită ajustări
      utterance.rate = 0.85
      utterance.pitch = 1.2
      utterance.volume = 1.0
    }

    utterance.onstart = () => {
      setIsTalking(true)
    }
    
    utterance.onend = () => {
      setIsTalking(false)
      setTimeout(() => setSpeechBubble(''), 3000)
    }
    
    utterance.onerror = (error) => {
      console.error('Eroare vorbire:', error)
      setIsTalking(false)
    }

    speechSynthesis.speak(utterance)
  }

  const handleClick = () => {
    const phrases = [
      { 
        de: "Hallo! Ich bin Felix der Fuchs! Willkommen bei SchnellDeutsch!", 
        ro: "Salut! Sunt Felix Vulpea! Bine ai venit la SchnellDeutsch! 🦊" 
      },
      { 
        de: "Lass uns zusammen Deutsch lernen! Es macht Spaß!", 
        ro: "Hai să învățăm germană împreună! E distractiv! 🎉" 
      },
      { 
        de: "Du bist super! Weiter so, mein Freund!", 
        ro: "Ești super! Continuă așa, prietene! ⭐" 
      },
      { 
        de: "Deutsch ist wie ein lustiges Abenteuer!", 
        ro: "Germana e ca o aventură distractivă! 🚀" 
      }
    ]

    const phrase = hasSpoken 
      ? phrases[Math.floor(Math.random() * phrases.length)]
      : phrases[0]

    setSpeechBubble(phrase.ro)
    speak(phrase.de)
    
    if (!hasSpoken) setHasSpoken(true)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Selector de voce pentru testare */}
      {availableVoices.length > 1 && (
        <div className="bg-white rounded-xl p-4 shadow-lg w-full max-w-md">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Alege vocea (pentru testare):
          </label>
          <select
            value={currentVoice?.name || ''}
            onChange={(e) => {
              const voice = availableVoices.find(v => v.name === e.target.value)
              if (voice) setCurrentVoice(voice)
            }}
            className="w-full p-2 border rounded-lg text-sm"
          >
            {availableVoices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} {voice.name.includes('Natural') && '⭐'}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            ⭐ = Voce naturală de calitate superioară
          </p>
        </div>
      )}

      {/* Felix */}
      <div className="relative">
        <AnimatePresence>
          {speechBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-6 py-4 shadow-2xl min-w-[280px] text-center z-20 border-2 border-orange-200"
            >
              <p className="text-sm font-bold text-gray-800">{speechBubble}</p>
              {isTalking && (
                <motion.div 
                  className="flex justify-center gap-1 mt-2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                </motion.div>
              )}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-r-2 border-b-2 border-orange-200"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="text-8xl cursor-pointer select-none"
          animate={{ 
            rotate: isTalking ? [-5, 5, -5] : 0,
            scale: isTalking ? 1.1 : 1
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          🦊
        </motion.div>

        {!hasSpoken && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Click să vorbesc!
            </div>
          </motion.div>
        )}
      </div>

      {/* Info despre voce */}
      {currentVoice && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Voce: {currentVoice.name}
          </p>
          {!currentVoice.name.includes('Natural') && !currentVoice.name.includes('Google') && (
            <p className="text-xs text-orange-500 mt-1">
              💡 Pentru voce mai naturală, folosește Chrome/Edge pe Windows 10/11
            </p>
          )}
        </div>
      )}
    </div>
  )
}