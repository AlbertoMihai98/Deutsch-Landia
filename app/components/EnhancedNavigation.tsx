'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
  Star,
  Volume2,
  VolumeX,
  Settings,
  GraduationCap,
  Book,
  Users,
  TestTube,
  CreditCard,
  User,
  LogIn,
  Menu,
  X,
  ChevronDown,
  Library
} from 'lucide-react'
import { useState } from 'react'

export default function EnhancedNavigation() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userPoints] = useState(1250)

  const menuItems = [
    {
      title: 'Învață',
      icon: <BookOpen className="w-5 h-5" />,
      dropdown: [
        { href: '/lectii', label: 'Lecții A1-C2', icon: '📚' },
        { href: '/gramatica', label: 'Gramatică', icon: '📖' },
        { href: '/vocabular', label: 'Vocabular', icon: '📝' },
        { href: '/povesti', label: 'Povești', icon: '📚' }
      ]
    },
    {
      title: 'Practică',
      icon: <Gamepad2 className="w-5 h-5" />,
      dropdown: [
        { href: '/der-die-das', label: 'Der/Die/Das', icon: '🎮' },
        { href: '/exercitii', label: 'Exerciții', icon: '✍️' },
        { href: '/test-nivel', label: 'Test Nivel', icon: '🎯' }
      ]
    },
    {
      title: 'Profesori',
      href: '/profesori',
      icon: <Users className="w-5 h-5" />
    }
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦊
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                SchnellDeutsch
              </span>
              <span className="block text-xs text-gray-600">pentru toată lumea</span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <div key={item.title} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === item.title ? null : item.title)}
                      onMouseEnter={() => setDropdownOpen(item.title)}
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition font-medium"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        dropdownOpen === item.title ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {dropdownOpen === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onMouseLeave={() => setDropdownOpen(null)}
                        className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl p-2 min-w-[200px]"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition"
                            onClick={() => setDropdownOpen(null)}
                          >
                            <span className="text-xl">{subItem.icon}</span>
                            <span className="text-gray-700">{subItem.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition font-medium"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}

            <Link
              href="/abonamente"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition font-medium"
            >
              <CreditCard className="w-5 h-5" />
              <span>Premium</span>
            </Link>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Points */}
            {isLoggedIn && (
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-700">{userPoints.toLocaleString()} puncte</span>
              </div>
            )}

            {/* User Account */}
            {isLoggedIn ? (
              <Link
                href="/cont"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition"
              >
                <User className="w-5 h-5" />
                <span>Contul Meu</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Conectare</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="lg:hidden mt-4 pb-4 border-t pt-4"
          >
            {menuItems.map((item) => (
              <div key={item.title} className="mb-2">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === item.title ? null : item.title)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        dropdownOpen === item.title ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {dropdownOpen === item.title && (
                      <div className="ml-8 mt-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setDropdownOpen(null)
                            }}
                          >
                            <span>{subItem.icon}</span>
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
            
            <Link
              href="/abonamente"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-50 text-purple-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <CreditCard className="w-5 h-5" />
              <span>Premium</span>
            </Link>

            <div className="flex items-center gap-2 p-3">
              <span className="text-gray-600">Sunete:</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>

            {!isLoggedIn && (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span>Conectare</span>
              </Link>
            )}

            {isLoggedIn && (
              <>
                <div className="flex items-center gap-2 p-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-700">{userPoints.toLocaleString()} puncte</span>
                </div>
                <Link
                  href="/cont"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Contul Meu</span>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}