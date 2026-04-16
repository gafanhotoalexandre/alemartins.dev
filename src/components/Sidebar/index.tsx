import {
  FileText,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react'
import { SidebarIcon } from './SidebarIcon'
import { sidebarSections } from './navigation'

import { dotnet_fullstack_curriculum, favicon } from '@/utils'
import { PROFILE } from '@/utils/constants'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <aside
      className="fixed top-0 left-0 z-40 hidden h-full w-20 flex-col items-center gap-8 py-8 lg:flex"
      style={{
        backgroundColor: 'rgba(25, 29, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      {/* Logo / favicon */}
      <div
        className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #5441DB 0%, #9F61E6 100%)',
          boxShadow: '0 0 18px 2px rgba(84,65,219,0.35)',
        }}
      >
        <img src={favicon} alt="Logo Alexandre Martins" className="h-10 w-10" />
      </div>

      {/* Section navigation */}
      <nav aria-label="Navegação principal" className="flex flex-col gap-2">
        {sidebarSections.map(({ id, label, icon: Icon }) => (
          <SidebarIcon
            key={id}
            icon={<Icon size={20} />}
            active={activeSection === id}
            onClick={() => setActiveSection(id)}
            tooltip={label}
          />
        ))}
      </nav>

      {/* External links */}
      <div className="mt-auto flex flex-col items-center gap-5">
        <a
          href={dotnet_fullstack_curriculum}
          download
          aria-label="Baixar currículo"
          className="icon-link focus-brand h-11 w-11"
        >
          <FileText size={20} />
        </a>
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil no GitHub"
          className="icon-link focus-brand h-11 w-11"
        >
          <Github size={20} />
        </a>
        <a
          href={PROFILE.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil no LinkedIn"
          className="icon-link focus-brand h-11 w-11"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          aria-label="Enviar email"
          className="icon-link focus-brand h-11 w-11"
        >
          <Mail size={20} />
        </a>
      </div>
    </aside>
  )
}
