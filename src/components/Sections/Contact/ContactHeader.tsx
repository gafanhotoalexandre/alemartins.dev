import { Hash } from 'lucide-react'

export const ContactHeader = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold text-white flex items-center gap-2">
        <Hash size={24} className="text-violet-500" />
        Vamos Conversar?
      </h2>
      <p className="text-slate-400 max-w-2xl">
        Se você quer falar sobre uma oportunidade, projeto freelance ou troca
        técnica, estes são os canais que eu acompanho com frequência.
      </p>
    </div>
  )
}
