'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { useNaturalVoice } from '../components/useVoice'
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle, 
  Volume2,
  Target,
  Zap,
  Trophy,
  Lock,
  Play,
  FileText,
  PenTool,
  Headphones
} from 'lucide-react'

// Structura completă a lecțiilor de gramatică
const gramaticaLectii = {
  A1: {
    title: 'Nivel A1 - Începător',
    description: 'Bazele limbii germane',
    color: 'from-green-400 to-emerald-500',
    lectii: [
      {
        id: 1,
        titlu: 'Articolele definite și indefinite',
        descriere: 'der/die/das și ein/eine',
        durata: '45 min',
        continut: {
          explicatie: 'În germană există trei genuri: masculin (der), feminin (die) și neutru (das).',
          exemple: [
            { de: 'der Mann', ro: 'bărbatul' },
            { de: 'die Frau', ro: 'femeia' },
            { de: 'das Kind', ro: 'copilul' }
          ],
          reguli: [
            'Substantivele masculine: de obicei bărbați, anotimpuri, zile, luni',
            'Substantivele feminine: de obicei femei, numere, multe plante',
            'Substantivele neutre: diminutive (-chen, -lein), metale, litere'
          ]
        }
      },
      {
        id: 2,
        titlu: 'Verbul sein (a fi)',
        descriere: 'Conjugarea și utilizarea',
        durata: '30 min',
        continut: {
          conjugare: {
            'ich': 'bin',
            'du': 'bist',
            'er/sie/es': 'ist',
            'wir': 'sind',
            'ihr': 'seid',
            'sie/Sie': 'sind'
          },
          exemple: [
            { de: 'Ich bin Student', ro: 'Eu sunt student' },
            { de: 'Sie ist Lehrerin', ro: 'Ea este profesoară' }
          ]
        }
      },
      {
        id: 3,
        titlu: 'Verbul haben (a avea)',
        descriere: 'Conjugarea și utilizarea',
        durata: '30 min'
      },
      {
        id: 4,
        titlu: 'Prezentul verbelor regulate',
        descriere: 'Conjugarea verbelor regulate',
        durata: '60 min'
      },
      {
        id: 5,
        titlu: 'Pronumele personale',
        descriere: 'ich, du, er, sie, es, wir, ihr, sie',
        durata: '30 min'
      },
      {
        id: 6,
        titlu: 'Negația cu nicht și kein',
        descriere: 'Cum să negi în germană',
        durata: '45 min'
      },
      {
        id: 7,
        titlu: 'Întrebările da/nu',
        descriere: 'Structura întrebărilor simple',
        durata: '30 min'
      },
      {
        id: 8,
        titlu: 'W-Fragen (întrebări cu W)',
        descriere: 'wer, was, wo, wann, warum, wie',
        durata: '45 min'
      },
      {
        id: 9,
        titlu: 'Numerele 1-100',
        descriere: 'Numerele cardinale',
        durata: '45 min'
      },
      {
        id: 10,
        titlu: 'Pluralul substantivelor',
        descriere: 'Formarea pluralului',
        durata: '60 min'
      }
    ]
  },
  A2: {
    title: 'Nivel A2 - Elementar',
    description: 'Consolidarea bazelor',
    color: 'from-blue-400 to-cyan-500',
    lectii: [
      {
        id: 1,
        titlu: 'Perfectul compus (Perfekt)',
        descriere: 'Timpul trecut cu haben și sein',
        durata: '90 min'
      },
      {
        id: 2,
        titlu: 'Verbele modale',
        descriere: 'können, müssen, wollen, sollen, dürfen, mögen',
        durata: '120 min'
      },
      {
        id: 3,
        titlu: 'Prepozițiile cu dativ',
        descriere: 'aus, bei, mit, nach, seit, von, zu',
        durata: '60 min'
      },
      {
        id: 4,
        titlu: 'Prepozițiile cu acuzativ',
        descriere: 'durch, für, gegen, ohne, um',
        durata: '60 min'
      },
      {
        id: 5,
        titlu: 'Verbele reflexive',
        descriere: 'sich waschen, sich freuen',
        durata: '45 min'
      },
      {
        id: 6,
        titlu: 'Comparativul și superlativul',
        descriere: 'größer, am größten',
        durata: '60 min'
      },
      {
        id: 7,
        titlu: 'Conjuncțiile coordonatoare',
        descriere: 'und, aber, oder, denn, sondern',
        durata: '45 min'
      },
      {
        id: 8,
        titlu: 'Propoziții subordonate cu weil și dass',
        descriere: 'Cauzale și completive',
        durata: '60 min'
      },
      {
        id: 9,
        titlu: 'Imperativul',
        descriere: 'Forma de comandă',
        durata: '45 min'
      },
      {
        id: 10,
        titlu: 'Präteritum pentru sein și haben',
        descriere: 'war, hatte',
        durata: '30 min'
      }
    ]
  },
  B1: {
    title: 'Nivel B1 - Intermediar',
    description: 'Aprofundarea cunoștințelor',
    color: 'from-purple-400 to-indigo-500',
    lectii: [
      {
        id: 1,
        titlu: 'Konjunktiv II',
        descriere: 'Condiționalul și dorințele',
        durata: '120 min'
      },
      {
        id: 2,
        titlu: 'Pasivul (Passiv)',
        descriere: 'werden + Partizip II',
        durata: '90 min'
      },
      {
        id: 3,
        titlu: 'Präteritum complet',
        descriere: 'Toate verbele la trecut simplu',
        durata: '120 min'
      },
      {
        id: 4,
        titlu: 'Plusquamperfekt',
        descriere: 'Mai mult ca perfectul',
        durata: '60 min'
      },
      {
        id: 5,
        titlu: 'Relativsätze',
        descriere: 'Propoziții relative',
        durata: '90 min'
      },
      {
        id: 6,
        titlu: 'Infinitivul cu zu',
        descriere: 'zu + infinitiv',
        durata: '60 min'
      },
      {
        id: 7,
        titlu: 'Partizip I și II ca adjective',
        descriere: 'der fahrende Zug',
        durata: '60 min'
      },
      {
        id: 8,
        titlu: 'Prepozițiile mixte',
        descriere: 'an, auf, hinter, in, neben, über, unter, vor, zwischen',
        durata: '90 min'
      },
      {
        id: 9,
        titlu: 'Conjuncțiile temporale',
        descriere: 'als, wenn, während, bevor, nachdem',
        durata: '60 min'
      },
      {
        id: 10,
        titlu: 'Discursul indirect',
        descriere: 'Konjunktiv I',
        durata: '90 min'
      }
    ]
  },
  B2: {
    title: 'Nivel B2 - Avansat',
    description: 'Perfecționarea limbii',
    color: 'from-orange-400 to-red-500',
    lectii: [
      {
        id: 1,
        titlu: 'Konjunktiv I detaliat',
        descriere: 'Discursul indirect avansat',
        durata: '120 min'
      },
      {
        id: 2,
        titlu: 'Partizipialkonstruktionen',
        descriere: 'Construcții participiale',
        durata: '90 min'
      },
      {
        id: 3,
        titlu: 'Nominalizarea',
        descriere: 'Transformarea verbelor în substantive',
        durata: '60 min'
      },
      {
        id: 4,
        titlu: 'Modalpartikeln',
        descriere: 'doch, mal, ja, denn, etwa',
        durata: '90 min'
      },
      {
        id: 5,
        titlu: 'Futur II',
        descriere: 'Viitorul anterior',
        durata: '45 min'
      },
      {
        id: 6,
        titlu: 'Ersatzformen des Passivs',
        descriere: 'Alternative la pasiv',
        durata: '60 min'
      },
      {
        id: 7,
        titlu: 'Funktionsverbgefüge',
        descriere: 'Expresii cu verbe funcționale',
        durata: '90 min'
      },
      {
        id: 8,
        titlu: 'Subjektive Bedeutung der Modalverben',
        descriere: 'Sensul subiectiv al verbelor modale',
        durata: '90 min'
      },
      {
        id: 9,
        titlu: 'Erweiterte Attribute',
        descriere: 'Atribute extinse',
        durata: '60 min'
      },
      {
        id: 10,
        titlu: 'Textkohärenz',
        descriere: 'Coerența textului',
        durata: '90 min'
      }
    ],
    specializari: [
      {
        id: 'b2-it',
        titlu: 'B2 pentru IT',
        descriere: 'Germană pentru programatori',
        lectii: [
          'Terminologie IT',
          'Documentație tehnică',
          'Prezentări de proiecte',
          'Email-uri profesionale',
          'Discuții tehnice'
        ]
      },
      {
        id: 'b2-banking',
        titlu: 'B2 pentru Banking',
        descriere: 'Germană pentru sectorul bancar',
        lectii: [
          'Terminologie bancară',
          'Consultanță clienți',
          'Rapoarte financiare',
          'Corespondență oficială',
          'Prezentări financiare'
        ]
      }
    ]
  },
  C1: {
    title: 'Nivel C1 - Experimentat',
    description: 'Fluență avansată',
    color: 'from-pink-400 to-rose-500',
    lectii: [
      {
        id: 1,
        titlu: 'Stiluri de scriere',
        descriere: 'Formal, informal, academic',
        durata: '120 min'
      },
      {
        id: 2,
        titlu: 'Idiomuri și expresii',
        descriere: 'Expresii idiomatice avansate',
        durata: '90 min'
      },
      {
        id: 3,
        titlu: 'Analiza textelor complexe',
        descriere: 'Înțelegerea textelor specializate',
        durata: '120 min'
      },
      {
        id: 4,
        titlu: 'Argumentare și dezbatere',
        descriere: 'Structuri pentru argumentare',
        durata: '90 min'
      },
      {
        id: 5,
        titlu: 'Registre lingvistice',
        descriere: 'Adaptarea la context',
        durata: '60 min'
      }
    ]
  },
  C2: {
    title: 'Nivel C2 - Expert',
    description: 'Stăpânire completă',
    color: 'from-indigo-400 to-purple-600',
    lectii: [
      {
        id: 1,
        titlu: 'Nuanțe și subtilități',
        descriere: 'Diferențe fine de sens',
        durata: '120 min'
      },
      {
        id: 2,
        titlu: 'Literatură germană',
        descriere: 'Analiza textelor literare',
        durata: '150 min'
      },
      {
        id: 3,
        titlu: 'Dialecte și variante regionale',
        descriere: 'Germana austriacă și elvețiană',
        durata: '90 min'
      },
      {
        id: 4,
        titlu: 'Traducere și interpretare',
        descriere: 'Tehnici avansate',
        durata: '120 min'
      },
      {
        id: 5,
        titlu: 'Creativitate lingvistică',
        descriere: 'Jocuri de cuvinte și poezie',
        durata: '90 min'
      }
    ]
  }
}

export default function GramaticaPage() {
  const [nivelSelectat, setNivelSelectat] = useState<keyof typeof gramaticaLectii>('A1')
  const [lectieSelectata, setLectieSelectata] = useState<any>(null)
  const { speak } = useNaturalVoice()

  const nivelCurent = gramaticaLectii[nivelSelectat]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gramatică Germană
              </span>
            </h1>
            <p className="text-xl text-gray-600">Învață gramatica pas cu pas, de la A1 la C2</p>
          </motion.div>

          {/* Selector Niveluri */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(gramaticaLectii).map(([key, nivel]) => (
              <motion.button
                key={key}
                onClick={() => setNivelSelectat(key as keyof typeof gramaticaLectii)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  nivelSelectat === key
                    ? `bg-gradient-to-r ${nivel.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {key === 'A1' && '🌱'}
                    {key === 'A2' && '🌿'}
                    {key === 'B1' && '🌳'}
                    {key === 'B2' && '🎓'}
                    {key === 'C1' && '🏆'}
                    {key === 'C2' && '👑'}
                  </span>
                  <div className="text-left">
                    <p className="text-lg">{key}</p>
                    <p className="text-xs opacity-80">{nivel.title.split(' - ')[1]}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Info Nivel */}
          <motion.div
            key={nivelSelectat}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-8"
          >
            <div className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${nivelCurent.color} text-white font-bold mb-4`}>
              {nivelCurent.title}
            </div>
            <p className="text-gray-600 text-lg">{nivelCurent.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{nivelCurent.lectii.length} lecții principale</span>
              </div>
              {'specializari' in nivelCurent && (
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">{nivelCurent.specializari?.length} specializări</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Lista Lecții */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nivelCurent.lectii.map((lectie, index) => (
              <motion.div
                key={lectie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer"
                onClick={() => setLectieSelectata(lectie)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-r ${nivelCurent.color} text-white p-3 rounded-xl`}>
                    <span className="text-xl font-bold">
                      {String(lectie.id).padStart(2, '0')}
                    </span>
                  </div>
                  {lectie.durata && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">{lectie.durata}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{lectie.titlu}</h3>
                <p className="text-gray-600 mb-4">{lectie.descriere}</p>

                <button className={`w-full py-3 rounded-xl font-bold bg-gradient-to-r ${nivelCurent.color} text-white hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                  <Play className="w-5 h-5" />
                  Începe Lecția
                </button>
              </motion.div>
            ))}
          </div>

          {/* Specializări pentru B2 */}
          {'specializari' in nivelCurent && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Specializări Profesionale</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {nivelCurent.specializari?.map((spec) => (
                  <motion.div
                    key={spec.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{spec.titlu}</h3>
                    <p className="text-gray-600 mb-4">{spec.descriere}</p>
                    <ul className="space-y-2">
                      {spec.lectii.map((l, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-4 w-full bg-white py-3 rounded-xl font-bold hover:shadow-lg transition">
                      Explorează Specializarea
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Lecție */}
      <AnimatePresence>
        {lectieSelectata && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setLectieSelectata(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${nivelCurent.color} p-6 rounded-t-3xl`}>
                <h2 className="text-3xl font-bold text-white mb-2">{lectieSelectata.titlu}</h2>
                <p className="text-white/90">{lectieSelectata.descriere}</p>
              </div>

              <div className="p-6">
                {lectieSelectata.continut && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3">Explicație</h3>
                      <p className="text-gray-700">{lectieSelectata.continut.explicatie}</p>
                    </div>

                    {lectieSelectata.continut.conjugare && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">Conjugare</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(lectieSelectata.continut.conjugare).map(([pronume, forma]) => (
                            <div 
                              key={pronume}
                              className="bg-blue-50 p-3 rounded-xl cursor-pointer hover:bg-blue-100 transition"
                              onClick={() => speak(`${pronume} ${forma}`)}
                            >
                              <p className="font-bold text-blue-600">{pronume}</p>
                              <p className="text-lg">{forma}</p>
                              <Volume2 className="w-4 h-4 text-blue-500 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lectieSelectata.continut.exemple && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">Exemple</h3>
                        <div className="space-y-3">
                          {lectieSelectata.continut.exemple.map((ex: any, i: number) => (
                            <div 
                              key={i}
                              className="bg-green-50 p-4 rounded-xl cursor-pointer hover:bg-green-100 transition"
                              onClick={() => speak(ex.de)}
                            >
                              <p className="font-bold text-green-700">{ex.de}</p>
                              <p className="text-gray-600">{ex.ro}</p>
                              <Volume2 className="w-4 h-4 text-green-500 mt-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lectieSelectata.continut.reguli && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">Reguli importante</h3>
                        <ul className="space-y-2">
                          {lectieSelectata.continut.reguli.map((regula: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>{regula}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => setLectieSelectata(null)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition"
                  >
                    Închide
                  </button>
                  
                  <button className={`px-8 py-3 bg-gradient-to-r ${nivelCurent.color} text-white rounded-full font-bold hover:shadow-lg transition flex items-center gap-2`}>
                    Exerciții Practice
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}