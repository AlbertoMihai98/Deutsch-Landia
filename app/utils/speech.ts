// Creează un fișier nou: app/utils/speech.ts

class EnhancedSpeech {
  private voices: SpeechSynthesisVoice[] = []
  private preferredVoices = [
    // Voci Google de calitate superioară
    'Google Deutsch',
    'Google DE',
    // Voci Microsoft Edge (foarte naturale)
    'Microsoft Katja Online (Natural) - German (Germany)',
    'Microsoft Conrad Online (Natural) - German (Germany)', 
    'Microsoft Amala Online (Natural) - German (Germany)',
    // Voci pentru copii
    'Microsoft Kasper - German (Germany)',
    // Voci alternative de calitate
    'Anna',
    'Petra',
    'Markus'
  ]

  constructor() {
    this.loadVoices()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.loadVoices()
    }
  }

  private loadVoices() {
    this.voices = speechSynthesis.getVoices()
    console.log('Voci disponibile:', this.voices.map(v => v.name))
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    // Caută cea mai bună voce disponibilă
    for (const preferredName of this.preferredVoices) {
      const voice = this.voices.find(v => 
        v.name.includes(preferredName) && 
        (v.lang.startsWith('de') || v.lang.startsWith('DE'))
      )
      if (voice) {
        console.log('Folosesc vocea:', voice.name)
        return voice
      }
    }

    // Fallback la orice voce germană
    const germanVoice = this.voices.find(v => v.lang.startsWith('de'))
    if (germanVoice) {
      console.log('Folosesc vocea fallback:', germanVoice.name)
      return germanVoice
    }

    return null
  }

  speak(text: string, options?: {
    rate?: number
    pitch?: number
    volume?: number
    voice?: 'child' | 'adult' | 'female' | 'male'
  }) {
    // Oprește orice vorbire anterioară
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Setează vocea
    const bestVoice = this.getBestVoice()
    if (bestVoice) {
      utterance.voice = bestVoice
    }
    
    utterance.lang = 'de-DE'
    
    // Setări optimizate pentru naturalețe
    utterance.rate = options?.rate || 0.9  // Puțin mai lent
    utterance.pitch = options?.pitch || 1.0  // Pitch natural
    utterance.volume = options?.volume || 1.0

    // Adaugă pauze naturale
    const textWithPauses = text
      .replace(/\./g, '...')  // Pauză mai lungă la punct
      .replace(/,/g, '..')    // Pauză la virgulă
      .replace(/!/g, '!..')   // Pauză după exclamare
      .replace(/\?/g, '?..')  // Pauză după întrebare

    utterance.text = textWithPauses

    return new Promise((resolve, reject) => {
      utterance.onend = () => resolve(true)
      utterance.onerror = (error) => reject(error)
      speechSynthesis.speak(utterance)
    })
  }

  // Metodă specială pentru voce de copil/personaj
  speakAsCharacter(text: string, character: 'felix' | 'bruno' | 'ollie') {
    const settings = {
      felix: { pitch: 1.3, rate: 0.95 },  // Vulpe - voce mai înaltă
      bruno: { pitch: 0.9, rate: 0.85 },  // Urs - voce mai joasă
      ollie: { pitch: 1.1, rate: 0.9 }    // Bufniță - voce înțeleaptă
    }

    return this.speak(text, settings[character])
  }
}

// Export instance singleton
export const enhancedSpeech = new EnhancedSpeech()

// =============================================================
// ALTERNATIVĂ: Folosește API-ul ResponsiveVoice (mai natural)
// =============================================================

export class NaturalVoice {
  private script: HTMLScriptElement | null = null
  
  async init() {
    // Încarcă ResponsiveVoice (gratuit pentru uz non-comercial)
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && !this.script) {
        this.script = document.createElement('script')
        this.script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=YOUR_KEY'
        this.script.onload = () => {
          console.log('ResponsiveVoice încărcat')
          resolve(true)
        }
        document.head.appendChild(this.script)
      } else {
        resolve(true)
      }
    })
  }

  speak(text: string, character?: string) {
    if (typeof window !== 'undefined' && (window as any).responsiveVoice) {
      const voice = 'Deutsch Female'  // Sau 'Deutsch Male'
      const params = {
        pitch: character === 'felix' ? 1.3 : 1,
        rate: 0.9,
        volume: 1
      }
      
      (window as any).responsiveVoice.speak(text, voice, params)
    } else {
      // Fallback la Web Speech API
      enhancedSpeech.speak(text)
    }
  }

  cancel() {
    if (typeof window !== 'undefined' && (window as any).responsiveVoice) {
      (window as any).responsiveVoice.cancel()
    } else {
      speechSynthesis.cancel()
    }
  }
}

export const naturalVoice = new NaturalVoice()

// =============================================================
// OPȚIUNEA PREMIUM: Folosește ElevenLabs AI (voci ultra-realiste)
// =============================================================

export class PremiumVoice {
  private apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_KEY || ''
  
  async speak(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB') {
    // Adam - voce masculină naturală
    // Pentru copii: 'jsCqWAovK2LkecY7zXl4' (Freya)
    
    if (!this.apiKey) {
      // Fallback la enhanced speech
      return enhancedSpeech.speak(text)
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.5,
              use_speaker_boost: true
            }
          })
        }
      )

      if (response.ok) {
        const audioBlob = await response.blob()
        const audio = new Audio(URL.createObjectURL(audioBlob))
        audio.play()
      } else {
        // Fallback
        enhancedSpeech.speak(text)
      }
    } catch (error) {
      console.error('Eroare ElevenLabs:', error)
      enhancedSpeech.speak(text)
    }
  }
}

// =============================================================
// Hook React pentru voce
// =============================================================

import { useState, useEffect } from 'react'

export function useVoice() {
  const [isReady, setIsReady] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    // Așteaptă să se încarce vocile
    const checkVoices = () => {
      if (speechSynthesis.getVoices().length > 0) {
        setIsReady(true)
      }
    }

    checkVoices()
    speechSynthesis.addEventListener('voiceschanged', checkVoices)

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', checkVoices)
    }
  }, [])

  const speak = async (text: string, character?: string) => {
    setIsSpeaking(true)
    
    try {
      if (character) {
        await enhancedSpeech.speakAsCharacter(
          text, 
          character as 'felix' | 'bruno' | 'ollie'
        )
      } else {
        await enhancedSpeech.speak(text)
      }
    } catch (error) {
      console.error('Eroare vorbire:', error)
    } finally {
      setIsSpeaking(false)
    }
  }

  const stop = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return {
    speak,
    stop,
    isReady,
    isSpeaking
  }
}