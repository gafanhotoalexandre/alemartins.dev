import {
  Copy,
  FileText,
  Github,
  type LucideIcon,
  Linkedin,
  Mail,
  MoveUpRight,
} from 'lucide-react'
import { toast } from 'sonner'

import { dotnet_fullstack_curriculum } from '@/utils'
import {
  CONTACT_CONTENT,
  CONTACT_METHODS,
  type ContactMethodId,
  PROFILE,
} from '@/utils/constants'

const CONTACT_ICONS: Record<ContactMethodId, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  resume: FileText,
}

const CONTACT_LINKS: Record<ContactMethodId, string> = {
  email: `mailto:${PROFILE.email}?subject=${encodeURIComponent(PROFILE.emailSubject)}`,
  linkedin: PROFILE.linkedinUrl,
  github: PROFILE.githubUrl,
  resume: dotnet_fullstack_curriculum,
}

export const ContactMethods = () => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      toast.success('Email copiado para a área de transferência.')
    } catch {
      toast.error('Não consegui copiar o email automaticamente.')
    }
  }

  return (
    <section className="space-y-8">
      <div
        className="rounded-xl border p-4 sm:p-6 lg:p-8"
        style={{
          background: 'linear-gradient(180deg, rgba(84,65,219,0.07) 0%, rgba(30,34,38,0.98) 36%)',
          borderColor: 'var(--state-border-hover)',
        }}
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <p className="label-overline">{CONTACT_CONTENT.highlightEyebrow}</p>
            <h3 className="text-2xl font-semibold sm:text-3xl" style={{ color: 'var(--text-strong)' }}>
              {CONTACT_CONTENT.highlightTitle}
            </h3>
            <p className="max-w-3xl" style={{ color: 'var(--text-default)' }}>
              {CONTACT_CONTENT.highlightDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-sm">
              <span
                className="max-w-full break-all rounded-full border px-3 py-1 font-mono text-xs sm:break-normal"
                style={{
                  borderColor: 'var(--state-border)',
                  color: 'var(--text-default)',
                  backgroundColor: 'var(--surface-2)',
                }}
              >
                {CONTACT_CONTENT.quickLabel}: {PROFILE.email}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto xl:flex-shrink-0">
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(PROFILE.emailSubject)}`}
              className="btn-primary focus-brand inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <Mail size={18} />
              {CONTACT_CONTENT.primaryCta}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-ghost focus-brand inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <Copy size={18} />
              {CONTACT_CONTENT.secondaryCta}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {CONTACT_METHODS.map((method) => {
          const Icon = CONTACT_ICONS[method.id]

          return (
            <a
              key={method.title}
              href={CONTACT_LINKS[method.id]}
              target={method.download ? undefined : '_blank'}
              rel={method.download ? undefined : 'noopener noreferrer'}
              download={method.download}
              data-active="false"
              className="interactive-card focus-brand group rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <span
                    className="inline-flex rounded-lg p-3"
                    style={{
                      backgroundColor: 'rgba(84,65,219,0.10)',
                      color: 'var(--brand-soft)',
                    }}
                  >
                    <Icon size={20} />
                  </span>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                      {method.title}
                    </h4>
                    <p className="text-sm leading-6" style={{ color: 'var(--text-default)' }}>
                      {method.description}
                    </p>
                  </div>
                </div>

                <MoveUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--text-muted)' }}
                />
              </div>

              <div
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: 'var(--brand-soft)' }}
              >
                {method.cta}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}