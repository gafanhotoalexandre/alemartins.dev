import { Hash } from 'lucide-react'

import { CONTACT_CONTENT } from '@/utils/constants'

export const ContactHeader = () => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-400">
        {CONTACT_CONTENT.eyebrow}
      </p>
      <h2 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Hash size={24} className="text-violet-500" />
        {CONTACT_CONTENT.title}
      </h2>
      <p className="max-w-3xl text-slate-400">
        {CONTACT_CONTENT.description}
      </p>
    </div>
  )
}
