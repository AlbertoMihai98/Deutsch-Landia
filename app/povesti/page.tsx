'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { useNaturalVoice } from '../components/useVoice'
import { 
  BookOpen, 
  Volume2, 
  Clock,
  Star,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

// Povești pentru fiecare nivel
const povestiData = {
  A1: [
    {
      id: 1,
      titlu: 'Meine Familie',
      descriere: 'O poveste despre familie',
      durata: '5 min',
      cuvinte: 150,
      text: `Ich heiße Anna. Ich bin 10 Jahre alt. Ich habe eine große Familie. 
      Mein Vater heißt Klaus. Er ist 40 Jahre alt. Er ist Lehrer. 
      Meine Mutter heißt Maria. Sie ist 38 Jahre alt. Sie ist Ärztin.
      Ich habe einen Bruder. Er heißt Tom. Tom ist 8 Jahre alt.
      Ich habe auch eine Schwester. Sie heißt Lisa. Lisa ist 5 Jahre alt.
      Wir wohnen in Berlin. Unser Haus ist groß und schön.
      Wir haben einen Hund. Der Hund heißt Max. Max ist braun und klein.
      Ich liebe meine Familie sehr!`,
      vocabular: ['die Familie', 'der Vater', 'die Mutter', 'der Bruder', 'die Schwester', 'der Hund'],
      intrebari: [
        { q: 'Wie alt ist Anna?', a: '10 Jahre alt' },
        { q: 'Wie heißt der Hund?', a: 'Max' }
      ]
    },
    {
      id: 2,
      titlu: 'Ein Tag im Park',
      descriere: 'O zi frumoasă în parc',
      durata: '4 min',
      cuvinte: 120,
      text: `Heute ist Samstag. Das Wetter ist schön. Die Sonne scheint.
      Ich gehe mit meiner Familie in den Park. Der Park ist groß und grün.
      Im Park sind viele Menschen. Kinder spielen Fußball.
      Wir machen ein Picknick. Wir essen Brot, Käse und Äpfel.
      Meine Schwester spielt mit dem Ball. Mein Bruder liest ein Buch.
      Ich spiele mit meinem Freund Max. Wir laufen und lachen.
      Um 5 Uhr gehen wir nach Hause. Es war ein schöner Tag!`,
      vocabular: ['der Park', 'das Wetter', 'die Sonne', 'das Picknick', 'spielen'],
      intrebari: [
        { q: 'Welcher Tag ist heute?', a: 'Samstag' },
        { q: 'Was machen sie im Park?', a: 'Ein Picknick' }
      ]
    },
    {
      id: 3,
      titlu: 'Mein Haustier',
      descriere: 'Povestea despre animalul meu',
      durata: '3 min',
      cuvinte: 100
    },
    {
      id: 4,
      titlu: 'Die Schule',
      descriere: 'Prima zi de școală',
      durata: '5 min',
      cuvinte: 140
    },
    {
      id: 5,
      titlu: 'Der Geburtstag',
      descriere: 'Ziua mea de naștere',
      durata: '4 min',
      cuvinte: 130
    }
  ],
  A2: [
    {
      id: 1,
      titlu: 'Die Reise nach München',
      descriere: 'O călătorie la München',
      durata: '8 min',
      cuvinte: 300,
      text: `Letzten Sommer bin ich mit meinen Eltern nach München gefahren. 
      Die Reise war sehr interessant. Wir sind mit dem Zug gefahren.
      Die Fahrt hat 8 Stunden gedauert. Im Zug haben wir gelesen und gespielt.
      
      In München haben wir in einem Hotel übernachtet. Das Hotel war im Zentrum.
      Am ersten Tag haben wir die Altstadt besucht. Der Marienplatz war wunderschön.
      Wir haben viele Fotos gemacht. Am Abend sind wir in ein Restaurant gegangen.
      Wir haben bayerische Spezialitäten gegessen. Das Essen war lecker!
      
      Am zweiten Tag sind wir ins Deutsche Museum gegangen. Das Museum war riesig.
      Wir haben viele interessante Sachen gesehen. Am Nachmittag waren wir im Englischen Garten.
      Der Park war sehr groß und grün. Viele Menschen haben dort Sport gemacht.
      
      Die Reise war toll! Ich möchte nächstes Jahr wieder nach München fahren.`,
      vocabular: ['die Reise', 'der Zug', 'übernachten', 'das Museum', 'bayerisch'],
      intrebari: [
        { q: 'Womit sind sie nach München gefahren?', a: 'Mit dem Zug' },
        { q: 'Was haben sie am ersten Tag besucht?', a: 'Die Altstadt' }
      ]
    },
    {
      id: 2,
      titlu: 'Der neue Job',
      descriere: 'Primul job',
      durata: '7 min',
      cuvinte: 250
    },
    {
      id: 3,
      titlu: 'Im Restaurant',
      descriere: 'Seară la restaurant',
      durata: '6 min',
      cuvinte: 220
    }
  ],
  B1: [
    {
      id: 1,
      titlu: 'Die Umweltschutz-Initiative',
      descriere: 'O inițiativă ecologică',
      durata: '12 min',
      cuvinte: 500,
      text: `In unserer Stadt gibt es seit einem Jahr eine neue Umweltschutz-Initiative...`
    },
    {
      id: 2,
      titlu: 'Das Vorstellungsgespräch',
      descriere: 'Interviu de angajare',
      durata: '10 min',
      cuvinte: 450
    }
  ],
  B2: [
    {
      id: 1,
      titlu: 'Die Digitalisierung im Alltag',
      descriere: 'Tehnologia în viața cotidiană',
      durata: '15 min',
      cuvinte: 700
    },
    {
      id: 2,
      titlu: 'Kulturelle Unterschiede',
      descriere: 'Diferențe culturale',
      durata: '14 min',
      cuvinte: 650
    }
  ],
  C1: [
    {
      id: 1,
      titlu: 'Die Globalisierung und ihre Folgen',
      descriere: 'Impactul globalizării',
      durata: '20 min',
      cuvinte: 1000
    },
    {
      id: 2,
      titlu: 'Künstliche Intelligenz',
      descriere: 'Inteligența artificială',
      durata: '18 min',
      cuvinte: 900
    }
  ],
  C2: [
    {
      id: 1,
      titlu: 'Philosophische Betrachtungen',
      descriere: 'Reflecții filozofice',
      durata: '25 min',
      cuvinte: 1200
    },
    {
      id: 2,
      titlu: 'Die Zukunft der Menschheit',
      descriere: 'Viitorul umanității',
      durata: '22 min',
      cuvinte: 1100
    }
  ]
}

export default function PovestiPage() {
  const [nivelSelectat, setNivelSelectat] = useState<keyof typeof povestiData>('A1')
  const [povesteSelectata, setPovesteSelectata] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { speak, stop } = useNaturalVoice()

  const niveluri = [
    { key: 'A1', label: 'A1 - Începător', color: 'from-green-400 to-emerald-500', emoji: '🌱' },
    { key: 'A2', label: 'A2 - Elementar', color: 'from-blue-400 to-cyan-500', emoji: '🌿' },
    { key: 'B1', label: 'B1 - Intermediar', color: 'from-purple-400 to-indigo-500', emoji: '🌳' },
    { key: 'B2', label: 'B2 - Avansat', color: 'from-orange-400 to-red-500', emoji: '🎓' },
    { key: 'C1', label: 'C1 - Experimentat', color: 'from-pink-400 to-rose-500', emoji: '🏆' },
    { key: 'C2', label: 'C2 - Expert', color: 'from-indigo-400 to-purple-600', emoji: '👑' }
  ]

  const handlePlayStory = () => {
    if (isPlaying) {
      stop()
      setIsPlaying(false)
    } else {
      speak(povesteSelectata.text)
      setIsPlaying(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      <EnhancedNavigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Povești în Germană
              </span>
            </h1>
            <p className="text-xl text-gray-600">Citește și ascultă povești adaptate nivelului tău</p>
          </motion.div>

          {/* Selector Nivel */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {niveluri.map((nivel) => (
              <motion.button
                key={nivel.key}
                onClick={() => setNivelSelectat(nivel.key as keyof typeof povestiData)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  nivelSelectat === nivel.key
                    ? `bg-gradient-to-r ${nivel.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{nivel.emoji}</span>
                  <span>{nivel.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Lista Povești */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {povestiData[nivelSelectat].map((poveste, index) => (
              <motion.div
                key={poveste.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer"
                onClick={() => setPovesteSelectata(poveste)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{poveste.durata}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{poveste.titlu}</h3>
                <p className="text-gray-600 mb-3">{poveste.descriere}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{poveste.cuvinte} cuvinte</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 3 ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Citește Povestea
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Poveste */}
      <AnimatePresence>
        {povesteSelectata && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setPovesteSelectata(null)
              stop()
              setIsPlaying(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl">
                <h2 className="text-3xl font-bold text-white mb-2">{povesteSelectata.titlu}</h2>
                <div className="flex items-center gap-4 text-white/90">
                  <span>{povesteSelectata.durata}</span>
                  <span>•</span>
                  <span>{povesteSelectata.cuvinte} cuvinte</span>
                </div>
              </div>

              <div className="p-6">
                {/* Control Audio */}
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={handlePlayStory}
                    className="bg-purple-100 hover:bg-purple-200 p-3 rounded-full transition"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 text-purple-600" /> : <Play className="w-6 h-6 text-purple-600" />}
                  </button>
                  <button
                    onClick={() => {
                      stop()
                      setIsPlaying(false)
                    }}
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
                  >
                    <RotateCcw className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Text Poveste */}
                {povesteSelectata.text && (
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <p className="text-lg leading-relaxed whitespace-pre-line">{povesteSelectata.text}</p>
                  </div>
                )}

                {/* Vocabular */}
                {povesteSelectata.vocabular && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Vocabular Important</h3>
                    <div className="flex flex-wrap gap-2">
                      {povesteSelectata.vocabular.map((word: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => speak(word)}
                          className="bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full text-purple-700 font-medium transition"
                        >
                          {word} 🔊
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Întrebări */}
                {povesteSelectata.intrebari && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Întrebări de Înțelegere</h3>
                    <div className="space-y-3">
                      {povesteSelectata.intrebari.map((item: any, i: number) => (
                        <div key={i} className="bg-blue-50 p-4 rounded-xl">
                          <p className="font-bold text-blue-700">{item.q}</p>
                          <p className="text-gray-600 mt-1">Răspuns: {item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setPovesteSelectata(null)
                    stop()
                    setIsPlaying(false)
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-300 transition"
                >
                  Închide
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}