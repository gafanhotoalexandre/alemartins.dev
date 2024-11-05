import { Hash } from 'lucide-react'

export const ContactHeader = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-white flex items-center gap-2">
        <Hash size={24} className="text-violet-500" />
        Vamos Conversar?
      </h2>
      <p className="text-slate-400">Estou disponível para novos projetos</p>
    </div>
  )
}
