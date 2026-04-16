import { Braces } from 'lucide-react'
import { SkillCard } from './SkillCard'
import { SectionHeader } from '@/components/SectionHeader'

import { SKILLS } from '@/utils/constants'

export const Skills = () => {
  return (
    <div className="space-y-10 sm:space-y-12">
      <SectionHeader
        icon={<Braces size={22} />}
        title="Stack técnica"
        description="Tecnologias que uso no dia a dia — do banco de dados ao browser."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {SKILLS.map((category, index) => (
          <div key={index} className="space-y-3">
            <p className="label-overline">{category.category}</p>
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
