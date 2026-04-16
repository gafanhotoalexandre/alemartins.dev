import { Github, ExternalLink } from 'lucide-react'

interface ProjectDetailsProps {
  project: {
    title: string
    description: string
    stack: string[]
    github: string
    demo?: string
  }
  compact?: boolean
}

export const ProjectDetails = ({ project, compact = false }: ProjectDetailsProps) => {
  return (
    <div
      className={`rounded-xl border space-y-5 ${compact ? 'p-4 sm:p-5' : 'h-max p-5 sm:p-6 lg:sticky lg:top-8 lg:space-y-6'}`}
      style={{
        backgroundColor: 'var(--surface-1)',
        borderColor: compact ? 'var(--state-border-hover)' : 'var(--state-border)',
      }}
    >
      {/* Overline */}
      <p className="label-overline">{compact ? 'Detalhe do projeto' : 'Projeto selecionado'}</p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold sm:text-2xl" style={{ color: 'var(--text-strong)' }}>
          {project.title}
        </h3>
        <p className="leading-relaxed" style={{ color: 'var(--text-default)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span key={i} className="badge-tech">{tech}</span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 pt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-external focus-brand rounded-md"
        >
          <Github size={17} />
          Ver código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-external focus-brand rounded-md"
          >
            <ExternalLink size={17} />
            Demo
          </a>
        )}
      </div>
    </div>
  )
}
