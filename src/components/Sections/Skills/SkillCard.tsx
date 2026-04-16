interface SkillCardProps {
  skill: string
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border px-3 py-3 sm:px-4"
      style={{
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--state-border)',
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      />
      <span className="text-sm sm:text-[15px]" style={{ color: 'var(--text-default)' }}>{skill}</span>
    </div>
  )
}
