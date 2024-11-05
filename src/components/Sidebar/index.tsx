import {
  Terminal,
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

import { cv } from '@/utils'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  showTooltip: boolean
  setShowTooltip: (show: boolean) => void
}

export const Sidebar = ({
  activeSection,
  setActiveSection,
  showTooltip,
  setShowTooltip,
}: SidebarProps) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-slate-900/50 backdrop-blur-sm border-r border-slate-800/50 flex flex-col items-center py-8 gap-8">
      <div
        className="relative w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center cursor-pointer group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Terminal className="text-white" size={24} />
        {showTooltip && (
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">
            alemartins.dev
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <SidebarIcon
          icon={<User size={20} />}
          active={activeSection === 'about'}
          onClick={() => setActiveSection('about')}
        />
        <SidebarIcon
          icon={<Code size={20} />}
          active={activeSection === 'projects'}
          onClick={() => setActiveSection('projects')}
        />
        <SidebarIcon
          icon={<Briefcase size={20} />}
          active={activeSection === 'skills'}
          onClick={() => setActiveSection('skills')}
        />
        <SidebarIcon
          icon={<MessageSquare size={20} />}
          active={activeSection === 'contact'}
          onClick={() => setActiveSection('contact')}
        />
      </div>

      {/* social links */}
      <div className="mt-auto flex flex-col gap-6">
        <a
          href={cv}
          download
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <FileText size={20} />
        </a>
        <a
          href="https://github.com/gafanhotoalexandre"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/alemartins-lima/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:hello@alemartins.dev.br"
          className="text-slate-500 hover:text-violet-400 transition-colors"
        >
          <Mail size={20} />
        </a>
      </div>
    </aside>
  )
}
