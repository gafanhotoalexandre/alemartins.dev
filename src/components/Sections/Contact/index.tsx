import { ContactHeader } from './ContactHeader'
import { ContactForm } from './ContactForm'
import { useEffect } from 'react'
// import emailjs from '@emailjs/browser'

export const Contact = () => {
  useEffect(() => {
    // Inicializa o EmailJS com sua Public Key
    // emailjs.init('YOUR_PUBLIC_KEY')
  }, [])

  return (
    <div className="max-w-2xl space-y-12">
      <ContactHeader />
      <ContactForm />
    </div>
  )
}
