interface AboutProps {
  setActiveSection: (section: string) => void
}

export const About = ({ setActiveSection }: AboutProps) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-8 flex items-center">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        {/* Content Column */}
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-violet-500 font-medium">
              Olá, eu sou{' '}
              <code className="text-white rounded-lg hover:bg-violet-700 transition-colors shadow-sm shadow-violet-500/25 px-3 p-1.5">
                alemartins.dev
              </code>
            </h2>
            <h1 className="text-3xl lg:text-5xl font-bold text-white bg-gradient-to-r from-violet-400 to-indigo-400 inline-block text-transparent bg-clip-text">
              Desenvolvedor Full Stack
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0">
              Especializado em criar experiências digitais excepcionais com
              React e .NET. Focado em código limpo e soluções escaláveis.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => setActiveSection('projects')}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/25"
            >
              Ver Projetos
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className="px-6 py-3 border border-slate-700 rounded-lg hover:border-violet-500 transition-colors"
            >
              Contato
            </button>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative lg:justify-self-end flex justify-center lg:block">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
            {/* Círculo decorativo de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full blur-3xl" />

            {/* Container da imagem com anéis */}
            <div className="relative h-full">
              {/* Anel externo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 p-1">
                {/* Anel interno */}
                <div className="absolute inset-0.5 rounded-full bg-slate-950">
                  {/* Imagem */}
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src="https://github.com/gafanhotoalexandre.png"
                    alt="Alexandre Martins"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Elementos decorativos (opcional) */}
          <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  )
}

export default About
