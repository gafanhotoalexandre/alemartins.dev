import { ReactNode } from 'react'
import { Tooltip } from '../ui/Tooltip'

interface SidebarIconProps {
  icon: ReactNode
  active?: boolean
  onClick?: () => void
  tooltip?: string
}

export const SidebarIcon = ({
  icon,
  active,
  onClick,
  tooltip,
}: SidebarIconProps) => {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        aria-label={typeof tooltip === 'string' ? tooltip : 'Navegar'}
        className={`transition-colors ${
          active ? 'text-violet-500' : 'text-slate-500 hover:text-violet-400'
        }`}
      >
        {icon}
      </button>
    </Tooltip>
  )
}
