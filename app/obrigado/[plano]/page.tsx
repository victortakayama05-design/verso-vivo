import { notFound } from 'next/navigation';
import ThankYouForm from '../../../components/ThankYouForm';

export default function ObrigadoPage({ params }: { params: { plano: string } }) {
  const planoRoute = params.plano?.toLowerCase();
  
  if (!['essencial', 'especial', 'prioridade'].includes(planoRoute)) {
    notFound(); 
  }

  const planCapitalized = (planoRoute.charAt(0).toUpperCase() + planoRoute.slice(1)) as 'Essencial' | 'Especial' | 'Prioridade';

  return (
    <div className="min-h-screen bg-[#060510] relative flex items-center justify-center p-4 py-12 sm:p-8">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0a081b]/80 backdrop-blur-2xl shadow-2xl p-6 sm:p-10 z-10">
        <ThankYouForm plano={planCapitalized} />
      </div>
    </div>
  );
}
