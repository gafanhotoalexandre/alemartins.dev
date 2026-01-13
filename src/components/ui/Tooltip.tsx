import { ReactNode, useState } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  let timeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    timeout = setTimeout(() => setVisible(true), 100)
  }
  const handleMouseLeave = () => {
    clearTimeout(timeout)
    setVisible(false)
  }

  return (
    <div
      className="relative group flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-10">
          <span className="bg-slate-800 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in">
            {content}
          </span>
        </div>
      )}
    </div>
  )
}
