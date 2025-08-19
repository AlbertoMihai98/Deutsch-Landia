'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { 
  CheckCircle,
  XCircle,
  ChevronRight,
  Trophy,
  Target,
  Clock,
  RefreshCw
} from 'lucide-react'

// Tip pentru întrebare
interface Intrebare {
  intrebare: string
  raspunsuri: string[]
  corect: number
  explicatie: string
}

// Întrebări pentru fiecare nivel
const intrebariTest: Record<string, Intrebare[]> = {
  A1: [
    {
      intrebare: "Wie ____ du?",
      raspunsuri: ["heißt", "heiße", "heißen", "heißest"],
      corect: 0,
      explicatie: "Cu 'du' folosim forma 'heißt'"
    },
    {
      intrebare: "Ich ____ aus Rumänien.",
      raspunsuri: ["kommen", "komme", "kommst", "kommt"],
      corect: 1,
      explicatie: "Cu 'ich' folosim forma 'komme'"
    },
    {
      intrebare: "____ Buch ist interessant.",
      raspunsuri: ["Der", "Die", "Das", "Den"],
      corect: 2,
      explicatie: "'Buch' este neutru, deci folosim 'das'"
    },
    {
      intrebare: "Er ____ 25 Jahre alt.",
      raspunsuri: ["ist", "bin", "bist", "sind"],
      corect: 0,
      explicatie: "Cu 'er' folosim 'ist'"
    },
    {
      intrebare: "Wir ____ Deutsch.",
      raspunsuri: ["lerne", "lernst", "lernt", "lernen"],
      corect: 3,
      explicatie: "Cu 'wir' folosim forma 'lernen'"
    }
  ],
  A2: [
    {
      intrebare: "Gestern ____ ich ins Kino gegangen.",
      raspunsuri: ["bin", "habe", "ist", "hat"],
      corect: 0,
      explicatie: "Cu verbe de mișcare folosim 'sein' la Perfekt"
    },
    {
      intrebare: "Ich ____ heute arbeiten.",
      raspunsuri: ["muss", "müssen", "musst", "müsst"],
      corect: 0,
      explicatie: "Forma corectă pentru 'ich' cu verbul modal 'müssen'"
    },
    {
      intrebare: "Er hat ____ Bruder.",
      raspunsuri: ["ein", "einen", "einer", "einem"],
      corect: 1,
      explicatie: "'Bruder' este masculin, acuzativ → 'einen'"
    },
    {
      intrebare: "Wir fahren ____ Berlin.",
      raspunsuri: ["zu", "nach", "in", "bei"],
      corect: 1,
      explicatie: "Pentru orașe folosim 'nach'"
    },
    {
      intrebare: "____ du morgen Zeit?",
      raspunsuri: ["Hast", "Haben", "Habt", "Hat"],
      corect: 0,
      explicatie: "Cu 'du' folosim 'hast'"
    }
  ],
  B1: [
    {
      intrebare: "Wenn ich reich ____, würde ich eine Weltreise machen.",
      raspunsuri: ["bin", "wäre", "war", "sei"],
      corect: 1,
      explicatie: "Konjunktiv II pentru condiții ireale"
    },
    {
      intrebare: "Das ist der Mann, ____ ich gestern getroffen habe.",
      raspunsuri: ["der", "den", "dem", "dessen"],
      corect: 1,
      explicatie: "Pronume relativ în acuzativ"
    },
    {
      intrebare: "Das Haus wurde letztes Jahr ____.",
      raspunsuri: ["gebaut", "bauen", "gebaut worden", "gebauen"],
      corect: 0,
      explicatie: "Pasiv cu 'werden' + Partizip II"
    },
    {
      intrebare: "Er versucht, pünktlich ____ kommen.",
      raspunsuri: ["zu", "um", "für", "zum"],
      corect: 0,
      explicatie: "Infinitiv cu 'zu'"
    },
    {
      intrebare: "____ des schlechten Wetters gehen wir spazieren.",
      raspunsuri: ["Wegen", "Trotz", "Während", "Statt"],
      corect: 1,
      explicatie: "'Trotz' = în ciuda (+ genitiv)"
    }
  ],
  B2: [
    {
      intrebare: "Er behauptet, er ____ das nicht gewusst.",
      raspunsuri: ["hat", "habe", "hätte", "hatte"],
      corect: 1,
      explicatie: "Konjunktiv I pentru discurs indirect"
    },
    {
      intrebare: "Je mehr ich lerne, ____ besser verstehe ich.",
      raspunsuri: ["desto", "umso", "als", "wie"],
      corect: 0,
      explicatie: "Construcția 'je...desto'"
    },
    {
      intrebare: "Das ist nicht ____ einfach, wie ich dachte.",
      raspunsuri: ["so", "als", "wie", "mehr"],
      corect: 0,
      explicatie: "Comparație negativă cu 'so...wie'"
    },
    {
      intrebare: "Die ____ Dokumente müssen bis morgen eingereicht werden.",
      raspunsuri: ["zu überarbeitenden", "überarbeitenden", "überarbeitete", "überarbeiten"],
      corect: 0,
      explicatie: "Partizip I cu 'zu' ca atribut"
    },
    {
      intrebare: "Er tut so, ____ ob er nichts wüsste.",
      raspunsuri: ["wie", "als", "wenn", "dass"],
      corect: 1,
      explicatie: "'als ob' pentru comparații ireale"
    }
  ],
  C1: [
    {
      intrebare: "Die Ergebnisse lassen ____ verschiedene Interpretationen zu.",
      raspunsuri: ["sich", "es", "man", "einen"],
      corect: 0,
      explicatie: "'sich lassen' + infinitiv = posibilitate pasivă"
    },
    {
      intrebare: "____ er auch sagen mag, ich glaube ihm nicht.",
      raspunsuri: ["Was", "Dass", "Weil", "Ob"],
      corect: 0,
      explicatie: "Propoziție concesivă cu 'was auch'"
    },
    {
      intrebare: "Es bedarf ____ gründlichen Analyse.",
      raspunsuri: ["eine", "einer", "einen", "einem"],
      corect: 1,
      explicatie: "'bedürfen' cere genitiv"
    },
    {
      intrebare: "Die ____ Maßnahmen erwiesen sich als ineffektiv.",
      raspunsuri: ["getroffenen", "treffenden", "zu treffenden", "getroffen"],
      corect: 0,
      explicatie: "Partizip II ca atribut pentru acțiuni finalizate"
    },
    {
      intrebare: "____ dessen, was er versprochen hatte, tat er das Gegenteil.",
      raspunsuri: ["Ungeachtet", "Bezüglich", "Angesichts", "Infolge"],
      corect: 0,
      explicatie: "'Ungeachtet' + genitiv = în ciuda"
    }
  ],
  C2: [
    {
      intrebare: "Seine Argumentation ____ einer gewissen Logik nicht.",
      raspunsuri: ["entbehrt", "entbehre", "entbehrte", "entbehren"],
      corect: 0,
      explicatie: "Verb literar 'entbehren' + genitiv"
    },
    {
      intrebare: "____ sei dahingestellt.",
      raspunsuri: ["Dies", "Das", "Es", "Dieses"],
      corect: 1,
      explicatie: "Expresie fixă pentru a lăsa ceva nedecis"
    },
    {
      intrebare: "Er ____ sich eines Kommentars.",
      raspunsuri: ["enthielt", "enthalt", "enthielte", "enthalte"],
      corect: 0,
      explicatie: "Präteritum pentru narațiune"
    },
    {
      intrebare: "Die Implikationen sind ____ weitreichend ____ komplex.",
      raspunsuri: ["sowohl...als auch", "weder...noch", "entweder...oder", "je...desto"],
      corect: 0,
      explicatie: "Corelație pentru enumerare pozitivă"
    },
    {
      intrebare: "____ man es auch betrachten mag, die Situation bleibt problematisch.",
      raspunsuri: ["Wie", "Was", "Wo", "Wann"],
      corect: 0,
      explicatie: "Concesivă cu 'wie auch'"
    }
  ]
}

interface RezultatDetaliat {
  intrebare: string
  raspunsDat: string
  raspunsCorect: string
  esteCorect: boolean
  explicatie: string
}

export default function TestNivelPage() {
  const [testInceput, setTestInceput] = useState(false)
  const [nivelTestat, setNivelTestat] = useState<string>('')
  const [intrebareCurenta, setIntrebareCurenta] = useState(0)
  const [raspunsuriCorecte, setRaspunsuriCorecte] = useState(0)
  const [raspunsSelectat, setRaspunsSelectat] = useState<number | null>(null)
  const [arateFeedback, setArateFeedback] = useState(false)
  const [testTerminat, setTestTerminat] = useState(false)
  const [rezultateDetaliate, setRezultateDetaliate] = useState<RezultatDetaliat[]>([])

  const niveluri = [
    { key: 'A1', label: 'A1 - Începător', color: 'from-green-400 to-emerald-500', descriere: 'Poate înțelege și folosi expresii cotidiene' },
    { key: 'A2', label: 'A2 - Elementar', color: 'from-blue-400 to-cyan-500', descriere: 'Poate comunica în situații simple' },
    { key: 'B1', label: 'B1 - Intermediar', color: 'from-purple-400 to-indigo-500', descriere: 'Poate face față majorității situațiilor' },
    { key: 'B2', label: 'B2 - Avansat', color: 'from-orange-400 to-red-500', descriere: 'Poate interacționa fluent cu vorbitori nativi' },
    { key: 'C1', label: 'C1 - Experimentat', color: 'from-pink-400 to-rose-500', descriere: 'Poate folosi limba flexibil și eficient' },
    { key: 'C2', label: 'C2 - Expert', color: 'from-indigo-400 to-purple-600', descriere: 'Poate înțelege cu ușurință aproape tot' }
  ]

  const startTest = (nivel: string) => {
    setNivelTestat(nivel)
    setTestInceput(true)
    setIntrebareCurenta(0)
    setRaspunsuriCorecte(0)
    setRaspunsSelectat(null)
    setArateFeedback(false)
    setTestTerminat(false)
    setRezultateDetaliate([])
  }

  const handleRaspuns = (indexRaspuns: number) => {
    if (arateFeedback || !nivelTestat) return

    setRaspunsSelectat(indexRaspuns)
    setArateFeedback(true)

    const intrebare = intrebariTest[nivelTestat][intrebareCurenta]
    const esteCorect = indexRaspuns === intrebare.corect

    if (esteCorect) {
      setRaspunsuriCorecte(prev => prev + 1)
    }

    setRezultateDetaliate(prev => [...prev, {
      intrebare: intrebare.intrebare,
      raspunsDat: intrebare.raspunsuri[indexRaspuns],
      raspunsCorect: intrebare.raspunsuri[intrebare.corect],
      esteCorect,
      explicatie: intrebare.explicatie
    }])

    setTimeout(() => {
      if (intrebareCurenta < intrebariTest[nivelTestat].length - 1) {
        setIntrebareCurenta(prev => prev + 1)
        setRaspunsSelectat(null)
        setArateFeedback(false)
      } else {
        setTestTerminat(true)
      }
    }, 2000)
  }

  const getScorNivel = () => {
    if (!nivelTestat) return { nivel: 'A1', mesaj: 'Începe cu bazele!' }
    
    const procent = (raspunsuriCorecte / intrebariTest[nivelTestat].length) * 100
    if (procent >= 80) return { nivel: nivelTestat, mesaj: 'Excelent! Ai trecut testul!' }
    if (procent >= 60) return { nivel: nivelTestat, mesaj: 'Bine! Încă mai ai de exersat.' }
    const indexNivel = niveluri.findIndex(n => n.key === nivelTestat)
    if (indexNivel > 0) {
      return { nivel: niveluri[indexNivel - 1].key, mesaj: 'Recomandăm nivelul anterior.' }
    }
    return { nivel: 'A1', mesaj: 'Începe cu bazele!' }
  }

  const resetTest = () => {
    setTestInceput(false)
    setNivelTestat('')
    setIntrebareCurenta(0)
    setRaspunsuriCorecte(0)
    setRaspunsSelectat(null)
    setArateFeedback(false)
    setTestTerminat(false)
    setRezultateDetaliate([])
  }

  if (testTerminat && nivelTestat) {
    const rezultat = getScorNivel()
    const procent = Math.round((raspunsuriCorecte / intrebariTest[nivelTestat].length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <EnhancedNavigation />
        
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-2">Test Completat!</h2>
                <p className="text-xl text-gray-600">{rezultat.mesaj}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-2xl text-center">
                  <p className="text-3xl font-bold text-blue-600">{procent}%</p>
                  <p className="text-gray-600">Scor Total</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {raspunsuriCorecte}/{intrebariTest[nivelTestat].length}
                  </p>
                  <p className="text-gray-600">Răspunsuri Corecte</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl text-center">
                  <p className="text-3xl font-bold text-purple-600">{rezultat.nivel}</p>
                  <p className="text-gray-600">Nivel Recomandat</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Detalii Răspunsuri:</h3>
                <div className="space-y-3">
                  {rezultateDetaliate.map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl ${
                      item.esteCorect ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium">{index + 1}. {item.intrebare}</p>
                        {item.esteCorect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {!item.esteCorect && (
                        <>
                          <p className="text-sm text-gray-600">
                            Răspunsul tău: <span className="text-red-600">{item.raspunsDat}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Răspuns corect: <span className="text-green-600">{item.raspunsCorect}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{item.explicatie}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={resetTest}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition"
                >
                  <RefreshCw className="inline-block w-5 h-5 mr-2" />
                  Test Nou
                </button>
                <button
                  onClick={() => window.location.href = '/lectii'}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:shadow-lg transition"
                >
                  Începe Să Înveți
                  <ChevronRight className="inline-block w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (testInceput && nivelTestat && intrebariTest[nivelTestat]) {
    const intrebare = intrebariTest[nivelTestat][intrebareCurenta]

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <EnhancedNavigation />
        
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="bg-white rounded-full h-3 mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${((intrebareCurenta + 1) / intrebariTest[nivelTestat].length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.div
              key={intrebareCurenta}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium text-gray-600">
                  Întrebarea {intrebareCurenta + 1} din {intrebariTest[nivelTestat].length}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold">
                  {nivelTestat}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-8 text-gray-800">{intrebare.intrebare}</h2>

              <div className="space-y-3">
                {intrebare.raspunsuri.map((raspuns, index) => {
                  const esteSelectat = raspunsSelectat === index
                  const esteCorect = index === intrebare.corect
                  const arataCorect = arateFeedback && esteCorect
                  const arataGresit = arateFeedback && esteSelectat && !esteCorect

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleRaspuns(index)}
                      disabled={arateFeedback}
                      className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                        arataCorect
                          ? 'bg-green-100 border-2 border-green-500 text-green-700'
                          : arataGresit
                          ? 'bg-red-100 border-2 border-red-500 text-red-700'
                          : esteSelectat
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                      }`}
                      whileHover={!arateFeedback ? { scale: 1.02 } : {}}
                      whileTap={!arateFeedback ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span>{raspuns}</span>
                        {arataCorect && <CheckCircle className="w-6 h-6 text-green-500" />}
                        {arataGresit && <XCircle className="w-6 h-6 text-red-500" />}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {arateFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl ${
                    raspunsSelectat === intrebare.corect
                      ? 'bg-green-50 text-green-700'
                      : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  <p className="font-medium">
                    {raspunsSelectat === intrebare.corect ? '✅ Corect!' : '💡 Explicație:'}
                  </p>
                  <p className="text-sm mt-1">{intrebare.explicatie}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <EnhancedNavigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Testează-ți Nivelul de Germană
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Descoperă ce nivel ți se potrivește și începe să înveți eficient
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {niveluri.map((nivel, index) => (
              <motion.div
                key={nivel.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${nivel.color} text-white font-bold mb-4`}>
                  {nivel.label}
                </div>
                
                <p className="text-gray-600 mb-6">{nivel.descriere}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">5 întrebări</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>~5 min</span>
                  </div>
                </div>

                <button
                  onClick={() => startTest(nivel.key)}
                  className={`w-full py-3 rounded-xl font-bold bg-gradient-to-r ${nivel.color} text-white hover:shadow-lg transition flex items-center justify-center gap-2`}
                >
                  <Target className="w-5 h-5" />
                  Începe Testul
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}