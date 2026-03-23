import { ContactHeader } from './ContactHeader'
import { ContactMethods } from './ContactMethods'

export const Contact = () => {
  return (
    <div className="max-w-4xl space-y-12">
      <ContactHeader />
      <ContactMethods />
    </div>
  )
}
