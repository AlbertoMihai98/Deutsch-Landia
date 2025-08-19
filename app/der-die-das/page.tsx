'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Trophy,
  Volume2,
  RotateCcw,
  ChevronRight,
  Target,
  Zap,
  Award,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import confetti from 'canvas-confetti'

// Lista de cuvinte pentru A1
const cuvinteA1 = [
  { cuvant: "Buch", articol: "das", traducere: "carte", imagine: "📚" },
  { cuvant: "Tisch", articol: "der", traducere: "masă", imagine: "🪑" },
  { cuvant: "Lampe", articol: "die", traducere: "lampă", imagine: "💡" },
  { cuvant: "Stuhl", articol: "der", traducere: "scaun", imagine: "🪑" },
  { cuvant: "Fenster", articol: "das", traducere: "fereastră", imagine: "🪟" },
  { cuvant: "Tür", articol: "die", traducere: "ușă", imagine: "🚪" },
  { cuvant: "Auto", articol: "das", traducere: "mașină", imagine: "🚗" },
  { cuvant: "Ball", articol: "der", traducere: "minge", imagine: "⚽" },
  { cuvant: "Blume", articol: "die", traducere: "floare", imagine: "🌸" },
  { cuvant: "Baum", articol: "der", traducere: "copac", imagine: "🌳" },
  { cuvant: "Haus", articol: "das", traducere: "casă", imagine: "🏠" },
  { cuvant: "Schule", articol: "die", traducere: "școală", imagine: "🏫" },
  { cuvant: "Lehrer", articol: "der", traducere: "profesor", imagine: "👨‍🏫" },
  { cuvant: "Kind", articol: "das", traducere: "copil", imagine: "👶" },
  { cuvant: "Mutter", articol: "die", traducere: "mamă", imagine: "👩" },
  { cuvant: "Vater", articol: "der", traducere: "tată", imagine: "👨" },
  { cuvant: "Wasser", articol: "das", traducere: "apă", imagine: "💧" },
  { cuvant: "Milch", articol: "die", traducere: "lapte", imagine: "🥛" },
  { cuvant: "Brot", articol: "das", traducere: "pâine", imagine: "🍞" },
  { cuvant: "Apfel", articol: "der", traducere: "măr", imagine: "🍎" },
  { cuvant: "Banane", articol: "die", traducere: "banană", imagine: "🍌" },
  { cuvant: "Hund", articol: "der", traducere: "câine", imagine: "🐕" },
  { cuvant: "Katze", articol: "die", traducere: "pisică", imagine: "🐈" },
  { cuvant: "Maus", articol: "die", traducere: "șoarece", imagine: "🐭" },
  { cuvant: "Bett", articol: "das", traducere: "pat", imagine: "🛏️" },
  { cuvant: "Telefon", articol: "das", traducere: "telefon", imagine: "📱" },
  { cuvant: "Computer", articol: "der", traducere: "calculator", imagine: "💻" },
  { cuvant: "Tasche", articol: "die", traducere: "geantă", imagine: "👜" },
  { cuvant: "Schlüssel", articol: "der", traducere: "cheie", imagine: "🔑" },
  { cuvant: "Geld", articol: "das", traducere: "bani", imagine: "💰" }
]

// Lista pentru A2
const cuvinteA2 = [
  { cuvant: "Krankenhaus", articol: "das", traducere: "spital", imagine: "🏥" },
  { cuvant: "Flugzeug", articol: "das", traducere: "avion", imagine: "✈️" },
  { cuvant: "Bahnhof", articol: "der", traducere: "gară", imagine: "🚉" },
  { cuvant: "Brücke", articol: "die", traducere: "pod", imagine: "🌉" },
  { cuvant: "Geschäft", articol: "das", traducere: "magazin", imagine: "🏪" },
  { cuvant: "Restaurant", articol: "das", traducere: "restaurant", imagine: "🍴" },
  { cuvant: "Rechnung", articol: "die", traducere: "factură", imagine: "🧾" },
  { cuvant: "Kühlschrank", articol: "der", traducere: "frigider", imagine: "🧊" },
  { cuvant: "Wohnung", articol: "die", traducere: "apartament", imagine: "🏢" },
  { cuvant: "Nachbar", articol: "der", traducere: "vecin", imagine: "👋" }
]

export default function DerDieDasGame() {
  const [nivel, setNivel] = useState<'A1' | 'A2'>('A1')
  const [cuvinteCurente, setCuvinteCurente] = useState(cuvinteA1)
  const [indexCurent, setIndexCurent] = useState(0)
  const [scor, setScor] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [raspunsSelectat, setRaspunsSelectat] = useState<string | null>(null)
  const [arateFeedback, setArateFeedback] = useState(false)
  const [raspunsCorect, setRaspunsCorect] = useState(false)
  const [totalIntrebari, setTotalIntrebari] = useState(0)
  const [raspunsuriCorecte, setRaspunsuriCorecte] = useState(0)
  const [jocTerminat, setJocTerminat] = useState(false)

  const cuvantCurent = cuvinteCurente[indexCurent]

  useEffect(() => {
    setCuvinteCurente(nivel === 'A1' ? cuvinteA1 : cuvinteA2)
    resetGame()
  }, [nivel])

  const speak = (text: string) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    
    // Găsește cea mai bună voce disponibilă
    const voices = window.speechSynthesis.getVoices()
    const naturalVoices = voices.filter(v => 
      v.lang.includes('de') && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft'))
    )
    
    if (naturalVoices.length > 0) {
      utterance.voice = naturalVoices[0]
    }
    
    utterance.rate = 0.9
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  const handleArticleSelect = (articol: string) => {
    if (arateFeedback) return

    setRaspunsSelectat(articol)
    setTotalIntrebari(prev => prev + 1)
    
    const esteCorect = articol === cuvantCurent.articol
    setRaspunsCorect(esteCorect)
    setArateFeedback(true)

    if (esteCorect) {
      setScor(prev => prev + 10 + (streak * 2)) // Bonus pentru streak
      setStreak(prev => prev + 1)
      setRaspunsuriCorecte(prev => prev + 1)
      
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1)
      }

      // Sunet și confetti pentru răspuns corect
      speak(`${cuvantCurent.articol} ${cuvantCurent.cuvant}`)
      
      if ((streak + 1) % 5 === 0) {
        // Confetti pentru streak de 5
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    } else {
      setStreak(0)
      // Sunet de eroare
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE')
      audio.play()
      
      // După 1 secundă, arată răspunsul corect
      setTimeout(() => {
        speak(`${cuvantCurent.articol} ${cuvantCurent.cuvant}`)
      }, 1000)
    }

    // Treci la următorul cuvânt după 2.5 secunde
    setTimeout(() => {
      if (indexCurent < cuvinteCurente.length - 1) {
        setIndexCurent(prev => prev + 1)
        setRaspunsSelectat(null)
        setArateFeedback(false)
      } else {
        setJocTerminat(true)
      }
    }, 2500)
  }

  const resetGame = () => {
    setIndexCurent(0)
    setScor(0)
    setStreak(0)
    setRaspunsSelectat(null)
    setArateFeedback(false)
    setTotalIntrebari(0)
    setRaspunsuriCorecte(0)
    setJocTerminat(false)
  }

  const getButtonColor = (articol: string) => {
    if (!arateFeedback) {
      switch(articol) {
        case 'der': return 'from-blue-500 to-blue-600'
        case 'die': return 'from-pink-500 to-pink-600'
        case 'das': return 'from-green-500 to-green-600'
      }
    }

    if (raspunsSelectat === articol) {
      return raspunsCorect ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
    }

    if (articol === cuvantCurent.articol && !raspunsCorect) {
      return 'from-green-500 to-green-600 animate-pulse'
    }

    return 'from-gray-300 to-gray-400'
  }

  if (jocTerminat) {
    const procentaj = Math.round((raspunsuriCorecte / totalIntrebari) * 100)
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
        <Navigation />
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 shadow-2xl text-center"
            >
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Felicitări! 🎉
              </h2>
              
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-3xl font-bold text-blue-600">{scor}</p>
                  <p className="text-gray-600">Puncte Totale</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl">
                  <p className="text-3xl font-bold text-green-600">{procentaj}%</p>
                  <p className="text-gray-600">Acuratețe</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <p className="text-3xl font-bold text-purple-600">{bestStreak}</p>
                  <p className="text-gray-600">Cel Mai Bun Streak</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-2xl">
                  <p className="text-3xl font-bold text-yellow-600">{raspunsuriCorecte}/{totalIntrebari}</p>
                  <p className="text-gray-600">Răspunsuri Corecte</p>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition"
              >
                <RotateCcw className="inline-block w-5 h-5 mr-2" />
                Joacă Din Nou
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-green-600 bg-clip-text text-transparent">
                Der, Die sau Das?
              </span>
            </h1>
            <p className="text-xl text-gray-600">Ghicește articolul corect!</p>
          </motion.div>

          {/* Selector Nivel */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setNivel('A1')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                nivel === 'A1' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700'
              }`}
            >
              Nivel A1 🌱
            </button>
            <button
              onClick={() => setNivel('A2')}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                nivel === 'A2' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700'
              }`}
            >
              Nivel A2 🌿
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{scor}</p>
              <p className="text-xs text-gray-600">Puncte</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-xs text-gray-600">Streak</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{indexCurent + 1}/{cuvinteCurente.length}</p>
              <p className="text-xs text-gray-600">Progres</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{bestStreak}</p>
              <p className="text-xs text-gray-600">Best</p>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-full h-3 mb-8 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((indexCurent) / cuvinteCurente.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Game Card */}
          <motion.div
            key={indexCurent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
          >
            <div className="text-center mb-8">
              <motion.div 
                className="text-8xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {cuvantCurent.imagine}
              </motion.div>
              
              <h2 className="text-5xl font-bold mb-3 text-gray-800">
                {cuvantCurent.cuvant}
              </h2>
              
              <p className="text-xl text-gray-600 mb-4">({cuvantCurent.traducere})</p>
              
              <button
                onClick={() => speak(cuvantCurent.cuvant)}
                className="bg-purple-100 hover:bg-purple-200 p-3 rounded-full transition"
              >
                <Volume2 className="w-6 h-6 text-purple-600" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['der', 'die', 'das'].map((articol) => (
                <motion.button
                  key={articol}
                  onClick={() => handleArticleSelect(articol)}
                  disabled={arateFeedback}
                  className={`relative py-6 rounded-2xl font-bold text-2xl text-white shadow-lg transition-all bg-gradient-to-r ${getButtonColor(articol)}`}
                  whileHover={!arateFeedback ? { scale: 1.05 } : {}}
                  whileTap={!arateFeedback ? { scale: 0.95 } : {}}
                >
                  <span className="uppercase">{articol}</span>
                  
                  {arateFeedback && raspunsSelectat === articol && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3"
                    >
                      {raspunsCorect ? (
                        <div className="bg-green-500 rounded-full p-2">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="bg-red-500 rounded-full p-2">
                          <XCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {arateFeedback && !raspunsCorect && articol === cuvantCurent.articol && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Feedback Message */}
            <AnimatePresence>
              {arateFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-6 p-4 rounded-2xl text-center ${
                    raspunsCorect 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <p className="text-lg font-bold">
                    {raspunsCorect 
                      ? `Excelent! 🎉 ${cuvantCurent.articol} ${cuvantCurent.cuvant}` 
                      : `Răspuns corect: ${cuvantCurent.articol} ${cuvantCurent.cuvant}`}
                  </p>
                  {raspunsCorect && streak >= 3 && (
                    <p className="text-sm mt-1">Streak de {streak}! Continuă așa! 🔥</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tips */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-3 text-gray-800">💡 Sfaturi Rapide:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <span className="font-bold text-blue-600">DER</span>
                <p className="text-sm text-gray-600 mt-1">Masculin - majoritatea bărbaților, anotimpuri, zile</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-xl">
                <span className="font-bold text-pink-600">DIE</span>
                <p className="text-sm text-gray-600 mt-1">Feminin - majoritatea femeilor, numere, plante</p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <span className="font-bold text-green-600">DAS</span>
                <p className="text-sm text-gray-600 mt-1">Neutru - diminutive, metale, litere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}