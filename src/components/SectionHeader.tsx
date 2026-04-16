import { type ReactNode } from 'react'

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  description: string
}

export const SectionHeader = ({ icon, title, description }: SectionHeaderProps) => {
  return (
    <div className="section-header">
      <h2>
        <span className="mr-2 inline-flex text-[var(--brand-soft)]">{icon}</span>
        {title}
      </h2>
      <p>{description}</p>
    </div>
  )
}
