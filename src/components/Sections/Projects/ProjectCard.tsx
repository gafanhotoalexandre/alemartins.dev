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
      onClick={onClick}
      className={`w-full p-6 text-left rounded-xl border transition-all duration-300 ${
        active
          ? 'bg-slate-900/80 border-violet-500/50 shadow-lg shadow-violet-500/10'
          : 'bg-slate-900/20 border-slate-800/50 hover:border-violet-500/30'
      }`}
    >
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </button>
  )
}
