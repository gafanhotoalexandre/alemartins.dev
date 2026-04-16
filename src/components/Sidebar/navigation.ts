import {
  Briefcase,
  Braces,
  Code,
  type LucideIcon,
  MessageSquare,
  User,
} from 'lucide-react'

export const sidebarSections: Array<{
  id: string
  label: string
  icon: LucideIcon
}> = [
  { id: 'about', label: 'Sobre', icon: User },
  { id: 'projects', label: 'Projetos', icon: Code },
  { id: 'experience', label: 'Experiência', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Braces },
  { id: 'contact', label: 'Contato', icon: MessageSquare },
]