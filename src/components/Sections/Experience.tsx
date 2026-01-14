import { Briefcase } from 'lucide-react'

interface ExperienceItem {
  role: string
  company: string
  type?: string
  period: string
  location?: string
  description: string[]
  techs?: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Desenvolvedor de Software',
    company: 'LegalPlus',
    type: 'Contrato PJ',
    period: 'Out 2025 – Presente',
    description: [
      'Desenvolvimento de APIs .NET com ASP.NET Core e EF Core',
      'Aplicação de Clean Architecture, SOLID e DDD',
      'Desenvolvimento front-end com Angular e TypeScript',
    ],
    techs: [
      '.NET 8/10',
      'ASP.NET Core',
      'EF Core',
      'Angular',
      'TypeScript',
      'DDD',
      'SOLID',
    ],
  },
  {
    role: 'Desenvolvedor Frontend Freelancer',
    company: 'Projeto Desculpai',
    period: 'Fev 2025 – Mar 2025',
    description: [
      'Interface responsiva com integração de IA',
      'Colaboração com equipe de design e testes',
    ],
    techs: ['React', 'TypeScript', 'IA'],
  },
  {
    role: 'Estagiário de Programação',
    company: 'Universidade Patativa do Assaré',
    period: 'Fev 2022 – Jun 2022',
    location: 'Juazeiro do Norte, CE',
    description: [
      'Identificação e correção de bugs no back-end em PHP (Laravel)',
      'Implementação de novas funcionalidades front-end com JavaScript e jQuery',
    ],
    techs: ['PHP', 'Laravel', 'JavaScript', 'jQuery'],
  },
]

export const Experience = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Briefcase size={24} className="text-violet-500" />
          Experiência Profissional
        </h2>
        <p className="text-slate-400">
          Principais experiências e projetos profissionais
        </p>
      </div>
      <div className="space-y-8">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 rounded-xl p-4 sm:p-6 border border-slate-800/60 shadow-lg flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-white">
                  {exp.role}
                </h3>
                <span className="text-violet-400 font-medium block sm:inline">
                  {exp.company}
                </span>
                {exp.type && (
                  <span className="ml-0 sm:ml-2 text-xs text-slate-400 block sm:inline">
                    ({exp.type})
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 text-left sm:text-right mt-1 sm:mt-0">
                {exp.period}
                {exp.location && (
                  <span className="ml-0 sm:ml-2 block sm:inline">
                    | {exp.location}
                  </span>
                )}
              </div>
            </div>
            <ul className="list-disc pl-5 text-slate-300 space-y-1 text-sm sm:text-base">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            {exp.techs && (
              <div className="mt-2 flex flex-wrap gap-2">
                {exp.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-violet-700/20 text-violet-300 px-2 py-0.5 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
