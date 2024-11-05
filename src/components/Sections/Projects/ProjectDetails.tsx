import { Github, ExternalLink } from 'lucide-react'

interface ProjectDetailsProps {
  project: {
    title: string
    description: string
    stack: string[]
    github: string
    demo?: string
  }
}

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-6 space-y-6 sticky top-8 h-max">
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-white">{project.title}</h3>
        <p className="text-slate-400">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-sm border border-violet-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
        >
          <Github size={18} />
          Código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
          >
            <ExternalLink size={18} />
            Preview
          </a>
        )}
      </div>
    </div>
  )
}
