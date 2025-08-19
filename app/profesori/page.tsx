'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { 
  Star,
  Clock,
  Globe,
  Award,
  Calendar,
  Video,
  MessageCircle,
  CheckCircle,
  Euro,
  Users
} from 'lucide-react'

interface Profesor {
  id: string
  nume: string
  imagine: string
  descriere: string
  experienta: string
  specializare: string[]
  rating: number
  recenzii: number
  pret: number
  limbajVorbit: string[]
  disponibil: boolean
  certificari: string[]
  lectiiPredate: number
}

const profesori: Profesor[] = [
  {
    id: 'alberto',
    nume: 'Alberto',
    imagine: '👨‍🏫',
    descriere: 'Profesor nativ de germană cu 10+ ani experiență în predarea online. Specializat în pregătire pentru examene Goethe și TestDaF.',
    experienta: '10+ ani',
    specializare: ['Examene Goethe', 'TestDaF', 'Germană Business', 'Conversație'],
    rating: 4.9,
    recenzii: 287,
    pret: 150,
    limbajVorbit: ['Germană', 'Română', 'Engleză'],
    disponibil: true,
    certificari: ['Goethe C2', 'TestDaF', 'Certificat Predare'],
    lectiiPredate: 3250
  }
]

// Sloturi goale pentru profesori viitori
const sloturiGoale = Array(5).fill({
  id: '',
  nume: 'Disponibil în curând',
  imagine: '❓',
  disponibil: false
})

export default function ProfesoriPage() {
  const [profesorSelectat, setProfessorSelectat] = useState<Profesor | null>(null)
  const [showBooking, setShowBooking] = useState(false)

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
                Profesori 1-la-1
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Învață germană cu profesori experimentați în sesiuni personalizate
            </p>
          </motion.div>

          {/* Beneficii */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <Video className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Lecții Live</h3>
              <p className="text-sm text-gray-600">Sesiuni video interactive 1-la-1</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <Calendar className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Program Flexibil</h3>
              <p className="text-sm text-gray-600">Alege orele care ți se potrivesc</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Profesori Certificați</h3>
              <p className="text-sm text-gray-600">Doar profesori cu experiență</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <MessageCircle className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Feedback Personal</h3>
              <p className="text-sm text-gray-600">Progres monitorizat constant</p>
            </motion.div>
          </div>

          {/* Lista Profesori */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Alberto */}
            {profesori.map((profesor) => (
              <motion.div
                key={profesor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center">
                  <div className="text-6xl mb-3">{profesor.imagine}</div>
                  <h3 className="text-2xl font-bold text-white">{profesor.nume}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex text-yellow-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(profesor.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-white">{profesor.rating}</span>
                    <span className="text-white/80">({profesor.recenzii} recenzii)</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{profesor.descriere}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{profesor.experienta} experiență</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{profesor.lectiiPredate} lecții predate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{profesor.limbajVorbit.join(', ')}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Specializări:</p>
                    <div className="flex flex-wrap gap-2">
                      {profesor.specializare.map((spec, i) => (
                        <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Certificări:</p>
                    <div className="space-y-1">
                      {profesor.certificari.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">
                          <Euro className="inline-block w-5 h-5" />
                          {profesor.pret}/oră
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Disponibil
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setProfessorSelectat(profesor)
                        setShowBooking(true)
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
                    >
                      Rezervă o Lecție
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Sloturi Goale */}
            {sloturiGoale.map((slot, index) => (
              <motion.div
                key={`empty-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/50 rounded-3xl shadow-lg overflow-hidden border-2 border-dashed border-gray-300"
              >
                <div className="bg-gray-100 p-6 text-center">
                  <div className="text-6xl mb-3 opacity-30">{slot.imagine}</div>
                  <h3 className="text-xl font-medium text-gray-400">{slot.nume}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-400 py-3 rounded-xl font-medium mt-6 cursor-not-allowed"
                  >
                    În Curând
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Rezervare */}
      {showBooking && profesorSelectat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowBooking(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6">Rezervă o Lecție cu {profesorSelectat.nume}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-3">Alege Data:</h3>
                <input
                  type="date"
                  className="w-full p-3 border rounded-xl"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <h3 className="font-bold mb-3">Alege Ora:</h3>
                <select className="w-full p-3 border rounded-xl">
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                  <option>17:00</option>
                  <option>18:00</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-3">Tip Lecție:</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border-2 border-purple-500 rounded-xl text-purple-600 font-medium">
                  Conversație
                </button>
                <button className="p-3 border rounded-xl hover:border-purple-500 transition">
                  Gramatică
                </button>
                <button className="p-3 border rounded-xl hover:border-purple-500 transition">
                  Pregătire Examen
                </button>
                <button className="p-3 border rounded-xl hover:border-purple-500 transition">
                  Business German
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-3">Mesaj pentru profesor (opțional):</h3>
              <textarea
                className="w-full p-3 border rounded-xl"
                rows={3}
                placeholder="Spune-i profesorului despre obiectivele tale..."
              ></textarea>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex justify-between mb-2">
                <span>Preț per oră:</span>
                <span className="font-bold">€{profesorSelectat.pret}</span>
              </div>
              <div className="flex justify-between">
                <span>Durata:</span>
                <span className="font-bold">60 minute</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-lg">€{profesorSelectat.pret}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                Anulează
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">
                Confirmă Rezervarea
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}