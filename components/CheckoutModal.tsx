'use client';

import React, { useState } from 'react';
import { X, ChevronRight, Loader2 } from 'lucide-react';

export type PlanType = 'Essencial' | 'Especial' | 'Prioridade' | '';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanType;
}

const PLAN_DETAILS = {
  Essencial: { valor: '47', link: 'https://pay.kiwify.com.br/EqrDNbe' },
  Especial: { valor: '97', link: 'https://pay.kiwify.com.br/xJa8qOm' },
  Prioridade: { valor: '147', link: 'https://pay.kiwify.com.br/eVfgRbT' },
};

export default function CheckoutModal({ isOpen, onClose, initialPlan = '' }: CheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(initialPlan);

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
    dataEntrega: '',
    dedicacao: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return alert('Por favor, selecione um plano.');

    setIsSubmitting(true);
    try {
      const payload = {
        plano: selectedPlan,
        valor: PLAN_DETAILS[selectedPlan].valor,
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

      // Sucesso! Redirecionar para Kiwify
      window.location.href = PLAN_DETAILS[selectedPlan].link;

    } catch (error) {
      console.error(error);
      alert('Houve um problema ao enviar seu pedido. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0b1f] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/50 hover:text-white transition"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">Quase lá!</h2>
          <p className="mt-2 text-white/60">
            Para compormos sua canção perfeita, precisamos de alguns detalhes especiais sobre a história de vocês.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!initialPlan && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Escolha o Pacote</label>
              <select
                required
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value as PlanType)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-fuchsia-400 focus:outline-none"
              >
                <option value="" disabled>Selecione um plano...</option>
                <option value="Essencial">Essencial - R$ 47</option>
                <option value="Especial">Especial - R$ 97</option>
                <option value="Prioridade">Prioridade - R$ 147</option>
              </select>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Seu Nome</label>
              <input required name="nomeCliente" value={formData.nomeCliente} onChange={handleChange} type="text" placeholder="Como podemos te chamar?" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">E-mail</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="seu@email.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
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
              <label className="block text-sm font-medium text-white/80">Data de Entrega Desejada</label>
              <input required name="dataEntrega" value={formData.dataEntrega} onChange={handleChange} type="date" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Qual sentimento principal a música deve passar?</label>
            <input required name="sentimento" value={formData.sentimento} onChange={handleChange} type="text" placeholder="Ex: Emocionante, alegre, nostálgico..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Conte-nos sobre a história (Histórias que devemos mencionar)</label>
            <textarea required name="historias" value={formData.historias} onChange={handleChange} rows={3} placeholder="De onde se conhecem, melhores momentos juntos..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Detalhes Importantes (Nomes de pets, lugares, apelidos)</label>
            <textarea required name="detalhesImportantes" value={formData.detalhesImportantes} onChange={handleChange} rows={2} placeholder="Seja específico para deixarmos mais especial..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Dedicatória (Mensagem extra se desejar apresentar junto)</label>
            <textarea name="dedicacao" value={formData.dedicacao} onChange={handleChange} rows={2} placeholder="Algo a dizer antes do play..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-fuchsia-400 focus:outline-none" />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-base font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Avançar para Pagamento'}
              {!isSubmitting && <ChevronRight className="h-5 w-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
