'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Sparkles, Star, Trophy, Play, Volume2, Gamepad2, Rocket, Target, Music,
  VolumeX, Settings, BookOpen, Gift, Mic, CheckCircle, XCircle, ChevronDown,
  ChevronUp, Languages, Award, User, Home as HomeIcon, Bookmark, HelpCircle,
  Brain, Zap, Shield, TrendingUp, Users, Globe, Headphones, Video, MessageSquare,
  ArrowRight, Menu, X, Send, Camera, Code, Cpu, Database, Cloud, Lock, Coins
} from 'lucide-react'

// Enhanced Types
interface Animal {
  name: string
  emoji: string
  gradient: string
  level: string
  description: string
  skills: string[]
  progress: number
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay: number
}

interface Testimonial {
  name: string
  age?: number
  role: string
  avatar: string
  content: string
  rating: number
  verified: boolean
}

interface GameMode {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  difficulty: 'Easy' | 'Medium' | 'Hard'
  xpReward: number
  gradient: string
}

// Floating Particles Component
const ParticleField = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 20
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// 3D Card Component
const Card3D = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu transition-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return
    
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
        setHasAnimated(true)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, hasAnimated])

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

// Main Component
export default function SchnellDeutschPremium() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [showDemo, setShowDemo] = useState(false)
  const [userXP, setUserXP] = useState(0)
  
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Enhanced Animals Data
  const animals: Animal[] = [
    {
      name: 'Felix Vulpea',
      emoji: '🦊',
      gradient: 'from-orange-400 via-red-400 to-pink-400',
      level: 'A1-A2',
      description: 'Maestrul începătorilor, specialist în pronunție perfectă',
      skills: ['Vocabular de bază', 'Pronunție', 'Fraze esențiale'],
      progress: 95
    },
    {
      name: 'Luna Bufnița',
      emoji: '🦉',
      gradient: 'from-purple-400 via-indigo-400 to-blue-400',
      level: 'B1-B2',
      description: 'Expertă în gramatică avansată și conversații complexe',
      skills: ['Gramatică avansată', 'Timpuri verbale', 'Conversație'],
      progress: 87
    },
    {
      name: 'Max Dragonul',
      emoji: '🐲',
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
      level: 'C1-C2',
      description: 'Ghidul suprem pentru fluență și exprimare academică',
      skills: ['Fluență', 'Business German', 'Limbaj academic'],
      progress: 92
    }
  ]

  // Enhanced Features
  const features: Feature[] = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Adaptiv Neural',
      description: 'Învățare personalizată cu AI care evoluează cu tine',
      gradient: 'from-purple-500 to-indigo-500',
      delay: 0
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Metavers Educațional',
      description: 'Lumi 3D interactive unde limba prinde viață',
      gradient: 'from-pink-500 to-rose-500',
      delay: 0.1
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Quantum Learning',
      description: 'Metodă revoluționară de memorare accelerată',
      gradient: 'from-yellow-500 to-orange-500',
      delay: 0.2
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Blockchain Certificates',
      description: 'Certificate verificabile global pe blockchain',
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Live Classes VR',
      description: 'Clase live cu profesori nativi în realitate virtuală',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.4
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Neural Voice Match',
      description: 'Analiză vocală cu precizie de 99.9%',
      gradient: 'from-red-500 to-pink-500',
      delay: 0.5
    }
  ]

  // Game Modes
  const gameModes: GameMode[] = [
    {
      id: 'adventure',
      title: 'Quest Adventure',
      description: 'Explorează regatul german într-o aventură RPG epică',
      icon: <Rocket className="w-6 h-6" />,
      difficulty: 'Medium',
      xpReward: 250,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'battle',
      title: 'Vocabulary Battle',
      description: 'Luptă PvP în arene lingvistice competitive',
      icon: <Target className="w-6 h-6" />,
      difficulty: 'Hard',
      xpReward: 500,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'puzzle',
      title: 'Grammar Puzzle',
      description: 'Rezolvă puzzle-uri gramaticale pentru comori',
      icon: <Code className="w-6 h-6" />,
      difficulty: 'Easy',
      xpReward: 150,
      gradient: 'from-blue-500 to-cyan-500'
    }
  ]

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      name: 'Sofia Martinez',
      age: 10,
      role: 'Top Player',
      avatar: '👧',
      content: 'Am învățat germană în 3 luni! Acum sunt level 50 și pot vorbi fluent!',
      rating: 5,
      verified: true
    },
    {
      name: 'Dr. Elena Popescu',
      role: 'Părinte & Profesor',
      avatar: '👩‍🏫',
      content: 'Cea mai avansată platformă de învățare pe care am văzut-o. Rezultate incredibile!',
      rating: 5,
      verified: true
    },
    {
      name: 'Alex Chen',
      age: 12,
      role: 'Champion 2024',
      avatar: '🏆',
      content: 'Am câștigat campionatul național! Mulțumesc SchnellDeutsch!',
      rating: 5,
      verified: true
    }
  ]

  useEffect(() => {
    // Simulate XP loading
    const timer = setTimeout(() => setUserXP(12500), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      <ParticleField />
      
      {/* Advanced Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                🦊
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SchnellDeutsch
                </h1>
                <p className="text-xs text-gray-400">Premium Edition</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#games" className="hover:text-purple-400 transition-colors">Games</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold shadow-lg shadow-purple-500/30"
              >
                Start Free Trial
              </motion.button>

              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
                <Coins className="w-5 h-5 text-yellow-400" />
                <AnimatedCounter value={userXP} suffix=" XP" />
              </div>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: heroY }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </motion.div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6 border border-purple-500/30"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Revoluția învățării digitale</span>
            </motion.div>

            <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Învață Germană
              </span>
              <br />
              <span className="text-white">în Metavers</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Platformă AI cu realitate virtuală, gaming 3D și blockchain certificates. 
              Tehnologie din 2030, disponibilă acum.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/30 flex items-center gap-2"
                onClick={() => setShowDemo(true)}
              >
                <Play className="w-5 h-5" />
                Începe Gratuit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl font-bold text-lg flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Vezi Demo VR
              </motion.button>
            </div>

            <div className="flex items-center gap-8 mt-8">
              <div className="flex -space-x-3">
                {['👦', '👧', '👨', '👩', '🧑'].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl border-2 border-slate-900">
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-400">50,000+ elevi activi</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* 3D Rotating Cube */}
              <motion.div
                className="w-80 h-80 relative preserve-3d"
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {animals.map((animal, index) => (
                  <motion.div
                    key={index}
                    className={`absolute inset-0 bg-gradient-to-br ${animal.gradient} rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 backdrop-blur`}
                    style={{
                      transform: `rotateY(${index * 120}deg) translateZ(160px)`,
                      backfaceVisibility: 'hidden'
                    }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedAnimal(animal)}
                  >
                    <span className="text-8xl mb-4">{animal.emoji}</span>
                    <h3 className="text-2xl font-bold mb-2">{animal.name}</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      Level {animal.level}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute top-0 right-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">Top #1 România</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">AI Powered</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tehnologie din Viitor
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Singura platformă care combină AI, VR, Blockchain și Gamification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
              >
                <Card3D>
                  <div className="h-full bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-purple-400 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Află mai multe</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section id="games" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Game Modes
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Învață jucându-te în universuri paralele
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {gameModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative bg-gradient-to-br ${mode.gradient} p-1 rounded-2xl`}
              >
                <div className="bg-slate-900 rounded-2xl p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      {mode.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      mode.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      mode.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {mode.difficulty}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
                  <p className="text-gray-400 mb-4">{mode.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold">+{mode.xpReward} XP</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-4 py-2 bg-white/10 rounded-lg font-semibold"
                    >
                      Play Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: 50000, label: 'Elevi Activi', suffix: '+' },
              { value: 98, label: 'Rată Succes', suffix: '%' },
              { value: 1000000, label: 'Lecții Complete', suffix: '+' },
              { value: 4.9, label: 'Rating', suffix: '★' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card3D>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-gray-400 mt-2">{stat.label}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card3D>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                      {testimonial.verified && (
                        <CheckCircle className="w-5 h-5 text-blue-400 ml-auto" />
                      )}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative text-center">
              <motion.h2 
                className="text-5xl font-black mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Pregătit pentru Aventură?
              </motion.h2>
              <p className="text-xl mb-8 text-white/90">
                Începe cu 14 zile gratuit. Fără card. Anulezi oricând.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl"
              >
                Începe Gratuit Acum
              </motion.button>
              <p className="mt-4 text-sm text-white/70">
                Alătură-te celor 50,000+ de elevi care învață cu noi
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
                  🦊
                </div>
                <span className="font-bold text-lg">SchnellDeutsch</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revoluționăm învățarea limbii germane prin tehnologie de ultimă generație.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Platformă</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Games</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">AI Technology</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">VR Experience</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Companie</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex gap-3">
                {['📧', '💬', '📱', '🎮'].map((icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© 2024 SchnellDeutsch Premium. Made with ❤️ and AI in România.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-80 bg-slate-900/95 backdrop-blur-xl z-50 p-6 border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-4">
              <a href="#features" className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">Features</a>
              <a href="#games" className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">Games</a>
              <a href="#pricing" className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">Pricing</a>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold">
                Start Free Trial
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animal Modal */}
      <AnimatePresence>
        {selectedAnimal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedAnimal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <span className="text-6xl">{selectedAnimal.emoji}</span>
                <h3 className="text-3xl font-bold mt-4 mb-2">{selectedAnimal.name}</h3>
                <span className={`px-4 py-2 bg-gradient-to-r ${selectedAnimal.gradient} rounded-full text-sm font-semibold inline-block`}>
                  Nivel {selectedAnimal.level}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">{selectedAnimal.description}</p>
              
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-purple-400">Skills:</h4>
                {selectedAnimal.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{selectedAnimal.progress}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedAnimal.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${selectedAnimal.gradient}`}
                  />
                </div>
              </div>
              
              <button
                onClick={() => setSelectedAnimal(null)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold"
              >
                Începe cu {selectedAnimal.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-4xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Demo Interactiv</h2>
                <button onClick={() => setShowDemo(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Mic className="w-5 h-5 text-purple-400" />
                    Pronunție AI
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Spune "Guten Tag" și AI-ul nostru îți va analiza pronunția instant.
                  </p>
                  <button className="px-6 py-3 bg-purple-500 rounded-lg font-semibold w-full">
                    Testează Acum
                  </button>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-pink-400" />
                    AR Scanner
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Scanează obiecte din jurul tău pentru traducere instantanee.
                  </p>
                  <button className="px-6 py-3 bg-pink-500 rounded-lg font-semibold w-full">
                    Activează Camera
                  </button>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-yellow-400" />
                    Mini Game
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Joacă un quick match pentru a experimenta gameplay-ul.
                  </p>
                  <button className="px-6 py-3 bg-yellow-500 rounded-lg font-semibold w-full text-black">
                    Play Demo
                  </button>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-400" />
                    AI Chat
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Conversează cu tutorul nostru AI în germană.
                  </p>
                  <button className="px-6 py-3 bg-green-500 rounded-lg font-semibold w-full text-black">
                    Start Chat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}