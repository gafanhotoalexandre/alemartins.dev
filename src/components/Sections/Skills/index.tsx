import { Hash } from 'lucide-react'
import { SkillCard } from './SkillCard'

import { SKILLS } from '@/utils/constants'

export const Skills = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Hash size={24} className="text-violet-500" />
          Habilidades & Tecnologias
        </h2>
        <p className="text-slate-400">Ferramentas que uso no dia a dia</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {SKILLS.map((category, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-medium text-white">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.items.map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
