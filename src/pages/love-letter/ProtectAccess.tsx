import { useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Heart, Lock, Calendar, ArrowLeft } from 'lucide-react'

interface ProtectAccessProps {
  children: ReactNode
}
export function ProtectedAccess({ children }: ProtectAccessProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dateInput, setDateInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Data correta: 22 de março (formato dd/mm)
  const CORRECT_DATE = '22/03'
  const MAX_ATTEMPTS = 3

  // Verificar se já está autenticado no sessionStorage
  useEffect(() => {
    const authenticated = sessionStorage.getItem('lia-letter-auth')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsLoading(true)
    setShowError(false)

    // Simular um pequeno delay para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (dateInput === CORRECT_DATE) {
      sessionStorage.setItem('lia-letter-auth', 'true')
      setIsAuthenticated(true)
    } else {
      setAttempts((prev) => prev + 1)
      setShowError(true)
      setDateInput('')

      if (attempts + 1 >= MAX_ATTEMPTS) {
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    }
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '') // Remove tudo que não é dígito

    // Formatar automaticamente como dd/mm
    if (value.length >= 3) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }

    setDateInput(value)
    setShowError(false)
  }

  // Efeito de corações flutuantes
  const FloatingHearts = () => {
    const hearts = ['💜', '💖', '💕', '❤️']

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <span className="text-xl">
              {hearts[Math.floor(Math.random() * hearts.length)]}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // Se autenticado, mostrar o conteúdo protegido
  if (isAuthenticated) {
    return children
  }

  // Tela de autenticação
  return (
    <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Ícone de cadeado com coração */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Lock className="w-16 h-16 text-violet-400 mx-auto mb-4" />
            <Heart className="w-6 h-6 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-3xl font-script bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Acesso Especial
          </h1>
          <p className="text-slate-300 text-sm">
            Esta página é só nossa, meu amor 💜
          </p>
        </div>

        {/* Formulário de autenticação */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-violet-500/20 border border-violet-500/30">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Qual é a data do nosso aniversário de namoro?
              </label>
              <input
                type="text"
                value={dateInput}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                placeholder="dd/mm"
                maxLength={5}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                disabled={isLoading}
                autoFocus
              />

              {showError && (
                <div className="mt-2 text-sm text-red-400 animate-pulse">
                  {attempts >= MAX_ATTEMPTS ? (
                    <>❌ Tentativas esgotadas. Redirecionando...</>
                  ) : (
                    <>
                      ❌ Data incorreta. Tentativa {attempts}/{MAX_ATTEMPTS}
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || dateInput.length < 5}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verificando...
                </span>
              ) : (
                <>
                  <Heart className="inline w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <button
              onClick={() => navigate('/')}
              className="w-full text-slate-400 hover:text-slate-300 transition-colors text-sm"
            >
              <ArrowLeft className="inline w-4 h-4 mr-2" />
              Voltar para alemartins.dev.br
            </button>
          </div>
        </div>

        {/* Dica sutil */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            💡 Dica: Pense no dia que oficializamos nosso amor
          </p>
        </div>
      </div>
    </div>
  )
}
