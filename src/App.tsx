import { useState } from 'react'
import { Toaster } from 'sonner'

import { Sidebar } from './components/Sidebar'
import { About } from './components/Sections/About'
import { Projects } from './components/Sections/Projects'
import { Skills } from './components/Sections/Skills'
import { Contact } from './components/Sections/Contact'

export const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [activeSection, setActiveSection] = useState('about')
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
      />

      <main className="ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          {activeSection === 'about' ? (
            <About setActiveSection={setActiveSection} />
          ) : (
            <section className="pt-14">
              {activeSection === 'projects' && (
                <Projects
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                />
              )}

              {activeSection === 'skills' && <Skills />}

              {activeSection === 'contact' && <Contact />}
            </section>
          )}
        </div>
      </main>

      <Toaster richColors />
    </div>
  )
}
