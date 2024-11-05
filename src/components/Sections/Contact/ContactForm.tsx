import { FormEvent, useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validar se as variáveis de ambiente estão definidas
    if (
      !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ) {
      console.error('Variáveis de ambiente do EmailJS não configuradas')
      // alert('Erro na configuração do formulário de contato')
      toast.error('Erro na configuração do formulário de contato')
      setIsSubmitting(false)
      return
    }

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      // alert('Mensagem enviada com sucesso!')
      toast.success('Mensagem enviada com sucesso!', {
        description: new Date().toLocaleDateString('pt-br', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
      })

      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-white font-medium">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white placeholder-slate-500"
          placeholder="Seu nome"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white placeholder-slate-500"
          placeholder="seu@email.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white font-medium">Mensagem</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white placeholder-slate-500 h-32"
          placeholder="Sua mensagem"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex gap-2 items-center justify-center animate-pulse">
            <LoaderCircle size={20} className="animate-spin" /> Enviando...
          </span>
        ) : (
          'Enviar Mensagem'
        )}
      </button>
    </form>
  )
}
