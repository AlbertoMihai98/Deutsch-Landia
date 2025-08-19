'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EnhancedNavigation from '../components/EnhancedNavigation'
import { 
  Check,
  X,
  Sparkles,
  Trophy,
  Zap,
  Crown,
  Star
} from 'lucide-react'

export default function AbonamentePage() {
  const [billingPeriod, setBillingPeriod] = useState<'lunar' | 'anual'>('lunar')

  const plans = [
    {
      name: 'Gratuit',
      price: 0,
      description: 'Perfect pentru a începe',
      color: 'from-gray-400 to-gray-500',
      icon: <Sparkles className="w-8 h-8" />,
      features: [
        { text: 'Primele 5 lecții A1', included: true },
        { text: 'Jocul Der/Die/Das (limitat)', included: true },
        { text: '3 povești pe nivel', included: true },
        { text: 'Test de nivel', included: true },
        { text: 'Acces la toate lecțiile', included: false },
        { text: 'Profesori 1-la-1', included: false },
        { text: 'Certificate oficiale', included: false },
        { text: 'Fără reclame', included: false }
      ],
      cta: 'Cont Gratuit',
      popular: false
    },
    {
      name: 'Premium',
      price: billingPeriod === 'lunar' ? 89.99 : 899.99,
      originalPrice: billingPeriod === 'lunar' ? null : 1079.88,
      description: 'Acces complet la tot conținutul',
      color: 'from-purple-500 to-pink-500',
      icon: <Crown className="w-8 h-8" />,
      features: [
        { text: 'Toate lecțiile A1-C2', included: true },
        { text: 'Toate jocurile deblocate', included: true },
        { text: 'Toate poveștile (120+)', included: true },
        { text: 'Gramatică completă', included: true },
        { text: 'Vocabular complet (5000+ cuvinte)', included: true },
        { text: 'Certificate de completare', included: true },
        { text: 'Fără reclame', included: true },
        { text: 'Suport prioritar', included: true }
      ],
      cta: 'Începe Acum',
      popular: true,
      savings: billingPeriod === 'anual' ? '2 luni gratuite!' : null
    },
    {
      name: 'Premium Plus',
      price: billingPeriod === 'lunar' ? 149.99 : 1499.99,
      originalPrice: billingPeriod === 'lunar' ? null : 1799.88,
      description: 'Include lecții 1-la-1',
      color: 'from-yellow-400 to-orange-500',
      icon: <Trophy className="w-8 h-8" />,
      features: [
        { text: 'Tot din Premium', included: true },
        { text: '4 lecții 1-la-1/lună', included: true },
        { text: 'Evaluare personalizată', included: true },
        { text: 'Plan de studiu personal', included: true },
        { text: 'Acces la webinarii live', included: true },
        { text: 'Materiale exclusive PDF', included: true },
        { text: 'Grup VIP Discord', included: true },
        { text: 'Garanție de succes', included: true }
      ],
      cta: 'Acces VIP',
      popular: false,
      savings: billingPeriod === 'anual' ? '3 luni gratuite!' : null
    }
  ]

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
                Alege Planul Tău
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Deblochează întregul potențial cu SchnellDeutsch Premium
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex bg-white rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setBillingPeriod('lunar')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  billingPeriod === 'lunar'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-600'
                }`}
              >
                Lunar
              </button>
              <button
                onClick={() => setBillingPeriod('anual')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  billingPeriod === 'anual'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-600'
                }`}
              >
                Anual
                <span className="ml-2 text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded-full">
                  Economisești 17%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-1 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1 px-8 transform rotate-12">
                    POPULAR
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                    {plan.savings}
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.color} p-8 text-center text-white`}>
                  <div className="flex justify-center mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/90 mb-4">{plan.description}</p>
                  
                  <div className="mb-2">
                    {plan.originalPrice && (
                      <p className="text-white/60 line-through text-lg">
                        {plan.originalPrice} RON
                      </p>
                    )}
                    <p className="text-5xl font-bold">
                      {plan.price === 0 ? 'Gratuit' : `${plan.price} RON`}
                    </p>
                    {plan.price !== 0 && (
                      <p className="text-white/80">
                        /{billingPeriod === 'lunar' ? 'lună' : 'an'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-bold transition ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                        : plan.price === 0
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gradient-to-r ' + plan.color + ' text-white hover:shadow-lg'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              De ce SchnellDeutsch Premium? 
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Învățare Rapidă</h3>
                <p className="text-gray-600 text-sm">Metodă optimizată special pentru români</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">Certificate Oficiale</h3>
                <p className="text-gray-600 text-sm">Primești certificate pentru fiecare nivel</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">Conținut Premium</h3>
                <p className="text-gray-600 text-sm">Peste 500 lecții și 5000+ cuvinte</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold mb-2">Suport Dedicat</h3>
                <p className="text-gray-600 text-sm">Ajutor când ai nevoie</p>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Întrebări Frecvente</h3>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-white rounded-xl p-6 shadow-lg cursor-pointer">
                <summary className="font-bold text-left">Pot anula oricând?</summary>
                <p className="mt-3 text-gray-600">
                  Da! Poți anula abonamentul oricând din setările contului. Nu există taxe de anulare.
                </p>
              </details>
              
              <details className="bg-white rounded-xl p-6 shadow-lg cursor-pointer">
                <summary className="font-bold text-left">Pot schimba planul mai târziu?</summary>
                <p className="mt-3 text-gray-600">
                  Sigur! Poți face upgrade sau downgrade oricând. Diferența va fi calculată proporțional.
                </p>
              </details>
              
              <details className="bg-white rounded-xl p-6 shadow-lg cursor-pointer">
                <summary className="font-bold text-left">Există perioadă de probă?</summary>
                <p className="mt-3 text-gray-600">
                  Da, ai 7 zile garanție de returnare a banilor pentru planurile Premium.
                </p>
              </details>
              
              <details className="bg-white rounded-xl p-6 shadow-lg cursor-pointer">
                <summary className="font-bold text-left">Cum funcționează plata?</summary>
                <p className="mt-3 text-gray-600">
                  Acceptăm card de credit/debit și PayPal. Plata este securizată și procesată prin Stripe.
                </p>
              </details>
            </div>
          </motion.div>

          {/* Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">
              🛡️ Garanție 100% Returnare Bani
            </h3>
            <p className="text-xl mb-2">
              Încearcă Premium fără niciun risc timp de 7 zile
            </p>
            <p className="text-white/90">
              Dacă nu ești mulțumit, îți returnăm toți banii. Fără întrebări!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}