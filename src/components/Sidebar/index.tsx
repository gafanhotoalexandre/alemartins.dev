import {
  Braces,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  FileText,
} from 'lucide-react'
import { SidebarIcon } from './SidebarIcon'

import { dotnet_fullstack_curriculum, favicon } from '@/utils'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-slate-900/50 backdrop-blur-sm border-r border-slate-800/50 flex flex-col items-center py-8 gap-8">
      <div className="relative w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center cursor-pointer">
        <img src={favicon} alt="Logo" className="w-10 h-10" />
      </div>
      <div className="flex flex-col gap-6">
        <SidebarIcon
          icon={<User size={20} />}
          active={activeSection === 'about'}
          onClick={() => setActiveSection('about')}
          tooltip="Sobre"
        />
        <SidebarIcon
          icon={<Code size={20} />}
          active={activeSection === 'projects'}
          onClick={() => setActiveSection('projects')}
          tooltip="Projetos"
        />
        <SidebarIcon
          icon={<Briefcase size={20} />}
          active={activeSection === 'experience'}
          onClick={() => setActiveSection('experience')}
          tooltip="Experiência"
        />
        <SidebarIcon
          icon={<Braces size={20} />}
          active={activeSection === 'skills'}
          onClick={() => setActiveSection('skills')}
          tooltip="Skills"
        />
        <SidebarIcon
          icon={<MessageSquare size={20} />}
          active={activeSection === 'contact'}
          onClick={() => setActiveSection('contact')}
          tooltip="Contato"
        />
      </div>

      {/* social links */}
      <div className="mt-auto flex flex-col gap-6">
        <a
          href={dotnet_fullstack_curriculum}
          download
          aria-label="Baixar currículo"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <FileText size={20} />
        </a>
        <a
          href="https://github.com/gafanhotoalexandre"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visitar perfil no GitHub"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/alemartins-lima/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visitar perfil no LinkedIn"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:hello@alemartins.dev.br"
          aria-label="Enviar email"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <Mail size={20} />
        </a>
      </div>
    </aside>
  )
}
