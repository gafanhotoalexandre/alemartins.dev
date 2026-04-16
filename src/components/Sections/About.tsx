import { PROFILE } from '@/utils/constants'

interface AboutProps {
  setActiveSection: (section: string) => void
}

export const About = ({ setActiveSection }: AboutProps) => {
  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center py-4 sm:py-6 lg:min-h-[calc(100vh-4rem)] lg:py-8">

      {/* Decorative dot accent behind the avatar area — only in the right gutter */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.07] md:block"
        style={{
          backgroundImage: 'radial-gradient(circle, #9F61E6 0.7px, transparent 0.7px)',
          backgroundSize: '18px 18px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 80% 40%, black 30%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 80% 40%, black 30%, transparent 80%)',
        }}
      />

      <div className="grid w-full items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">

        {/* ── Content column ── */}
        <div className="space-y-7 text-center lg:text-left">
          <div className="space-y-4">
            {/* Overline */}
            <p className="label-overline">Desenvolvedor Full Stack</p>

            {/* Name / identity */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--text-strong)' }}>
              <span className="block">Alexandre</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #5441DB 0%, #9F61E6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Martins
              </span>
            </h1>

            {/* Short bio */}
            <p className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0 lg:text-xl" style={{ color: 'var(--text-default)' }}>
              Construo sistemas escaláveis com React, .NET e arquitetura limpa.
              Foco em código que dura, não só em código que funciona.
            </p>

            {/* Tech tagline */}
            <p className="font-mono text-[13px] sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              C# · .NET · React · DDD · Clean Architecture
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              type="button"
              onClick={() => setActiveSection('projects')}
              className="btn-primary focus-brand w-full sm:w-auto"
            >
              Ver projetos
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('contact')}
              className="btn-ghost focus-brand w-full sm:w-auto"
            >
              Falar comigo
            </button>
          </div>
        </div>

        {/* ── Avatar column ── */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-[26rem] lg:w-[26rem]">

            {/* Glow blob behind avatar */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ background: 'linear-gradient(135deg, #5441DB, #9F61E6)' }}
            />

            {/* Outer ring — brand gradient */}
            <div
              className="relative h-full rounded-full p-[3px]"
              style={{ background: 'linear-gradient(135deg, #5441DB 0%, #9F61E6 100%)' }}
            >
              {/* Inner gap ring */}
              <div className="h-full rounded-full p-[3px]" style={{ backgroundColor: 'var(--brand-canvas)' }}>
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={PROFILE.avatarUrl}
                  alt="Alexandre Martins — Desenvolvedor Full Stack"
                />
              </div>
            </div>

            {/* Decorative corner geometry, subtle */}
            <div
              className="absolute -right-3 -top-3 hidden h-16 w-16 rotate-12 rounded-lg border opacity-20 sm:block"
              style={{ borderColor: 'var(--brand-primary)' }}
            />
            <div
              className="absolute -bottom-2 -left-2 hidden h-10 w-10 -rotate-6 rounded-lg border opacity-15 sm:block"
              style={{ borderColor: 'var(--brand-soft)' }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
