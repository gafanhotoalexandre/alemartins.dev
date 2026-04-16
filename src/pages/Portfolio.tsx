import { useState } from 'react'
import { Toaster } from 'sonner'

import { Sidebar } from '../components/Sidebar'
import { sidebarSections } from '../components/Sidebar/navigation'
import { About } from '../components/Sections/About'
import { Projects } from '../components/Sections/Projects'
import { Skills } from '../components/Sections/Skills'
import { Contact } from '../components/Sections/Contact'
import { Experience } from '../components/Sections/Experience'

export const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [activeSection, setActiveSection] = useState('about')

  const showSectionContent = activeSection !== 'about'

  return (
    <div className="min-h-screen text-[var(--text-default)]" style={{ backgroundColor: 'var(--brand-canvas)' }}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="px-4 pb-28 pt-4 sm:px-6 sm:pb-32 sm:pt-6 lg:ml-20 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          {!showSectionContent ? (
            <About setActiveSection={setActiveSection} />
          ) : (
            <section className="pt-8 sm:pt-10 lg:pt-14">
              {activeSection === 'projects' && (
                <Projects
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                />
              )}

              {activeSection === 'skills' && <Skills />}

              {activeSection === 'experience' && <Experience />}

              {activeSection === 'contact' && <Contact />}
            </section>
          )}
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Navegação mobile">
        {sidebarSections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSection(id)}
            aria-label={label}
            aria-current={activeSection === id ? 'page' : undefined}
            data-active={activeSection === id ? 'true' : 'false'}
            className="mobile-nav-btn focus-brand"
          >
            <Icon size={18} />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </nav>

      <Toaster richColors />
    </div>
  )
}
