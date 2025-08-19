'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import { 
  Lock, 
  CheckCircle, 
  Play, 
  Star, 
  Trophy,
  ChevronRight,
  BookOpen,
  Headphones,
  PenTool,
  MessageSquare,
  Award,
  Zap,
  Target
} from 'lucide-react'

// Structura lecțiilor A1
const lectiiA1 = [
  {
    id: 1,
    titlu: "Begrüßung",
    romana: "Salutări",
    descriere: "Învață să saluți în germană",
    vocabular: ["Hallo", "Guten Tag", "Guten Morgen", "Auf Wiedersehen"],
    gramatica: "Pronunția de bază",
    completat: true,
    puncte: 100
  },
  {
    id: 2,
    titlu: "Sich vorstellen",
    romana: "A te prezenta",
    descriere: "Spune-ți numele și vârsta",
    vocabular: ["Ich heiße...", "Ich bin... Jahre alt", "Ich komme aus..."],
    gramatica: "Verbul 'sein' (a fi)",
    completat: true,
    puncte: 100
  },
  {
    id: 3,
    titlu: "Zahlen 1-20",
    romana: "Numere 1-20",
    descriere: "Numără până la 20",
    vocabular: ["eins", "zwei", "drei", "vier", "fünf"],
    gramatica: "Numerele cardinale",
    completat: false,
    puncte: 150
  },
  {
    id: 4,
    titlu: "Die Familie",
    romana: "Familia",
    descriere: "Membrii familiei",
    vocabular: ["der Vater", "die Mutter", "der Bruder", "die Schwester"],
    gramatica: "Articolele der/die/das",
    completat: false,
    puncte: 150
  },
  {
    id: 5,
    titlu: "Die Farben",
    romana: "Culorile",
    descriere: "Învață culorile de bază",
    vocabular: ["rot", "blau", "grün", "gelb", "schwarz", "weiß"],
    gramatica: "Adjectivele predicative",
    completat: false,
    puncte: 100
  },
  {
    id: 6,
    titlu: "Die Wochentage",
    romana: "Zilele săptămânii",
    descriere: "Luni până duminică",
    vocabular: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
    gramatica: "Expresii de timp",
    completat: false,
    puncte: 120
  },
  {
    id: 7,
    titlu: "Das Essen",
    romana: "Mâncarea",
    descriere: "Alimente de bază",
    vocabular: ["das Brot", "die Milch", "der Apfel", "das Wasser"],
    gramatica: "Pluralul substantivelor",
    completat: false,
    puncte: 150
  },
  {
    id: 8,
    titlu: "Im Klassenzimmer",
    romana: "În clasă",
    descriere: "Obiecte școlare",
    vocabular: ["der Tisch", "der Stuhl", "das Buch", "der Stift"],
    gramatica: "Prepoziții de loc",
    completat: false,
    puncte: 130
  },
  {
    id: 9,
    titlu: "Die Uhrzeit",
    romana: "Ora",
    descriere: "Spune cât e ceasul",
    vocabular: ["Es ist... Uhr", "halb", "Viertel", "nach", "vor"],
    gramatica: "Exprimarea timpului",
    completat: false,
    puncte: 180
  },
  {
    id: 10,
    titlu: "Das Wetter",
    romana: "Vremea",
    descriere: "Cum e vremea?",
    vocabular: ["Es regnet", "Die Sonne scheint", "Es schneit", "Es ist kalt"],
    gramatica: "Verbele impersonale",
    completat: false,
    puncte: 140
  }
]

// Structura lecțiilor A2
const lectiiA2 = [
  {
    id: 1,
    titlu: "Im Restaurant",
    romana: "La restaurant",
    descriere: "Comandă mâncare și băuturi",
    vocabular: ["die Speisekarte", "bestellen", "die Rechnung", "zahlen"],
    gramatica: "Conjunctivul de politețe",
    completat: false,
    puncte: 200
  },
  {
    id: 2,
    titlu: "Die Kleidung",
    romana: "Îmbrăcămintea",
    descriere: "Haine și accesorii",
    vocabular: ["die Hose", "das Hemd", "die Schuhe", "der Mantel"],
    gramatica: "Adjectivele posesive",
    completat: false,
    puncte: 180
  },
  {
    id: 3,
    titlu: "Beim Arzt",
    romana: "La doctor",
    descriere: "Sănătate și corp",
    vocabular: ["der Kopf", "der Bauch", "Schmerzen", "krank"],
    gramatica: "Perfectul compus",
    completat: false,
    puncte: 220
  },
  {
    id: 4,
    titlu: "Die Verkehrsmittel",
    romana: "Mijloace de transport",
    descriere: "Cum călătorim",
    vocabular: ["der Bus", "die U-Bahn", "das Auto", "das Fahrrad"],
    gramatica: "Verbele modale",
    completat: false,
    puncte: 200
  },
  {
    id: 5,
    titlu: "Hobbys und Freizeit",
    romana: "Hobby-uri și timp liber",
    descriere: "Ce îți place să faci",
    vocabular: ["spielen", "lesen", "schwimmen", "tanzen", "singen"],
    gramatica: "Verbele reflexive",
    completat: false,
    puncte: 190
  }
]

// Componenta pentru Lecție Detaliată
function LessonModal({ lesson, onClose }: any) {
  const [currentSection, setCurrentSection] = useState<'vocab' | 'grammar' | 'practice'>('vocab')
  
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    
    // Găsește cea mai bună voce
    const voices = window.speechSynthesis.getVoices()
    const bestVoice = voices.find(v => 
      v.lang.includes('de') && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft'))
    )
    
    if (bestVoice) {
      utterance.voice = bestVoice
    }
    
    utterance.rate = 0.9
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-t-3xl">
          <h2 className="text-3xl font-bold text-white mb-2">{lesson.titlu}</h2>
          <p className="text-white/90">{lesson.romana} • {lesson.descriere}</p>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setCurrentSection('vocab')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                currentSection === 'vocab' 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              📚 Vocabular
            </button>
            <button
              onClick={() => setCurrentSection('grammar')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                currentSection === 'grammar' 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              📖 Gramatică
            </button>
            <button
              onClick={() => setCurrentSection('practice')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                currentSection === 'practice' 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ✏️ Practică
            </button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {currentSection === 'vocab' && (
              <motion.div
                key="vocab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Vocabular Nou 🎯</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {lesson.vocabular.map((word: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl cursor-pointer hover:shadow-lg transition"
                      onClick={() => speak(word)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-gray-800">{word}</p>
                          <p className="text-gray-600">Click pentru pronunție</p>
                        </div>
                        <Headphones className="w-8 h-8 text-purple-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentSection === 'grammar' && (
              <motion.div
                key="grammar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Gramatică 📝</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold mb-3 text-gray-800">{lesson.gramatica}</h4>
                  
                  {lesson.id === 2 && lesson.titlu === "Sich vorstellen" && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl">
                        <p className="font-bold text-purple-600 mb-2">Verbul "sein" (a fi):</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>ich bin - eu sunt</div>
                          <div>du bist - tu ești</div>
                          <div>er/sie/es ist - el/ea este</div>
                          <div>wir sind - noi suntem</div>
                          <div>ihr seid - voi sunteți</div>
                          <div>sie sind - ei/ele sunt</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-xl">
                        <p className="font-bold text-purple-600 mb-2">Exemple:</p>
                        <ul className="space-y-1">
                          <li>• Ich <span className="text-red-500 font-bold">bin</span> Max.</li>
                          <li>• Du <span className="text-red-500 font-bold">bist</span> 10 Jahre alt.</li>
                          <li>• Sie <span className="text-red-500 font-bold">ist</span> aus Deutschland.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {lesson.id === 4 && lesson.titlu === "Die Familie" && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl">
                        <p className="font-bold text-purple-600 mb-2">Articolele definite:</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">DER</p>
                            <p className="text-sm">Masculin</p>
                          </div>
                          <div className="bg-pink-100 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-pink-600">DIE</p>
                            <p className="text-sm">Feminin</p>
                          </div>
                          <div className="bg-green-100 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">DAS</p>
                            <p className="text-sm">Neutru</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-600 mt-4">
                    Practică această regulă în exercițiile următoare!
                  </p>
                </div>
              </motion.div>
            )}

            {currentSection === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Exersează! 💪</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg mb-3">Completează propoziția:</h4>
                    <p className="text-xl mb-4">Ich _____ Maria.</p>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="bg-white p-3 rounded-xl hover:bg-green-100 transition">
                        bin
                      </button>
                      <button className="bg-white p-3 rounded-xl hover:bg-red-100 transition">
                        bist
                      </button>
                      <button className="bg-white p-3 rounded-xl hover:bg-red-100 transition">
                        ist
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg mb-3">Ascultă și repetă:</h4>
                    <button
                      onClick={() => speak("Guten Tag, ich heiße Felix")}
                      className="w-full bg-white p-4 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-3"
                    >
                      <Play className="w-6 h-6 text-purple-600" />
                      <span className="text-lg">Guten Tag, ich heiße Felix</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition"
            >
              Închide
            </button>
            
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold hover:shadow-lg transition flex items-center gap-2">
              Lecție Completă
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LectiiPage() {
  const [nivelSelectat, setNivelSelectat] = useState<'A1' | 'A2'>('A1')
  const [lectieSelectata, setLectieSelectata] = useState<any>(null)
  
  const lectiiCurente = nivelSelectat === 'A1' ? lectiiA1 : lectiiA2
  const totalPuncte = lectiiCurente.reduce((acc, l) => acc + (l.completat ? l.puncte : 0), 0)
  const progres = (lectiiCurente.filter(l => l.completat).length / lectiiCurente.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lecții de Germană
              </span>
            </h1>
            <p className="text-xl text-gray-600">Alege nivelul tău și începe să înveți!</p>
            
            {/* Selector Nivel */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => setNivelSelectat('A1')}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  nivelSelectat === 'A1'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌱</span>
                  <div className="text-left">
                    <p className="text-xl">Nivel A1</p>
                    <p className="text-sm opacity-80">Începător</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setNivelSelectat('A2')}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  nivelSelectat === 'A2'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌿</span>
                  <div className="text-left">
                    <p className="text-xl">Nivel A2</p>
                    <p className="text-sm opacity-80">Elementar</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <span className="text-3xl font-bold text-gray-800">{totalPuncte}</span>
              </div>
              <p className="text-gray-600">Puncte Totale</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold text-gray-800">{Math.round(progres)}%</span>
              </div>
              <p className="text-gray-600">Progres {nivelSelectat}</p>
              <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progres}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-purple-500" />
                <span className="text-3xl font-bold text-gray-800">
                  {lectiiCurente.filter(l => l.completat).length}/{lectiiCurente.length}
                </span>
              </div>
              <p className="text-gray-600">Lecții Complete</p>
            </div>
          </motion.div>

          {/* Lista Lecții */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectiiCurente.map((lectie, index) => (
              <motion.div
                key={lectie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <div className={`bg-white rounded-2xl p-6 shadow-lg ${
                  !lectie.completat && index > 2 ? 'opacity-60' : ''
                }`}>
                  {lectie.completat && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  {!lectie.completat && index > 2 && (
                    <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-2">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                      <span className="text-2xl font-bold text-purple-600">
                        {String(lectie.id).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-700">{lectie.puncte}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1">{lectie.titlu}</h3>
                  <p className="text-gray-600 mb-2">{lectie.romana}</p>
                  <p className="text-sm text-gray-500 mb-4">{lectie.descriere}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      📚 {lectie.vocabular.length} cuvinte
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      📖 {lectie.gramatica}
                    </span>
                  </div>

                  <button
                    onClick={() => setLectieSelectata(lectie)}
                    disabled={!lectie.completat && index > 2}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      lectie.completat 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
                        : !lectie.completat && index > 2
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {lectie.completat ? 'Repetă' : index > 2 ? 'Blocat' : 'Începe'}
                    {(!lectie.completat && index <= 2) && <ChevronRight className="inline-block w-5 h-5 ml-2" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Lecție */}
      <AnimatePresence>
        {lectieSelectata && (
          <LessonModal 
            lesson={lectieSelectata} 
            onClose={() => setLectieSelectata(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}