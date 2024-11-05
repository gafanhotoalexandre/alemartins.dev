import { Code } from 'lucide-react'

interface SkillCardProps {
  skill: string
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg border border-slate-800/50 hover:border-violet-500/30 transition-colors group">
      <Code size={18} className="text-violet-500" />
      <span className="group-hover:text-white transition-colors">{skill}</span>
    </div>
  )
}
