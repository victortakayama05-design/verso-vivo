'use client';

import React, { useState, useEffect } from 'react';
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
  const [checkoutUrl, setCheckoutUrl] = useState('');

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

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialPlan);
      setCheckoutUrl('');
    }
  }, [isOpen, initialPlan]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return alert('Por favor, selecione um plano.');

    setIsSubmitting(true);
    
    // Abre a janela de popup em branco ANTES do await para não ser bloqueado pelo navegador
    let popup: Window | null = null;
    if (window.innerWidth > 768) {
      popup = window.open('about:blank', 'KiwifyCheckout', 'width=500,height=800,left=200,top=100');
      if (popup) {
        popup.document.write('<body style="background:#0d0b1f;color:white;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">Aguarde, conectando ao ambiente seguro...</body>');
      }
    }

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
        if (popup) popup.close();
        throw new Error('Erro ao salvar os dados.');
      }

      // Sucesso!
      const queryParams = new URLSearchParams({
        name: formData.nomeCliente,
        email: formData.email,
        phone: formData.whatsapp,
      }).toString();
      
      const finalUrl = `${PLAN_DETAILS[selectedPlan].link}?${queryParams}`;
      setCheckoutUrl(finalUrl);
      setIsSubmitting(false);

      if (popup) {
        popup.location.href = finalUrl;
      } else {
        // Fallback para mobile ou se pop-up for bloqueado
        window.location.href = finalUrl;
      }

    } catch (error) {
      console.error(error);
      alert('Houve um problema ao enviar seu pedido. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0b1f] shadow-2xl p-6 sm:p-8 ${checkoutUrl ? 'max-w-4xl h-[90vh]' : 'max-w-2xl max-h-[90vh]'}`}>
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/50 hover:text-white transition z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {checkoutUrl ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Tudo pronto!</h2>
            <p className="text-white/70 mb-8 max-w-sm">
              O ambiente seguro da Kiwify foi aberto para você concluir seu pagamento. Nenhuma informação de cartão é salva conosco.
            </p>
            <button
              onClick={() => window.open(checkoutUrl, 'KiwifyCheckout', 'width=500,height=800,left=200,top=100')}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white font-medium transition hover:bg-white/10"
            >
              Reabrir Janela de Pagamento
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
