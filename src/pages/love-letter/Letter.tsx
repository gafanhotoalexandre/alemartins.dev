import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import { Heart, ChevronDown, Gift, ArrowLeft } from 'lucide-react'
import { beijinho } from '@/utils'

// Configurações de conteúdo
const letterContent = {
  title: 'Para Você, Minha Flor de Cachos Maduros 🌼',
  subtitle: 'Uma cartinha especial só pra você, meu amor',
  quote: {
    text: 'Amar é olhar juntos na mesma direção.',
    author: 'Antoine de Saint-Exupéry',
  },
  mainLetter: {
    greeting: 'Minha Lia,',
    paragraphs: [
      'Hoje não é apenas Dia dos Namorados… é mais um dia entre tantos em que agradeço a Deus por ter colocado você no meu caminho. Cada instante ao seu lado é um presente.',
      'Com você, aprendi o que é acolhimento verdadeiro. Seu abraço me dá paz, seu sorriso enche meu coração, e nossas bobeiras diárias tornam a vida muito mais leve e divertida.',
      'Vejo sua força todos os dias — cuidando, lutando, dando o seu melhor por quem você ama. Me inspiro em você e sinto orgulho em ser teu companheiro nessa caminhada.',
      'Não precisamos de grandes eventos, porque cada dia ao seu lado é uma data especial. Estamos construindo, tijolinho por tijolinho, as bases do nosso futuro com amor, respeito e liberdade de ser quem somos.',
      'Te amo de um jeito que não cabe em palavras. E quero que saiba: sou teu porto seguro, teu parceiro, teu amigo, teu namorado — e sempre serei.',
    ],
  },
  finalMessage: {
    title: 'Nosso Amor, Nosso Compromisso',
    message:
      'Mais do que datas, estamos vivendo uma história linda — e mal posso esperar por tudo o que ainda construiremos juntos.',
    signature: 'Com todo meu amor,',
    signatureName: 'Teu Ale ❤️',
  },
  envelopeLetter: {
    greeting: 'Minha flor,',
    lines: [
      'Hoje celebramos o amor, mas ele mora em cada momento simples do nosso dia a dia.',
      'Te olhar sorrindo é ver o brilho da vida. Te abraçar é estar em casa.',
      'Prometo seguir ao teu lado, sendo teu apoio e teu carinho em cada capítulo da nossa história.',
    ],
    signature: 'Com todo meu amor,',
    name: 'Ale',
  },
}

const loveReasons = [
  {
    icon: '🌸',
    title: 'Seu Jeitinho Doce e Meigo',
    description:
      'Seu sorriso que preenche suas bochechinhas e os olhinhos saltados são um encanto que me derrete todos os dias.',
  },
  {
    icon: '💪',
    title: 'Sua Força Admirável',
    description:
      'Te vejo enfrentar as batalhas do dia a dia com coragem, cuidando de tudo com tanto zelo e responsabilidade. Você é uma mulher incrível.',
  },
  {
    icon: '😂',
    title: 'Nosso Humor Quebrado',
    description:
      'As nossas bobagens, as piadas internas, os apelidos excêntricos... tudo isso é só nosso e eu amo cada segundo dessas bobeiras.',
  },
  {
    icon: '🤗',
    title: 'O Teu Abraço Aconchegante',
    description:
      'Quando estou nos seus braços, é como se o mundo ficasse em silêncio e só existisse nós dois.',
  },
  {
    icon: '🤲',
    title: 'Seu Coração Generoso',
    description:
      'O jeito que cuida da sua casa, da sua família, de mim… seu amor transborda em pequenos gestos todos os dias.',
  },
  {
    icon: '🌱',
    title: 'Como Crescemos Juntos',
    description:
      'Cada dia ao seu lado é um aprendizado. Me ensina a ser eu mesmo, com leveza, acolhimento e segurança.',
  },
  {
    icon: '🔥',
    title: 'A Nossa Sintonia',
    description:
      'É impressionante como temos uma harmonia tão natural. Parece que nossas almas sempre souberam se encontrar.',
  },
  {
    icon: '💖',
    title: 'O Compromisso que Construímos',
    description:
      'Mais do que datas, estamos plantando as raízes de uma vida inteira juntos, com amor e livre vontade.',
  },
  {
    icon: '🌻',
    title: 'Minha Flor de Cachinhos Maduros',
    description:
      'Sim, até as minhas doidices viram carinho contigo. Minha flor de cachos maduros e frutos nuciformes 🌰🌼 (e você ainda achou fofo kkk).',
  },
  {
    icon: '👩‍❤️‍👨',
    title: 'Por Ser Exatamente Quem Você É',
    description:
      'Amo cada detalhe seu. Suas qualidades, manias, jeitinhos — tudo em você é puro encanto.',
  },
]

const memories = [
  {
    title: 'Nosso Primeiro Encontro',
    date: '4 de Março, 2024',
    description:
      'Saímos para uma caminhada e eu me encantei com seu olhar tímido e aquele sorriso sutil. Senti um friozinho na barriga, mas acho que disfarcei bem… hihihi.',
  },
  {
    title: 'Nossas Primeiras Fotos Juntos',
    date: '20 de Março, 2024',
    description:
      'No nosso “lugar de sempre”, lá na passarela no fim da cidade, tiramos nossas primeiras fotos. Foi ali que te disse “eu te amo” pela primeira vez. E dois dias depois, naquele 22 de março cheio de surpresas, te pedi em namoro. Coisa de Deus!',
  },
  {
    title: 'Primeira Aventura no Parque',
    date: '29 de Maio, 2024',
    description:
      'Nossa primeira vez no parque — e sua primeira vez num parque! Saber que compartilhei esse momento contigo aquece meu coração. Somos aventureiros na medida certa, hehe.',
  },
  {
    title: 'Nosso Primeiro Ano Novo',
    date: '31 de Dezembro, 2024',
    description:
      'Não foi como imaginei, mas foi incrível do nosso jeitinho. Passeamos de carro com a Marininha, andamos na praça e tiramos fotos. Cada segundo foi especial com você.',
  },
  {
    title: 'Dias Atuais',
    date: 'Junho, 2025',
    description:
      'E todos os outros dias que virão... Porque cada novo dia ao seu lado é mais quentinho que o anterior. Te amo mais a cada amanhecer.',
  },
]

const quotes = [
  {
    text: 'O verdadeiro amor não tem fim, pois é eterno como a alma.',
    author: 'Platão',
  },
]

export function Letter() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [showLoveButton, setShowLoveButton] = useState(false)
  const [loveButtonText, setLoveButtonText] = useState('Te Amo!')
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [specialButtonClicked, setSpecialButtonClicked] = useState(false)
  const [timeData, setTimeData] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
  })

  // Data de início do relacionamento
  const START_DATE = useMemo(() => new Date('2024-03-22T19:00:00'), [])

  // Atualizar contador de tempo
  useEffect(() => {
    const updateTimeTogether = () => {
      const now = new Date()

      let years = now.getFullYear() - START_DATE.getFullYear()
      let months = now.getMonth() - START_DATE.getMonth()
      let days = now.getDate() - START_DATE.getDate()
      let hours = now.getHours() - START_DATE.getHours()

      if (hours < 0) {
        hours += 24
        days -= 1
      }

      if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += previousMonth.getDate()
        months -= 1
      }

      if (months < 0) {
        months += 12
        years -= 1
      }

      setTimeData({ years, months, days, hours })
    }

    updateTimeTogether()
    const interval = setInterval(updateTimeTogether, 3600000)

    return () => clearInterval(interval)
  }, [START_DATE])

  // Animações de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('[data-fade-in]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Botão flutuante de amor
  useEffect(() => {
    const showRandomLoveButton = () => {
      if (Math.random() > 0.7) {
        setShowLoveButton(true)
        setTimeout(() => setShowLoveButton(false), 3000)
      }
    }

    const interval = setInterval(showRandomLoveButton, 15000)
    return () => clearInterval(interval)
  }, [])

  const handleLoveButtonClick = () => {
    setLoveButtonText('Eu te amo muito!')
    setTimeout(() => {
      setShowLoveButton(false)
      setLoveButtonText('Te Amo!')
    }, 2000)
  }

  const handleSpecialButtonClick = () => {
    setSpecialButtonClicked(true)
    // Simular efeito confetti com corações
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div')
        heart.innerHTML = '❤️'
        heart.className =
          'fixed text-2xl pointer-events-none z-50 animate-bounce'
        heart.style.left = Math.random() * 100 + 'vw'
        heart.style.top = '0'
        heart.style.fontSize = Math.random() * 20 + 20 + 'px'
        document.body.appendChild(heart)

        setTimeout(() => heart.remove(), 3000)
      }, i * 100)
    }
  }

  const FloatingHearts = () => {
    const hearts = ['❤️', '💜', '💖', '💕']

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <span className="text-2xl">
              {hearts[Math.floor(Math.random() * hearts.length)]}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <FloatingHearts />

      {/* Botão flutuante de amor */}
      {showLoveButton && (
        <button
          onClick={handleLoveButtonClick}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-violet-700 hover:to-pink-600 transition-all animate-bounce"
        >
          <Heart className="inline w-4 h-4 mr-2" />
          {loveButtonText}
        </button>
      )}

      {/* Header */}
      <header className="min-h-screen flex flex-col items-center justify-center relative z-10 pt-16">
        <div className="text-center px-4 relative">
          {/* Corações decorativos */}
          <div className="absolute -top-8 left-[10%] text-2xl animate-float">
            💖
          </div>
          <div className="absolute top-5 right-[15%] text-2xl animate-float">
            💜
          </div>
          <div className="absolute -bottom-10 left-[20%] text-2xl animate-float">
            💝
          </div>

          <h1 className="text-6xl md:text-8xl font-script bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent mb-6 animate-pulse">
            {letterContent.title}
          </h1>

          <div className="overflow-hidden border-r-2 border-violet-500 whitespace-nowrap mx-auto animate-pulse">
            <p className="text-xl text-wrap md:text-2xl text-slate-300 font-light mb-8">
              {letterContent.subtitle}
            </p>
          </div>

          <div className="mt-12 mb-8">
            <div className="w-16 h-0.5 bg-violet-500 mx-auto animate-pulse"></div>
          </div>

          {/* Placeholder para foto */}
          {/* <div className="w-48 h-48 mx-auto mb-8 border-2 border-violet-500/50 rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <div className="bg-gradient-to-br from-violet-900 to-pink-800 w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <Heart className="w-12 h-12 mx-auto mb-2" />
                <p className="font-script">Nossa Foto</p>
              </div>
            </div>
          </div> */}
          {/* Nossa foto estilo Studio Ghibli */}
          <div className="w-48 h-48 mx-auto mb-8 border-2 border-violet-500/50 rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-lg shadow-violet-500/20">
            <img
              src={beijinho}
              alt="Ale e Lia - Arte estilo Studio Ghibli"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <p className="text-lg text-violet-300 max-w-md mx-auto">
            "{letterContent.quote.text}"
            <span className="block text-sm text-slate-400 mt-1">
              - {letterContent.quote.author}
            </span>
          </p>

          <div className="mt-12">
            <a href="#memories" className="inline-block animate-bounce">
              <ChevronDown className="text-violet-400 w-8 h-8" />
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 px-4 max-w-4xl mx-auto">
        {/* Carta principal */}
        <section
          id="letter"
          data-fade-in
          className={`py-16 transition-all duration-1000 ${
            visibleElements.has('letter')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow">
            <h2 className="text-3xl md:text-4xl font-script text-violet-400 mb-6">
              {letterContent.mainLetter.greeting}
            </h2>
            {letterContent.mainLetter.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg md:text-xl leading-relaxed text-slate-200 mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Motivos para amar */}
        <section
          id="reasons"
          data-fade-in
          className={`py-16 transition-all duration-1000 ${
            visibleElements.has('reasons')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-script text-center text-pink-400 mb-12">
            10 Motivos Pelos Quais Eu Te Amo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loveReasons.map((reason, index) => (
              <div
                key={index}
                className={`bg-slate-800/70 border border-violet-500/30 rounded-xl p-6 hover:bg-slate-800/90 hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-300 ${
                  index >= 8 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start">
                  <span className="text-pink-500 text-2xl mr-3">
                    {reason.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-violet-300 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-slate-300">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tempo juntos */}
        <section
          id="time"
          data-fade-in
          className={`py-16 transition-all duration-1000 ${
            visibleElements.has('time')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-violet-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-script text-center text-white mb-10">
              Nosso Tempo Juntos
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-slate-900/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-violet-300">
                  {timeData.years}
                </div>
                <div className="text-slate-300 mt-2">Anos</div>
              </div>
              <div className="bg-slate-900/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-violet-300">
                  {timeData.months}
                </div>
                <div className="text-slate-300 mt-2">Meses</div>
              </div>
              <div className="bg-slate-900/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-violet-300">
                  {timeData.days}
                </div>
                <div className="text-slate-300 mt-2">Dias</div>
              </div>
              <div className="bg-slate-900/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-violet-300">
                  {timeData.hours}
                </div>
                <div className="text-slate-300 mt-2">Horas</div>
              </div>
            </div>

            <p className="text-center text-xl text-slate-200 italic">
              "{quotes[0].text}"
              <span className="block text-sm text-slate-400 mt-2">
                - {quotes[0].author}
              </span>
            </p>
          </div>
        </section>

        {/* Lembranças */}
        <section
          id="memories"
          data-fade-in
          className={`py-16 transition-all duration-1000 ${
            visibleElements.has('memories')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-script text-center text-violet-400 mb-12">
            Nossas Lembranças Especiais
          </h2>

          <div className="max-w-2xl mx-auto">
            {memories.map((memory, index) => (
              <div key={index} className="relative pl-8 mb-10">
                <div
                  className={`absolute left-0 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500`}
                ></div>
                <div className="absolute left-2 top-0 h-full w-0.5 bg-violet-500/50"></div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-violet-500/30 hover:border-pink-500/50 transition-colors">
                  <div className="font-semibold text-violet-300">
                    {memory.title}
                  </div>
                  <div className="text-sm text-slate-400 mb-3">
                    {memory.date}
                  </div>
                  <p className="text-slate-300">{memory.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Envelope */}
        <section
          id="envelope"
          data-fade-in
          className={`py-16 transition-all duration-1000 ${
            visibleElements.has('envelope')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-script text-center text-pink-400 mb-6">
            Uma Surpresa Especial
          </h2>
          <p className="text-center text-slate-300 mb-8">
            Toque no envelope para abrir minha carta de amor
          </p>

          <div className="max-w-sm mx-auto">
            <div
              onClick={() => setEnvelopeOpen(!envelopeOpen)}
              className="relative w-80 h-52 cursor-pointer transition-transform mx-auto"
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg shadow-2xl overflow-hidden">
                {/* Envelope interior shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-400/20 to-transparent"></div>
              </div>

              {/* Envelope flap (back) - sempre visível */}
              <div
                className={`absolute -top-1 left-0 w-0 h-0 border-l-40 border-r-40 border-b-26 border-l-slate-400 border-r-slate-400 border-b-slate-200 transition-transform duration-700 origin-bottom ${
                  envelopeOpen ? 'rotate-180' : ''
                }`}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  zIndex: envelopeOpen ? 10 : 30,
                }}
              ></div>

              {/* Letter - com efeito de clip-path para ficar "dentro" do envelope */}
              <div
                className={`absolute left-1/2 w-64 bg-white rounded-sm shadow-lg text-slate-800 text-sm transition-all duration-700 ease-in-out transform -translate-x-1/2 ${
                  envelopeOpen
                    ? 'top-[-120px] opacity-100 rotate-0 scale-100'
                    : 'top-8 opacity-90 rotate-1 scale-95'
                }`}
                style={{
                  clipPath: envelopeOpen
                    ? 'inset(0 0 0 0)'
                    : 'inset(0 0 60% 0)',
                  zIndex: 20,
                }}
              >
                <div className="p-4 font-script font-black leading-relaxed">
                  <p className="font-semibold mb-2">
                    {letterContent.envelopeLetter.greeting}
                  </p>
                  {letterContent.envelopeLetter.lines.map((line, index) => (
                    <p key={index} className="mt-2 text-xs">
                      {line}
                    </p>
                  ))}
                  <p className="mt-4 text-right text-xs">
                    {letterContent.envelopeLetter.signature}
                  </p>
                  <p className="text-right font-bold text-sm text-violet-700">
                    {letterContent.envelopeLetter.name}
                  </p>
                </div>
              </div>

              {/* Heart seal no envelope */}
              <div
                className={`absolute top-[-8px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                  envelopeOpen ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                }`}
                style={{ zIndex: 40 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-md">
                  ❤️
                </div>
              </div>

              {/* Indicação visual de que é clicável */}
              <div className="absolute bottom-2 right-2 text-slate-500 text-xs opacity-60">
                {envelopeOpen ? 'Fechar' : 'Abrir'}
              </div>
            </div>
          </div>
        </section>

        {/* Mensagem final */}
        <section
          id="final"
          data-fade-in
          className={`py-16 text-center transition-all duration-1000 ${
            visibleElements.has('final')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-violet-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-script bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-8">
              {letterContent.finalMessage.title}
            </h2>

            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent text-6xl animate-pulse leading-tight">
                ❣
              </div>
            </div>

            <p className="text-xl md:text-2xl text-slate-200 mb-8">
              {letterContent.finalMessage.message}
            </p>

            <div className="mb-8">
              <button
                onClick={handleSpecialButtonClick}
                className={`${
                  specialButtonClicked
                    ? 'bg-green-600'
                    : 'bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600'
                } text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105`}
              >
                <Gift className="inline w-4 h-4 mr-2" />
                {specialButtonClicked
                  ? 'Presente Surpresa Enviado!'
                  : 'Meu Presente Especial'}
              </button>
            </div>

            <p className="text-lg text-slate-300 mt-6 font-script">
              {letterContent.finalMessage.signature}
              <br />
              <span className="text-violet-400 text-xl">
                {letterContent.finalMessage.signatureName}
              </span>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10 border-t border-violet-900 mt-8">
        <div className="mb-4">
          <Link
            to="/"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="inline w-4 h-4 mr-2" />
            Voltar para alemartins.dev.br
          </Link>
        </div>
        <div className="text-slate-500 text-sm">
          Feito com 💜 especialmente para você | ale martins &copy;{' '}
          {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}
