import { type ReactNode, useEffect, useRef, useState } from 'react'

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
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {visible && (
        <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
          <div className="relative">
            {/* Seta para cima */}
            <div
              className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderLeft: '1px solid var(--state-border)',
                borderTop: '1px solid var(--state-border)',
              }}
            />
            {/* Conteúdo do tooltip */}
            <span
              className="block whitespace-nowrap rounded-lg border px-3 py-2 text-xs shadow-xl animate-fade-in"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderColor: 'var(--state-border)',
                color: 'var(--text-strong)',
              }}
            >
              {content}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
