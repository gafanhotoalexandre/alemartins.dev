import { Code } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'
import { SectionHeader } from '@/components/SectionHeader'

import { PROJECTS } from '@/utils/constants'

interface ProjectsProps {
  activeProject: number
  setActiveProject: (index: number) => void
}

export const Projects = ({
  activeProject,
  setActiveProject,
}: ProjectsProps) => {
  return (
    <div className="space-y-10 sm:space-y-12">
      <SectionHeader
        icon={<Code size={22} />}
        title="Projetos em destaque"
        description="Uma seleção do que construí — do frontend ao backend."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(19rem,1fr)] lg:items-start lg:gap-8">
        <div className="space-y-3 sm:space-y-4">
          {PROJECTS.map((project, index) => (
            <div key={project.title} className="space-y-3">
              <ProjectCard
                title={project.title}
                description={project.description}
                active={activeProject === index}
                onClick={() => setActiveProject(index)}
              />
              {activeProject === index && (
                <div className="lg:hidden">
                  <ProjectDetails project={project} compact />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <ProjectDetails project={PROJECTS[activeProject]} />
        </div>
      </div>
    </div>
  )
}
