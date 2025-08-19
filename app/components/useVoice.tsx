'use client'

import { useState, useEffect, useCallback } from 'react'

export function useNaturalVoice() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [bestVoice, setBestVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      
      const germanVoices = availableVoices.filter(v => 
        v.lang.includes('de') || v.lang.includes('DE')
      )
      
      const sortedVoices = germanVoices.sort((a, b) => {
        const getScore = (name: string) => {
          if (name.includes('Natural')) return 100
          if (name.includes('Google')) return 90
          if (name.includes('Microsoft')) return 80
          if (name.includes('Premium')) return 70
          return 10
        }
        return getScore(b.name) - getScore(a.name)
      })
      
      setVoices(sortedVoices)
      if (sortedVoices.length > 0) {
        setBestVoice(sortedVoices[0])
      }
    }

    loadVoices()
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((text: string, options?: {
    rate?: number
    pitch?: number
    volume?: number
    character?: 'felix' | 'bruno' | 'ollie' | 'normal'
  }) => {
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    
    if (bestVoice) {
      utterance.voice = bestVoice
    }
    
    switch(options?.character) {
      case 'felix':
        utterance.rate = options.rate || 0.95
        utterance.pitch = options.pitch || 1.2
        break
      case 'bruno':
        utterance.rate = options.rate || 0.85
        utterance.pitch = options.pitch || 0.9
        break
      case 'ollie':
        utterance.rate = options.rate || 0.9
        utterance.pitch = options.pitch || 1.0
        break
      default:
        utterance.rate = options?.rate || 0.9
        utterance.pitch = options?.pitch || 1.0
    }
    
    utterance.volume = options?.volume || 1.0
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }, [bestVoice])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return {
    speak,
    stop,
    isSpeaking,
    voices,
    bestVoice,
    isReady: voices.length > 0
  }
}