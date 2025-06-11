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
  const [showTransition, setShowTransition] = useState(false)
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

      // Iniciar transição suave
      setShowTransition(true)

      // Aguardar a animação de transição antes de mostrar o conteúdo
      setTimeout(() => {
        setIsAuthenticated(true)
      }, 2000) // 2 segundos para a transição completa
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

  // Componente de transição suave
  const TransitionOverlay = () => (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center">
      {/* Corações flutuantes mais intensos durante a transição */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + Math.random()}s`,
            }}
          >
            <span className="text-2xl md:text-3xl">
              {['💜', '💖', '💕', '❤️'][Math.floor(Math.random() * 4)]}
            </span>
          </div>
        ))}
      </div>

      {/* Conteúdo central da transição */}
      <div className="text-center z-10 px-4">
        <div className="mb-8">
          <Heart className="w-16 h-16 md:w-20 md:h-20 text-pink-400 mx-auto animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-4xl font-script bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-pulse">
          Preparando sua surpresa...
        </h2>

        <div className="flex justify-center space-x-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-violet-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <p className="text-slate-300 text-lg md:text-xl">
          Carregando sua carta de amor... 💌
        </p>

        {/* Barra de progresso animada */}
        <div className="w-64 md:w-80 mx-auto mt-8 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transform origin-left scale-x-0 animate-[scale-x_2s_ease-in-out_forwards]"
            style={{
              animation: 'progressBar 2s ease-in-out forwards',
            }}
          />
        </div>
      </div>
    </div>
  )

  // Se está em transição, mostrar overlay
  if (showTransition && !isAuthenticated) {
    return <TransitionOverlay />
  }

  // Se autenticado, mostrar o conteúdo protegido com fade-in suave
  if (isAuthenticated) {
    return <div className="animate-in fade-in duration-1000">{children}</div>
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
            Esta página é só nossa, meu benzinho 💜
          </p>
        </div>

        {/* Formulário de autenticação */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg shadow-violet-500/20 border border-violet-500/30">
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
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-slate-400 transition-all text-base md:text-lg"
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
              className="w-full bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-base md:text-lg"
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
            💡 Dica: Pense no dia que falamos do pokémon inicial
          </p>
        </div>
      </div>
    </div>
  )
}
