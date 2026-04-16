import { MessageSquare } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'
import { CONTACT_CONTENT } from '@/utils/constants'

export const ContactHeader = () => {
  return (
    <SectionHeader
      icon={<MessageSquare size={22} />}
      title={CONTACT_CONTENT.title}
      description={CONTACT_CONTENT.description}
    />
  )
}
