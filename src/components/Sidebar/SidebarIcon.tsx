import { ReactNode } from 'react'

interface SidebarIconProps {
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

export const SidebarIcon = ({ icon, active, onClick }: SidebarIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`transition-colors ${
        active ? 'text-violet-500' : 'text-slate-500 hover:text-violet-400'
      }`}
    >
      {icon}
    </button>
  )
}
