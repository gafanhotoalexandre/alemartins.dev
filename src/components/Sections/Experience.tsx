import { Briefcase } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

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
    <div className="space-y-10 sm:space-y-12">
      <SectionHeader
        icon={<Briefcase size={22} />}
        title="Experiência profissional"
        description="Onde trabalhei e o que construí."
      />

      {/* Timeline */}
      <div className="relative space-y-0">
        {/* Vertical line */}
        <div
          className="absolute bottom-3 left-[9px] top-3 w-px sm:left-[11px]"
          style={{ backgroundColor: 'var(--state-border)' }}
        />

        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="relative flex gap-3 pb-8 sm:gap-6 sm:pb-10 last:pb-0">
            {/* Timeline dot */}
            <div className="relative flex-shrink-0 mt-1">
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 sm:h-6 sm:w-6"
                style={{
                  backgroundColor: 'var(--surface-0)',
                  borderColor: idx === 0 ? 'var(--state-border-selected)' : 'var(--state-border)',
                }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  style={{ backgroundColor: idx === 0 ? 'var(--brand-primary)' : 'var(--brand-deep)' }}
                />
              </div>
            </div>

            {/* Card */}
            <div
              className="flex-1 rounded-xl border p-4 space-y-4 sm:p-5"
              style={{
                backgroundColor: 'var(--surface-1)',
                borderColor: idx === 0 ? 'var(--state-border-selected)' : 'var(--state-border)',
              }}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-lg leading-tight" style={{ color: 'var(--text-strong)' }}>
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                    <span className="font-medium text-sm" style={{ color: 'var(--brand-soft)' }}>
                      {exp.company}
                    </span>
                    {exp.type && (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {exp.type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-1 text-xs sm:mt-0 sm:text-right sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                  {exp.period}
                  {exp.location && <span className="block">{exp.location}</span>}
                </div>
              </div>

              <ul className="space-y-1.5">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-default)' }}>
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }} />
                    {item}
                  </li>
                ))}
              </ul>

              {exp.techs && (
                <div className="flex flex-wrap gap-2">
                  {exp.techs.map((tech, i) => (
                    <span key={i} className="badge-tech">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

