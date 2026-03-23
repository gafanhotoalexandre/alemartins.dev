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
      <div className="rounded-2xl border border-violet-500/20 bg-slate-900/70 p-6 sm:p-8 shadow-xl shadow-violet-950/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-400">
              {CONTACT_CONTENT.highlightEyebrow}
            </p>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              {CONTACT_CONTENT.highlightTitle}
            </h3>
            <p className="max-w-2xl text-slate-400">
              {CONTACT_CONTENT.highlightDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(PROFILE.emailSubject)}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition-colors hover:bg-violet-500"
            >
              <Mail size={18} />
              {CONTACT_CONTENT.primaryCta}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-200 transition-colors hover:border-violet-500 hover:text-white"
            >
              <Copy size={18} />
              {CONTACT_CONTENT.secondaryCta}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CONTACT_METHODS.map((method) => {
          const Icon = CONTACT_ICONS[method.id]

          return (
            <a
              key={method.title}
              href={CONTACT_LINKS[method.id]}
              target={method.download ? undefined : '_blank'}
              rel={method.download ? undefined : 'noopener noreferrer'}
              download={method.download}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-violet-500/50 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <span className="inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-300">
                    <Icon size={20} />
                  </span>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-white">
                      {method.title}
                    </h4>
                    <p className="text-sm leading-6 text-slate-400">
                      {method.description}
                    </p>
                  </div>
                </div>

                <MoveUpRight
                  size={18}
                  className="text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300"
                />
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-300">
                {method.cta}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}