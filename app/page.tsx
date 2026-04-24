'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Music4,
  Sparkles,
  Clock3,
  Gift,
  MessageCircleHeart,
  Play,
  Star,
  ShieldCheck,
  Wand2,
  Mic2,
  ChevronRight,
  Check,
  Quote,
} from 'lucide-react';

type SectionItem = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

type Testimonial = {
  name: string;
  text: string;
};

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  cta: string;
  link: string;
  featured?: boolean;
};

type Occasion = {
  title: string;
  text: string;
};

type AudioSample = {
  id: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  audioUrl: string;
  coverLabel: string;
};

const audioSamples: AudioSample[] = [
  {
    id: 'demo-principal',
    title: 'Quando sentimentos ganham voz',
    subtitle: 'Prévia principal da experiência',
    durationLabel: '0:30',
    audioUrl: 'https://seu-link-de-audio.com/demo-principal.mp3',
    coverLabel: 'Canção personalizada',
  },
  {
    id: 'amor',
    title: 'História de amor',
    subtitle: 'Exemplo para namoro ou casamento',
    durationLabel: '0:34',
    audioUrl: '/audios/historia-de-amor.mp3',
    coverLabel: 'Amostra romântica',
  },
  {
    id: 'familia',
    title: 'Homenagem em família',
    subtitle: 'Exemplo para mãe, pai ou avós',
    durationLabel: '0:18',
    audioUrl: 'https://seu-link-de-audio.com/amostra-familia.mp3',
    coverLabel: 'Amostra afetiva',
  },
  {
    id: 'memoria',
    title: 'Memória para guardar',
    subtitle: 'Exemplo delicado e nostálgico',
    durationLabel: '0:22',
    audioUrl: 'https://seu-link-de-audio.com/amostra-memoria.mp3',
    coverLabel: 'Amostra sensível',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const sections: SectionItem[] = [
  {
    icon: <MessageCircleHeart className="h-5 w-5" />,
    title: 'Você compartilha a sua história',
    text: 'Conte os detalhes, as lembranças e o sentimento que tornam essa homenagem única.',
  },
  {
    icon: <Wand2 className="h-5 w-5" />,
    title: 'Nós transformamos isso em canção',
    text: 'Criamos uma música personalizada com sensibilidade, beleza e significado.',
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: 'Você entrega um presente inesquecível',
    text: 'Receba sua canção pronta para emocionar alguém de forma única e verdadeira.',
  },
];

const occasions: Occasion[] = [
  {
    title: 'Pedido de namoro ou casamento',
    text: 'Uma forma única de transformar sentimento em lembrança.',
  },
  {
    title: 'Aniversário de quem você ama',
    text: 'Um presente íntimo que foge do comum.',
  },
  {
    title: 'Homenagem para mãe, pai ou avós',
    text: 'Palavras que viram música e ficam para sempre.',
  },
  {
    title: 'Reconciliação com delicadeza',
    text: 'Quando o que você sente merece ser dito com cuidado.',
  },
  {
    title: 'Celebração de uma história a dois',
    text: 'Uma lembrança feita para marcar o que foi vivido juntos.',
  },
  {
    title: 'Memória afetiva para sempre guardar',
    text: 'Algo que pode ser ouvido, lembrado e guardado com carinho.',
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Marina e Caio',
    text: 'Não parecia um presente. Parecia um pedaço da nossa história transformado em arte. Foi elegante, sensível e verdadeiro.',
  },
  {
    name: 'Fernanda',
    text: 'Eu queria emocionar meu pai sem cair no óbvio. A música chegou no tom exato. Choramos os dois.',
  },
  {
    name: 'Rafael',
    text: 'O que mais me surpreendeu foi a sensação de cuidado. Não é só personalização. É algo feito para tocar de verdade.',
  },
];

const plans: Plan[] = [
  {
    name: 'Essencial',
    subtitle: 'Para transformar sua história em um presente especial',
    price: 'R$ 47',
    features: ['Música personalizada', 'Entrega digital', 'Prazo padrão (5 dias)', 'Criação personalizada'],
    cta: 'Escolher Essencial',
    link: 'https://pay.kiwify.com.br/EqrDNbe',
  },
  {
    name: 'Especial',
    subtitle: 'O mais escolhido para presentear com mais cuidado',
    price: 'R$ 97',
    features: ['Tudo do Essencial', 'Atendimento prioritário (24 horas)', 'Capa exclusiva', 'Mensagem de dedicatória'],
    cta: 'Escolher Especial',
    link: 'https://pay.kiwify.com.br/xJa8qOm',
    featured: true,
  },
  {
    name: 'Prioridade',
    subtitle: 'Para momentos importantes que pedem mais agilidade',
    price: 'R$ 147',
    features: ['Tudo do Especial', 'Entrega expressa (4 horas)', 'Experiência premium', 'Suporte prioritário'],
    cta: 'Escolher Prioridade',
    link: 'https://pay.kiwify.com.br/eVfgRbT',
  },
];

function GradientOrb({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-40 ${className}`}
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(244,114,182,.9), rgba(168,85,247,.5) 45%, rgba(59,130,246,.25) 70%, transparent 72%)',
      }}
    />
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">{text}</p> : null}
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
}

function EqualizerBars({ isActive }: { isActive: boolean }) {
  const bars = [32, 62, 48, 76, 34, 66, 26, 58, 41, 73, 45, 28];

  return (
    <div className="mt-7 flex items-end gap-[1.5%]">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          initial={{ scaleY: 0.75, opacity: 0.5 }}
          animate={
            isActive
              ? { scaleY: [0.75, 1, 0.82], opacity: [0.5, 1, 0.6] }
              : { scaleY: 0.85, opacity: 0.7 }
          }
          transition={
            isActive
              ? {
                  duration: 2.2,
                  repeat: Infinity,
                  delay: index * 0.08,
                  ease: 'easeInOut',
                }
              : { duration: 0.35 }
          }
          className="inline-block w-[6.8%] origin-bottom rounded-full bg-gradient-to-t from-fuchsia-500 via-violet-400 to-sky-300"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

function PauseIcon() {
  return (
    <div className="flex items-center gap-2">
      <span className="block h-8 w-2 rounded-full bg-white/90" />
      <span className="block h-8 w-2 rounded-full bg-white/90" />
    </div>
  );
}

function AudioExperienceCard() {
  const samples = useMemo(() => audioSamples, []);
  const [activeId, setActiveId] = useState(samples[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSample = useMemo(
    () => samples.find((sample) => sample.id === activeId) ?? samples[0],
    [activeId, samples],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = activeSample.audioUrl;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [activeSample]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Number(value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const progressMax = duration > 0 ? duration : 30;
  const displayedDuration = duration > 0 ? formatTime(duration) : activeSample.durationLabel;

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <audio ref={audioRef} preload="metadata" />
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-sky-400/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.03))] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <div className="rounded-[1.6rem] border border-white/10 bg-[#0d0b1f] p-5">
          <div className="mb-4 flex items-center justify-between gap-4 text-white/70">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/45">Uma nova forma de presentear</div>
              <div className="mt-1 text-lg font-medium text-white">Uma canção criada a partir da sua história</div>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
              Feita sob medida
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(236,72,153,.18),transparent_35%),linear-gradient(135deg,#17122b,#0c0b19)] p-6">
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)] animate-pulse" />
            <button
              type="button"
              onClick={togglePlay}
              className="mx-auto flex h-44 w-44 items-center justify-center rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.03))] shadow-[0_0_100px_rgba(217,70,239,.18)] transition hover:scale-[1.01]"
              aria-label={isPlaying ? 'Pausar prévia' : 'Tocar prévia'}
            >
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-black/20">
                <div
                  className={`absolute inset-0 rounded-full border border-fuchsia-300/20 ${isPlaying ? 'animate-ping' : ''}`}
                />
                {isPlaying ? (
                  <PauseIcon />
                ) : (
                  <Play className="h-10 w-10 translate-x-0.5 text-white/90" />
                )}
              </div>
            </button>

            <div className="mt-6 text-center">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">{activeSample.coverLabel}</div>
              <div className="mt-2 text-2xl font-semibold">{activeSample.title}</div>
              <div className="mt-2 text-sm text-white/60">{activeSample.subtitle}</div>
            </div>

            <EqualizerBars isActive={isPlaying} />

            <div className="mt-6">
              <input
                type="range"
                min={0}
                max={progressMax}
                step={0.1}
                value={Math.min(currentTime, progressMax)}
                onChange={(e) => handleSeek(e.target.value)}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-fuchsia-400"
                aria-label="Progresso do áudio"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                <span>{formatTime(currentTime)}</span>
                <span>{displayedDuration}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              ['Feita com', 'emoção'],
              ['Com estética', 'refinada'],
              ['Formato', 'digital'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-white/40">{label}</div>
                <div className="mt-1 text-sm font-medium text-white/85">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {samples.map((sample) => {
              const isActiveSample = sample.id === activeSample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setActiveId(sample.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isActiveSample
                      ? 'border-fuchsia-400/30 bg-fuchsia-400/10'
                      : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="text-sm font-medium text-white">{sample.title}</div>
                  <div className="mt-1 text-xs text-white/55">{sample.subtitle}</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.18em] text-white/40">{sample.durationLabel}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#060510] text-white">
      <div className="relative overflow-hidden">
        <GradientOrb className="-left-24 top-0 h-80 w-80" />
        <GradientOrb className="right-[-5rem] top-32 h-[28rem] w-[28rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.08]" />

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-xl">
              <Music4 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide">VersoVivo</div>
              <div className="text-xs text-white/50">Canções personalizadas feitas a partir da sua história</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#como-funciona" className="transition hover:text-white">
              Como funciona
            </a>
            <a href="#diferenciais" className="transition hover:text-white">
              Diferenciais
            </a>
            <a href="#planos" className="transition hover:text-white">
              Planos
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <a
            href="#planos"
            className="rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-medium text-[#0b0920] transition hover:scale-[1.02]"
          >
            Criar minha música
          </a>
        </header>

        <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-8 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-28 lg:pt-14">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100"
            >
              <Heart className="h-4 w-4" />
              Um presente único para emocionar de verdade
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Sua história merece mais do que um presente comum.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-xl text-lg leading-8 text-white/72"
            >
              Criamos canções personalizadas a partir da sua história para transformar sentimentos reais em um presente delicado, marcante e impossível de esquecer.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-medium text-[#0a081b] transition hover:scale-[1.02]"
              >
                Criar minha música agora
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-4 text-base font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/10"
              >
                <Play className="h-4 w-4" />
                Descobrir como funciona
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['+1.200', 'canções criadas com significado'],
                ['Até 5 dias', 'entrega no prazo certo'],
                ['Feita para você', 'com base na sua história'],
              ].map(([value, label]) => (
                <div key={value} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="text-2xl font-semibold">{value}</div>
                  <div className="mt-1 text-sm text-white/60">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <AudioExperienceCard />
        </section>
      </div>

      <section className="border-y border-white/8 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-6 text-sm text-white/60 sm:grid-cols-4 lg:px-8">
          {[
            [<ShieldCheck className="h-4 w-4" />, 'Compra segura'],
            [<Clock3 className="h-4 w-4" />, 'Entrega com prazo definido'],
            [<Sparkles className="h-4 w-4" />, 'Canção personalizada'],
            [<Star className="h-4 w-4" />, 'Experiência memorável'],
          ].map(([icon, text]) => (
            <div
              key={String(text)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle
          eyebrow="Como funciona"
          title="Simples para você. Inesquecível para quem recebe."
          text="Um processo leve e claro para que você foque apenas no que realmente importa: emocionar alguém especial."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {sections.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              custom={i}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:bg-white/[0.055]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-fuchsia-200">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-white/65">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="amostras" className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
              <Play className="h-3.5 w-3.5" />
              Por que essa experiência emociona tanto
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight">
              Não é uma música pronta adaptada. É uma canção criada a partir da sua história.
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
              Cada canção nasce das lembranças, dos sentimentos e dos detalhes que tornam a sua história única. Por isso o resultado não parece genérico: ele faz sentido para quem recebe.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Criada com base na sua história real',
                'Com sensibilidade, beleza e naturalidade',
                'Feita para transmitir exatamente o que você sente',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="mt-0.5 rounded-full bg-emerald-400/15 p-1 text-emerald-300">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="text-white/75">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {occasions.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.025))] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.07] text-fuchsia-200">
                  {i % 2 === 0 ? <Heart className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
                <h4 className="text-lg font-medium leading-7">{item.title}</h4>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                <p className="mt-4 text-sm leading-6 text-white/58">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="diferenciais" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle
          eyebrow="Diferenciais"
          title="O que torna a VersoVivo tão especial"
          text="Cada detalhe foi pensado para transformar sentimento em uma experiência bonita, confiável e memorável."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: <Music4 className="h-5 w-5" />,
              title: 'Feita com significado',
              text: 'Cada canção nasce da sua história para que o resultado soe verdadeiro e especial.',
            },
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              title: 'Clareza em cada etapa',
              text: 'Você entende como funciona, o que recebe e em quanto tempo sua música será entregue.',
            },
            {
              icon: <Sparkles className="h-5 w-5" />,
              title: 'Beleza em cada detalhe',
              text: 'Do visual à entrega, tudo foi pensado para transmitir sensibilidade e valor.',
            },
            {
              icon: <Clock3 className="h-5 w-5" />,
              title: 'Um processo simples e leve',
              text: 'Você compartilha a história, nós cuidamos do resto.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.07] text-sky-200">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-white/65">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="rounded-[2.3rem] border border-white/10 bg-[linear-gradient(145deg,rgba(244,114,182,.12),rgba(59,130,246,.08),rgba(255,255,255,.03))] p-8 sm:p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">
                <Quote className="h-3.5 w-3.5" />
                Prova social
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                Histórias especiais merecem ser sentidas de verdade.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                Mais do que uma música, esta é uma forma sensível de transformar o que você sente em algo que pode ser ouvido, lembrado e guardado. Os relatos abaixo mostram o impacto de entregar um presente que realmente toca.
              </p>
            </div>
            <div className="grid gap-4">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[1.6rem] border border-white/10 bg-[#0a0918]/70 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 leading-7 text-white/78">“{item.text}”</p>
                  <div className="mt-4 text-sm font-medium text-white/60">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle
          eyebrow="Planos"
          title="Escolha a opção ideal para o momento que você quer marcar"
          text="Apenas opções claras para diferentes necessidades de cuidado, apresentação e prazo."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`relative rounded-[2rem] border p-8 ${
                plan.featured
                  ? 'border-fuchsia-400/30 bg-[linear-gradient(180deg,rgba(244,114,182,.14),rgba(255,255,255,.04))] shadow-[0_0_0_1px_rgba(244,114,182,.08)]'
                  : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              {plan.featured ? (
                <div className="absolute -top-3 left-8 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0b0a19]">
                  Mais escolhido
                </div>
              ) : null}
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">{plan.name}</div>
              <div className="mt-2 text-lg text-white/70">{plan.subtitle}</div>
              <div className="mt-6 text-5xl font-semibold tracking-tight">{plan.price}</div>
              <div className="mt-2 text-sm text-white/45">pagamento único</div>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-white/76">
                    <div className="mt-0.5 rounded-full bg-emerald-400/15 p-1 text-emerald-300">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.link}
                className={`mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-medium transition hover:scale-[1.01] ${
                  plan.featured
                    ? 'bg-white text-[#0b091b]'
                    : 'border border-white/12 bg-white/[0.06] text-white'
                }`}
              >
                {plan.cta}
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-6 py-6 lg:px-8 lg:pb-24">
        <SectionTitle eyebrow="FAQ" title="Dúvidas comuns antes de transformar uma história em música" />

        <div className="mt-12 space-y-4">
          {[
            [
              'A música fica genérica?',
              'Não. Cada canção é criada a partir dos detalhes da sua história para que o resultado soe pessoal, sensível e verdadeiro.',
            ],
            [
              'Quanto tempo leva?',
              'O prazo varia de acordo com o plano escolhido. Assim que você enviar as informações, a produção segue conforme a opção selecionada.',
            ],
            [
              'Posso usar para qualquer ocasião?',
              'Sim. Essa experiência é perfeita para histórias de amor, família, amizade, gratidão, reconciliação e homenagens afetivas.',
            ],
            [
              'O que eu recebo no final?',
              'Você recebe sua música em formato digital, pronta para compartilhar, presentear e guardar.',
            ],
          ].map(([question, answer]) => (
            <div key={String(question)} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-medium text-white">{question}</h3>
              <p className="mt-3 leading-7 text-white/65">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(140deg,#0d0b1f,rgba(27,20,54,1),rgba(9,16,38,1))] p-10 sm:p-14">
          <GradientOrb className="-left-16 bottom-0 h-72 w-72" />
          <GradientOrb className="right-0 top-0 h-72 w-72" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/65">
              <Heart className="h-3.5 w-3.5" />
              Comece agora
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Algumas histórias pedem mais do que um presente. Pedem canção.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Se a intenção é tocar alguém de verdade, entregue algo que não se encontra pronto. Comece sua música personalizada agora.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-medium text-[#0b091b] transition hover:scale-[1.02]"
              >
                Criar minha música
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
