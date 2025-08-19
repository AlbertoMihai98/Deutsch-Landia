'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { 
  User,
  Mail,
  Calendar,
  Trophy,
  Star,
  Settings,
  LogOut,
  Crown,
  Target,
  BookOpen,
  Clock,
  Zap,
  Award,
  ChevronRight,
  Palette,
  Volume2,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Snowflake,
  Sparkles
} from 'lucide-react'

export default function ContPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'progres' | 'setari' | 'abonament'>('profil')
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('ro')
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [snowEffect, setSnowEffect] = useState(false)
  const [floatingElements, setFloatingElements] = useState(true)

  // Date mock pentru utilizator
  const userData = {
    nume: 'Ion Popescu',
    email: 'ion.popescu@email.com',
    dataInscriere: '15 Ianuarie 2024',
    nivel: 'B1',
    puncte: 1250,
    lectiiComplete: 47,
    streak: 12,
    certificateObtinute: 2,
    abonament: 'Premium',
    dataExpirare: '15 Februarie 2025'
  }

  const achievements = [
    { icon: '🔥', name: '7 Zile Streak', unlocked: true },
    { icon: '⭐', name: '100 Puncte', unlocked: true },
    { icon: '🏆', name: 'Nivel A1 Complet', unlocked: true },
    { icon: '💎', name: 'Nivel A2 Complet', unlocked: true },
    { icon: '🚀', name: '50 Lecții', unlocked: false },
    { icon: '👑', name: 'Master German', unlocked: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <EnhancedNavigation />
      
      {/* Efecte vizuale */}
      {snowEffect && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ top: -20, left: `${Math.random() * 100}%` }}
              animate={{ top: '110%' }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              ❄️
            </motion.div>
          ))}
        </div>
      )}

      {floatingElements && (
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 text-6xl opacity-10"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🦊
          </motion.div>
        </div>
      )}
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Profil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {userData.nume.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{userData.nume}</h1>
                <p className="text-gray-600 mb-2">{userData.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    Nivel {userData.nivel}
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {userData.puncte} puncte
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    {userData.streak} zile streak
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  {userData.abonament}
                </span>
                <button
                  onClick={() => setActiveTab('abonament')}
                  className="text-sm text-gray-600 hover:text-purple-600 transition"
                >
                  Expiră: {userData.dataExpirare}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { key: 'profil' as const, label: 'Profil', icon: <User className="w-5 h-5" /> },
              { key: 'progres' as const, label: 'Progres', icon: <Target className="w-5 h-5" /> },
              { key: 'setari' as const, label: 'Setări', icon: <Settings className="w-5 h-5" /> },
              { key: 'abonament' as const, label: 'Abonament', icon: <CreditCard className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            {activeTab === 'profil' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Informații Profil</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume Complet
                    </label>
                    <input
                      type="text"
                      value={userData.nume}
                      className="w-full p-3 border rounded-xl"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      className="w-full p-3 border rounded-xl"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Înscrierii
                    </label>
                    <div className="p-3 border rounded-xl flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      {userData.dataInscriere}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nivel Curent
                    </label>
                    <div className="p-3 border rounded-xl flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">{userData.nivel}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Realizări</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`text-center p-4 rounded-xl ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-yellow-100 to-orange-100'
                            : 'bg-gray-100 opacity-50'
                        }`}
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <p className="text-xs font-medium">{achievement.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progres' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Progresul Tău</h2>
                
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-2xl text-center">
                    <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-blue-600">{userData.lectiiComplete}</p>
                    <p className="text-gray-600">Lecții Complete</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-2xl text-center">
                    <Zap className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-green-600">{userData.streak}</p>
                    <p className="text-gray-600">Zile Streak</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-2xl text-center">
                    <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-purple-600">{userData.certificateObtinute}</p>
                    <p className="text-gray-600">Certificate</p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-2xl text-center">
                    <Star className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-yellow-600">{userData.puncte}</p>
                    <p className="text-gray-600">Puncte Totale</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Progres pe Niveluri</h3>
                  <div className="space-y-4">
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((nivel, i) => {
                      const progress = i < 2 ? 100 : i === 2 ? 65 : 0
                      return (
                        <div key={nivel}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{nivel}</span>
                            <span className="text-sm text-gray-600">{progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'setari' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Setări</h2>
                
                <div className="space-y-6">
                  {/* Personalizare */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Personalizare
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Fulgi de Zăpadă ❄️</p>
                          <p className="text-sm text-gray-600">Efect de iarnă pe site</p>
                        </div>
                        <button
                          onClick={() => setSnowEffect(!snowEffect)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            snowEffect ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                            animate={{ x: snowEffect ? 24 : 2 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Elemente Plutitoare ✨</p>
                          <p className="text-sm text-gray-600">Animații decorative</p>
                        </div>
                        <button
                          onClick={() => setFloatingElements(!floatingElements)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            floatingElements ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                            animate={{ x: floatingElements ? 24 : 2 }}
                          />
                        </button>
                      </div>

                      <div>
                        <p className="font-medium mb-2">Temă Site</p>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => setTheme('light')}
                            className={`p-3 rounded-xl border-2 ${
                              theme === 'light' ? 'border-purple-500' : 'border-gray-200'
                            }`}
                          >
                            ☀️ Luminos
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`p-3 rounded-xl border-2 ${
                              theme === 'dark' ? 'border-purple-500' : 'border-gray-200'
                            }`}
                          >
                            🌙 Întunecat
                          </button>
                          <button
                            onClick={() => setTheme('auto')}
                            className={`p-3 rounded-xl border-2 ${
                              theme === 'auto' ? 'border-purple-500' : 'border-gray-200'
                            }`}
                          >
                            🌓 Automat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferințe */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Preferințe
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <Volume2 className="w-4 h-4" />
                            Sunete
                          </p>
                        </div>
                        <button
                          onClick={() => setSoundEnabled(!soundEnabled)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            soundEnabled ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                            animate={{ x: soundEnabled ? 24 : 2 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Notificări
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications(!notifications)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                            animate={{ x: notifications ? 24 : 2 }}
                          />
                        </button>
                      </div>

                      <div>
                        <p className="font-medium mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Limbă Interfață
                        </p>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full p-3 border rounded-xl"
                        >
                          <option value="ro">Română</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition flex items-center gap-2">
                    <LogOut className="w-5 h-5" />
                    Deconectare
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'abonament' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Abonamentul Tău</h2>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80">Plan Curent</p>
                      <p className="text-3xl font-bold flex items-center gap-2">
                        <Crown className="w-8 h-8" />
                        {userData.abonament}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80">Preț lunar</p>
                      <p className="text-3xl font-bold">89.99 RON</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">Următoarea plată: {userData.dataExpirare}</p>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      Activ
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-purple-100 text-purple-700 py-3 rounded-xl font-medium hover:bg-purple-200 transition">
                    Schimbă Planul
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                    Istoric Facturi
                  </button>
                  <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition">
                    Anulează Abonamentul
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}