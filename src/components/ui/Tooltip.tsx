import { ReactNode, useEffect, useRef, useState } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => setVisible(true), 100)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

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
        <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
          <div className="relative">
            {/* Seta para cima */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            {/* Conteúdo do tooltip */}
            <span className="block bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap animate-fade-in">
              {content}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
