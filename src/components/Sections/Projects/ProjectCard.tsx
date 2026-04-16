interface ProjectCardProps {
  title: string
  description: string
  active: boolean
  onClick: () => void
}

export const ProjectCard = ({
  title,
  description,
  active,
  onClick,
}: ProjectCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-active={active ? 'true' : 'false'}
      className="interactive-card focus-brand w-full rounded-xl p-4 text-left sm:p-5"
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: active ? 'var(--brand-primary)' : 'rgba(66, 48, 162, 0.5)',
          }}
        />
        <span className="label-overline" style={{ opacity: active ? 1 : 0.55 }}>
          {active ? 'Selecionado' : 'Projeto'}
        </span>
      </div>
      <h3 className="mb-1 text-base font-semibold sm:text-lg" style={{ color: 'var(--text-strong)' }}>
        {title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed" style={{ color: active ? 'var(--text-default)' : 'var(--text-muted)' }}>
        {description}
      </p>
    </button>
  )
}
