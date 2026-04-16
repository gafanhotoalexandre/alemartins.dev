import { type ReactNode } from 'react'
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
        type="button"
        onClick={onClick}
        aria-label={typeof tooltip === 'string' ? tooltip : 'Navegar'}
        aria-current={active ? 'page' : undefined}
        className="sidebar-nav-btn focus-brand"
        data-active={active ? 'true' : 'false'}
      >
        {icon}
      </button>
    </Tooltip>
  )
}
