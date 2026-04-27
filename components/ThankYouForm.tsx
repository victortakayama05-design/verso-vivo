'use client';

import React, { useState } from 'react';
import { Loader2, Music, CheckCircle2, ChevronRight } from 'lucide-react';

type PlanType = 'Essencial' | 'Especial' | 'Prioridade';

interface ThankYouFormProps {
  plano: PlanType;
}

const PLAN_DETAILS = {
  Essencial: { valor: '47', prazo: '5 dias' },
  Especial: { valor: '97', prazo: '24 horas' },
  Prioridade: { valor: '147', prazo: '4 horas' },
};

export default function ThankYouForm({ plano }: ThankYouFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nomeCliente: '',
    email: '',
    whatsapp: '',
    nomeHomenageado: '',
    relacao: '',
    ocasiao: '',
    estilo: '',
    sentimento: '',
    historias: '',
    detalhesImportantes: '',
    dedicacao: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        plano,
        valor: PLAN_DETAILS[plano].valor,
        origem: 'site',
        ...formData
      };

      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Erro ao salvar os dados.');
      }

      setIsSuccess(true);
      // Rola pro final para o usuário ler a tela de sucesso
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      alert('Houve um problema ao enviar seu pedido. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Tudo certo com sua história!</h2>
        <p className="text-white/70 max-w-md mx-auto mb-8 text-lg">
          Recebemos os detalhes da sua história! Agora a magia acontece e te entregaremos no seu WhatsApp dentro do prazo de <strong>{PLAN_DETAILS[plano].prazo}</strong>.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-fuchsia-300">
          <Music className="h-4 w-4" />
          Aguarde nossa mensagem!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-white">Pronto, sua compra foi aprovada!</h2>
        <p className="mt-3 text-lg text-white/60">
          Você adquiriu o pacote <strong className="text-fuchsia-300">{plano}</strong>. 
          Agora é a sua vez de nos contar a história na íntegra para criarmos algo memorável.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Seu Nome</label>
            <input required name="nomeCliente" value={formData.nomeCliente} onChange={handleChange} type="text" placeholder="Como podemos te chamar?" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">E-mail</label>
            <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="O mesmo usado na compra" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">WhatsApp</label>
            <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" placeholder="(11) 99999-9999" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Para quem é a música? (Homenageado)</label>
            <input required name="nomeHomenageado" value={formData.nomeHomenageado} onChange={handleChange} type="text" placeholder="Nome de quem vai receber" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Qual sua relação com essa pessoa?</label>
            <input required name="relacao" value={formData.relacao} onChange={handleChange} type="text" placeholder="Ex: Namorado(a), Mãe, Amigo(a)" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Qual é a ocasião?</label>
            <input required name="ocasiao" value={formData.ocasiao} onChange={handleChange} type="text" placeholder="Ex: Aniversário de Casamento" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Qual o estilo musical desejado?</label>
            <input required name="estilo" value={formData.estilo} onChange={handleChange} type="text" placeholder="Ex: Acústico, MPB, Pop..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Qual sentimento principal a música deve passar?</label>
            <input required name="sentimento" value={formData.sentimento} onChange={handleChange} type="text" placeholder="Ex: Emocionante, alegre, nostálgico..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Conte-nos sobre a história (Histórias que devemos mencionar)</label>
          <textarea required name="historias" value={formData.historias} onChange={handleChange} rows={4} placeholder="De onde se conhecem, melhores momentos juntos, como é a personalidade da pessoa..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Detalhes Importantes (Nomes de pets, lugares, apelidos)</label>
          <textarea required name="detalhesImportantes" value={formData.detalhesImportantes} onChange={handleChange} rows={2} placeholder="Seja específico para deixarmos mais especial e marcante na letra..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Dedicatória especial (Mensagem falada no início - opcional)</label>
          <textarea name="dedicacao" value={formData.dedicacao} onChange={handleChange} rows={2} placeholder="Algo a dizer antes da música tocar..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-white/50 text-sm mb-4">Ao clicar no botão abaixo, sua história será enviada para nossa equipe musical. Lembre-se, o seu prazo premium de {PLAN_DETAILS[plano].prazo} de entrega começa a contar agora.</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-base font-medium text-white transition hover:opacity-90 hover:scale-[1.01] disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Finalizar sua homenagem'}
            {!isSubmitting && <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
