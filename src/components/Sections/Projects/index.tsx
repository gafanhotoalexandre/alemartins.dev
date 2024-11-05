import { Hash } from 'lucide-react'
import { PROJECTS } from '../../../utils/constants'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'

interface ProjectsProps {
  activeProject: number
  setActiveProject: (index: number) => void
}

export const Projects = ({
  activeProject,
  setActiveProject,
}: ProjectsProps) => {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Hash size={24} className="text-violet-500" />
          Projetos em Destaque
        </h2>
        <p className="text-slate-400">
          Uma seleção dos meus trabalhos recentes
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              active={activeProject === index}
              onClick={() => setActiveProject(index)}
            />
          ))}
        </div>
        <ProjectDetails project={PROJECTS[activeProject]} />
      </div>
    </div>
  )
}
