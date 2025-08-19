'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { useNaturalVoice } from '../components/useVoice'
import { 
  Volume2,
  Book,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react'

// Tipuri pentru vocabular
interface VocabularItem {
  de: string
  ro: string
  plural?: string
  conjugare?: string
  antonim?: string
}

type Categorie = 'substantive' | 'verbe' | 'adjective' | 'adverbe'

interface VocabularNivel {
  substantive?: VocabularItem[]
  verbe?: VocabularItem[]
  adjective?: VocabularItem[]
  adverbe?: VocabularItem[]
}

// Vocabular structurat pe niveluri și categorii
const vocabularData: Record<string, VocabularNivel> = {
  A1: {
    substantive: [
      { de: 'der Mann', ro: 'bărbatul', plural: 'die Männer' },
      { de: 'die Frau', ro: 'femeia', plural: 'die Frauen' },
      { de: 'das Kind', ro: 'copilul', plural: 'die Kinder' },
      { de: 'das Haus', ro: 'casa', plural: 'die Häuser' },
      { de: 'die Schule', ro: 'școala', plural: 'die Schulen' },
      { de: 'der Tisch', ro: 'masa', plural: 'die Tische' },
      { de: 'der Stuhl', ro: 'scaunul', plural: 'die Stühle' },
      { de: 'das Buch', ro: 'cartea', plural: 'die Bücher' },
      { de: 'die Tasche', ro: 'geanta', plural: 'die Taschen' },
      { de: 'der Apfel', ro: 'mărul', plural: 'die Äpfel' },
      { de: 'das Brot', ro: 'pâinea', plural: 'die Brote' },
      { de: 'die Milch', ro: 'laptele', plural: '-' },
      { de: 'das Wasser', ro: 'apa', plural: '-' },
      { de: 'der Hund', ro: 'câinele', plural: 'die Hunde' },
      { de: 'die Katze', ro: 'pisica', plural: 'die Katzen' },
      { de: 'das Auto', ro: 'mașina', plural: 'die Autos' },
      { de: 'der Bus', ro: 'autobuzul', plural: 'die Busse' },
      { de: 'die Stadt', ro: 'orașul', plural: 'die Städte' },
      { de: 'das Land', ro: 'țara', plural: 'die Länder' },
      { de: 'der Tag', ro: 'ziua', plural: 'die Tage' },
      { de: 'die Nacht', ro: 'noaptea', plural: 'die Nächte' },
      { de: 'die Woche', ro: 'săptămâna', plural: 'die Wochen' },
      { de: 'der Monat', ro: 'luna', plural: 'die Monate' },
      { de: 'das Jahr', ro: 'anul', plural: 'die Jahre' },
      { de: 'der Freund', ro: 'prietenul', plural: 'die Freunde' }
    ],
    verbe: [
      { de: 'sein', ro: 'a fi', conjugare: 'ich bin, du bist, er ist' },
      { de: 'haben', ro: 'a avea', conjugare: 'ich habe, du hast, er hat' },
      { de: 'machen', ro: 'a face', conjugare: 'ich mache, du machst, er macht' },
      { de: 'gehen', ro: 'a merge', conjugare: 'ich gehe, du gehst, er geht' },
      { de: 'kommen', ro: 'a veni', conjugare: 'ich komme, du kommst, er kommt' },
      { de: 'sehen', ro: 'a vedea', conjugare: 'ich sehe, du siehst, er sieht' },
      { de: 'essen', ro: 'a mânca', conjugare: 'ich esse, du isst, er isst' },
      { de: 'trinken', ro: 'a bea', conjugare: 'ich trinke, du trinkst, er trinkt' },
      { de: 'schlafen', ro: 'a dormi', conjugare: 'ich schlafe, du schläfst, er schläft' },
      { de: 'arbeiten', ro: 'a lucra', conjugare: 'ich arbeite, du arbeitest, er arbeitet' },
      { de: 'lernen', ro: 'a învăța', conjugare: 'ich lerne, du lernst, er lernt' },
      { de: 'spielen', ro: 'a se juca', conjugare: 'ich spiele, du spielst, er spielt' },
      { de: 'lesen', ro: 'a citi', conjugare: 'ich lese, du liest, er liest' },
      { de: 'schreiben', ro: 'a scrie', conjugare: 'ich schreibe, du schreibst, er schreibt' },
      { de: 'sprechen', ro: 'a vorbi', conjugare: 'ich spreche, du sprichst, er spricht' }
    ],
    adjective: [
      { de: 'groß', ro: 'mare', antonim: 'klein' },
      { de: 'klein', ro: 'mic', antonim: 'groß' },
      { de: 'gut', ro: 'bun', antonim: 'schlecht' },
      { de: 'schlecht', ro: 'rău', antonim: 'gut' },
      { de: 'neu', ro: 'nou', antonim: 'alt' },
      { de: 'alt', ro: 'vechi', antonim: 'neu' },
      { de: 'jung', ro: 'tânăr', antonim: 'alt' },
      { de: 'schön', ro: 'frumos', antonim: 'hässlich' },
      { de: 'schnell', ro: 'rapid', antonim: 'langsam' },
      { de: 'langsam', ro: 'lent', antonim: 'schnell' },
      { de: 'teuer', ro: 'scump', antonim: 'billig' },
      { de: 'billig', ro: 'ieftin', antonim: 'teuer' },
      { de: 'warm', ro: 'cald', antonim: 'kalt' },
      { de: 'kalt', ro: 'rece', antonim: 'warm' },
      { de: 'leicht', ro: 'ușor', antonim: 'schwer' }
    ],
    adverbe: [
      { de: 'heute', ro: 'azi' },
      { de: 'morgen', ro: 'mâine' },
      { de: 'gestern', ro: 'ieri' },
      { de: 'jetzt', ro: 'acum' },
      { de: 'hier', ro: 'aici' },
      { de: 'dort', ro: 'acolo' },
      { de: 'immer', ro: 'mereu' },
      { de: 'nie', ro: 'niciodată' },
      { de: 'oft', ro: 'des' },
      { de: 'manchmal', ro: 'uneori' }
    ]
  },
  A2: {
    substantive: [
      { de: 'der Beruf', ro: 'profesia', plural: 'die Berufe' },
      { de: 'die Arbeit', ro: 'munca', plural: 'die Arbeiten' },
      { de: 'das Büro', ro: 'biroul', plural: 'die Büros' },
      { de: 'der Computer', ro: 'calculatorul', plural: 'die Computer' },
      { de: 'das Handy', ro: 'telefonul mobil', plural: 'die Handys' },
      { de: 'die E-Mail', ro: 'email-ul', plural: 'die E-Mails' },
      { de: 'der Urlaub', ro: 'vacanța', plural: 'die Urlaube' },
      { de: 'das Hotel', ro: 'hotelul', plural: 'die Hotels' },
      { de: 'der Flughafen', ro: 'aeroportul', plural: 'die Flughäfen' },
      { de: 'die Reise', ro: 'călătoria', plural: 'die Reisen' }
    ],
    verbe: [
      { de: 'können', ro: 'a putea', conjugare: 'ich kann, du kannst, er kann' },
      { de: 'müssen', ro: 'a trebui', conjugare: 'ich muss, du musst, er muss' },
      { de: 'wollen', ro: 'a vrea', conjugare: 'ich will, du willst, er will' },
      { de: 'sollen', ro: 'a trebui să', conjugare: 'ich soll, du sollst, er soll' },
      { de: 'dürfen', ro: 'a avea voie', conjugare: 'ich darf, du darfst, er darf' }
    ]
  },
  B1: {
    substantive: [
      { de: 'die Umwelt', ro: 'mediul', plural: '-' },
      { de: 'die Gesundheit', ro: 'sănătatea', plural: '-' },
      { de: 'die Bildung', ro: 'educația', plural: '-' },
      { de: 'die Erfahrung', ro: 'experiența', plural: 'die Erfahrungen' },
      { de: 'die Meinung', ro: 'opinia', plural: 'die Meinungen' }
    ]
  },
  B2: {
    substantive: [
      { de: 'die Globalisierung', ro: 'globalizarea', plural: '-' },
      { de: 'die Digitalisierung', ro: 'digitalizarea', plural: '-' },
      { de: 'die Nachhaltigkeit', ro: 'sustenabilitatea', plural: '-' },
      { de: 'die Wirtschaft', ro: 'economia', plural: '-' },
      { de: 'die Politik', ro: 'politica', plural: '-' }
    ]
  },
  C1: {
    substantive: [
      { de: 'die Abstraktion', ro: 'abstracțiunea', plural: 'die Abstraktionen' },
      { de: 'die Implikation', ro: 'implicația', plural: 'die Implikationen' },
      { de: 'die Kontroverse', ro: 'controversa', plural: 'die Kontroversen' }
    ]
  },
  C2: {
    substantive: [
      { de: 'die Nuance', ro: 'nuanța', plural: 'die Nuancen' },
      { de: 'die Ambiguität', ro: 'ambiguitatea', plural: 'die Ambiguitäten' },
      { de: 'die Eloquenz', ro: 'elocvența', plural: '-' }
    ]
  }
}

export default function VocabularPage() {
  const [nivel, setNivel] = useState<string>('A1')
  const [categorie, setCategorie] = useState<Categorie>('substantive')
  const [searchTerm, setSearchTerm] = useState('')
  const { speak } = useNaturalVoice()

  const niveluri = [
    { key: 'A1', label: 'A1', color: 'from-green-400 to-emerald-500' },
    { key: 'A2', label: 'A2', color: 'from-blue-400 to-cyan-500' },
    { key: 'B1', label: 'B1', color: 'from-purple-400 to-indigo-500' },
    { key: 'B2', label: 'B2', color: 'from-orange-400 to-red-500' },
    { key: 'C1', label: 'C1', color: 'from-pink-400 to-rose-500' },
    { key: 'C2', label: 'C2', color: 'from-indigo-400 to-purple-600' }
  ]

  const categorii = [
    { key: 'substantive' as Categorie, label: 'Substantive', icon: '📚' },
    { key: 'verbe' as Categorie, label: 'Verbe', icon: '🏃' },
    { key: 'adjective' as Categorie, label: 'Adjective', icon: '🎨' },
    { key: 'adverbe' as Categorie, label: 'Adverbe', icon: '⏰' }
  ]

  // Obține vocabularul curent cu verificare de siguranță
  const getVocabularCurent = (): VocabularItem[] => {
    const nivelData = vocabularData[nivel]
    if (!nivelData) return []
    const categorieData = nivelData[categorie]
    return categorieData || []
  }

  const vocabularCurent = getVocabularCurent()
  
  const vocabularFiltrat = vocabularCurent.filter((item) =>
    item.de.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ro.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculează totalul de cuvinte pentru nivel
  const getTotalCuvinteNivel = () => {
    const nivelData = vocabularData[nivel]
    if (!nivelData) return 0
    
    let total = 0
    Object.values(nivelData).forEach((categorie) => {
      if (Array.isArray(categorie)) {
        total += categorie.length
      }
    })
    return total
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
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
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vocabular German
              </span>
            </h1>
            <p className="text-xl text-gray-600">Învață cuvinte noi pentru fiecare nivel</p>
          </motion.div>

          {/* Selectoare */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-8">
            {/* Nivel Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-700 mb-3">Alege Nivelul:</h3>
              <div className="flex flex-wrap gap-3">
                {niveluri.map((n) => (
                  <button
                    key={n.key}
                    onClick={() => setNivel(n.key)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      nivel === n.key
                        ? `bg-gradient-to-r ${n.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categorie Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-700 mb-3">Alege Categoria:</h3>
              <div className="flex flex-wrap gap-3">
                {categorii.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setCategorie(cat.key)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      categorie === cat.key
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Caută cuvinte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">{vocabularFiltrat.length}</p>
              <p className="text-gray-600">Cuvinte</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{nivel}</p>
              <p className="text-gray-600">Nivel</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{categorie}</p>
              <p className="text-gray-600">Categorie</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{getTotalCuvinteNivel()}</p>
              <p className="text-gray-600">Total {nivel}</p>
            </div>
          </div>

          {/* Lista Vocabular */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocabularFiltrat.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-5 shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{item.de}</h3>
                    <p className="text-gray-600">{item.ro}</p>
                  </div>
                  <button
                    onClick={() => speak(item.de)}
                    className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition"
                  >
                    <Volume2 className="w-5 h-5 text-purple-600" />
                  </button>
                </div>

                {item.plural && item.plural !== '-' && (
                  <div className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Plural:</span> {item.plural}
                  </div>
                )}

                {item.conjugare && (
                  <div className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Conjugare:</span> {item.conjugare}
                  </div>
                )}

                {item.antonim && (
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Antonim:</span> {item.antonim}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {vocabularFiltrat.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nu am găsit cuvinte pentru această combinație de nivel și categorie.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}