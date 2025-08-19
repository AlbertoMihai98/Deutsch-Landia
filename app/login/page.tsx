'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronRight,
  Sparkles
} from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    parola: '',
    confirmaParola: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aici va fi logica de autentificare
    console.log('Form submitted:', formData)
    // Redirect după login
    window.location.href = '/cont'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      {/* Decorații animate */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-8xl opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🦊
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-8xl opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          🐻
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20 text-6xl opacity-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🦉
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-center">
          <Link href="/" className="inline-block">
            <motion.div 
              className="text-5xl mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold text-white">SchnellDeutsch</h1>
          <p className="text-white/90">pentru toată lumea</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 m-6 rounded-xl p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              isLogin 
                ? 'bg-white text-purple-600 shadow-md' 
                : 'text-gray-600'
            }`}
          >
            Conectare
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              !isLogin 
                ? 'bg-white text-purple-600 shadow-md' 
                : 'text-gray-600'
            }`}
          >
            Înregistrare
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-0">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nume Complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.nume}
                  onChange={(e) => setFormData({...formData, nume: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Ion Popescu"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                placeholder="email@exemplu.ro"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Parolă
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.parola}
                onChange={(e) => setFormData({...formData, parola: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirmă Parola
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmaParola}
                  onChange={(e) => setFormData({...formData, confirmaParola: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Ține-mă conectat</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Ai uitat parola?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isLogin ? 'Conectează-te' : 'Creează Cont'}
            <ChevronRight className="w-5 h-5" />
          </button>

          {!isLogin && (
            <p className="text-xs text-gray-500 text-center mt-4">
              Prin înregistrare, ești de acord cu 
              <a href="#" className="text-purple-600 hover:underline"> Termenii și Condițiile</a> și 
              <a href="#" className="text-purple-600 hover:underline"> Politica de Confidențialitate</a>
            </p>
          )}
        </form>

        {/* Social Login */}
        <div className="px-6 pb-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">sau continuă cu</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <span className="text-xl">🔍</span>
              <span className="font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <span className="text-xl">📘</span>
              <span className="font-medium">Facebook</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Link înapoi */}
      <Link href="/" className="absolute top-6 left-6 text-white hover:text-white/80 transition">
        ← Înapoi la site
      </Link>
    </div>
  )
}