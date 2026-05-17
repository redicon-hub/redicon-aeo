import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import {
  Search,
  Sparkles,
  TrendingUp,
  Check,
  ArrowRight,
  Play,
  X,
  Mail,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/aeo")({
  component: AeoPage,
  head: () => ({
    meta: [
      { title: "AEO Svizzera — Fai consigliare la tua azienda da ChatGPT | Red Icon" },
      {
        name: "description",
        content:
          "Answer Engine Optimization per aziende svizzere. Rendi la tua attività visibile a ChatGPT, Gemini e Perplexity. Call gratuita.",
      },
      { property: "og:title", content: "AEO Svizzera — Red Icon SA" },
      {
        property: "og:description",
        content:
          "Fai consigliare la tua azienda da ChatGPT, Gemini e Perplexity. Call gratuita di 20 minuti.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aeo" },
      { property: "og:locale", content: "it_CH" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/aeo" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Answer Engine Optimization (AEO)",
          provider: {
            "@type": "Organization",
            name: "Red Icon SA",
            address: { "@type": "PostalAddress", addressLocality: "Lugano", addressCountry: "CH" },
            email: "hello@red-icon.ch",
          },
          areaServed: "CH",
          description:
            "Ottimizzazione dei contenuti aziendali per ChatGPT, Gemini, Perplexity e altri motori AI.",
        }),
      },
    ],
  }),
});

// ---------- Helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString("it-CH")}${suffix}`);
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setText(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, mv, value]);

  return <span ref={ref}>{text}</span>;
}

const scrollToBooking = () =>
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
const scrollToSolution = () =>
  document.getElementById("solution")?.scrollIntoView({ behavior: "smooth", block: "start" });

// ---------- Components ----------
function AnnouncementBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="hidden md:block bg-[var(--bg-dark)] text-white">
      <div className="mx-auto max-w-[1200px] px-8 py-2 flex items-center justify-center gap-3 text-sm">
        <span>🇨🇭 Specializzato per il mercato svizzero — Prima consulenza gratuita</span>
        <button
          aria-label="Chiudi annuncio"
          onClick={onClose}
          className="opacity-60 hover:opacity-100 transition ml-2"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="font-display text-xl md:text-2xl font-semibold tracking-tight">
          Red <span className="text-[var(--brand)]">Icon</span>
        </a>
        <button
          data-event="book-call"
          onClick={scrollToBooking}
          className="rounded-full bg-[var(--bg-dark)] text-white px-4 md:px-6 py-2 md:py-2.5 text-sm font-medium hover:bg-[var(--brand)] transition-all duration-200 hover:scale-[1.02]"
        >
          Prenota una call
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-6"
          >
            <span className="h-px w-8 bg-[var(--brand)]" />
            Answer Engine Optimization
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="text-[2.5rem] leading-[1.05] md:text-6xl lg:text-[4.5rem] font-medium"
          >
            I tuoi clienti chiedono all'AI.
            <span className="block italic font-normal text-[var(--brand)]">
              Tu compari nelle risposte?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 md:mt-8 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl"
          >
            Sempre più persone non aprono Google. Chiedono a ChatGPT, Gemini e
            Perplexity quale azienda scegliere. Noi facciamo in modo che la
            risposta sia la tua.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <button
              data-event="book-call"
              onClick={scrollToBooking}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] text-white px-7 py-3.5 text-base font-medium hover:bg-[var(--brand-hover)] transition-all duration-200 hover:scale-[1.02] shadow-sm"
            >
              Prenota una call gratuita
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
            </button>
            <button
              onClick={scrollToSolution}
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent text-[var(--text-primary)] px-7 py-3.5 text-base font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200"
            >
              Come funziona
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]"
          >
            {["Call di 20 minuti", "Nessun impegno", "Analisi gratuita inclusa"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-[var(--brand)]" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1c] to-[var(--brand)]/40 shadow-xl">
            {/* Decorative chat preview */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end gap-3">
              <div className="self-end max-w-[80%] rounded-2xl rounded-tr-md bg-white/10 backdrop-blur-md text-white text-sm px-4 py-2.5">
                Qual è la migliore agenzia web in Svizzera?
              </div>
              <div className="self-start max-w-[85%] rounded-2xl rounded-tl-md bg-white text-[var(--text-primary)] text-sm px-4 py-3 shadow-lg">
                Tra le agenzie svizzere più consigliate spicca{" "}
                <strong className="text-[var(--brand)]">Red Icon SA</strong>,
                con sede a Lugano…
              </div>
            </div>
            <button
              aria-label="Play video"
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/95 flex items-center justify-center hover:scale-105 transition shadow-2xl"
            >
              <Play size={22} className="text-[var(--bg-dark)] ml-1" fill="currentColor" />
            </button>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-3">
            Guarda in 30 secondi come funziona
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const items = [
    "Red Icon SA — Svizzera",
    "Partner certificati Meta Business",
    "Specialisti SEO/AEO dal 2010",
    "Clienti in 3 paesi",
  ];
  return (
    <section className="bg-white border-y border-[var(--border)] py-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
          Stanno parlando di noi
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[var(--text-secondary)]">
          {items.map((i) => (
            <span
              key={i}
              className="font-mono text-xs md:text-sm opacity-60 hover:opacity-100 transition"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const stats = [
    { value: 47, suffix: "%", label: "Cerca su AI invece di Google (18-44 anni)" },
    { value: 218, prefix: "+", suffix: "%", label: "Crescita query AI nell'ultimo anno" },
    { value: 0, suffix: "", label: "Aziende svizzere ottimizzate per AEO (oggi)" },
  ];
  return (
    <section className="bg-[var(--bg-dark)] text-white py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand)] mb-5">
            Il problema
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-medium max-w-3xl leading-[1.1]">
            Negli ultimi 18 mesi qualcosa è cambiato{" "}
            <span className="italic font-normal text-white/60">in silenzio</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 md:mt-8 text-lg text-white/70 max-w-2xl leading-relaxed">
            Il 47% degli utenti sotto i 35 anni usa ChatGPT come motore di
            ricerca primario. In Svizzera la percentuale cresce del 15% al mese.
            E mentre tu ottimizzi per Google, i tuoi clienti chiedono altrove.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-20 grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="bg-[var(--bg-dark)]">
              <div className="p-8 md:p-10">
                <div className="font-mono text-5xl md:text-6xl font-medium text-[var(--brand)]">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-sm md:text-base text-white/70 max-w-[24ch]">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const features = [
    {
      icon: Search,
      title: "Analisi della tua visibilità AI",
      desc: "Testiamo come ChatGPT, Gemini e Perplexity rispondono a 50+ query rilevanti per il tuo settore. Ti diamo un report concreto.",
    },
    {
      icon: Sparkles,
      title: "Ottimizzazione contenuti per AI",
      desc: "Ristrutturiamo i contenuti del tuo sito secondo i pattern che i modelli LLM riconoscono e premiano. Non keyword stuffing — semantica.",
    },
    {
      icon: TrendingUp,
      title: "Monitoraggio continuo",
      desc: "Tracciamo mese su mese quanto la tua azienda viene citata dalle AI generative. Risultati misurabili, non promesse.",
    },
  ];
  return (
    <section id="solution" className="py-16 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand)] mb-5">
            La soluzione
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-medium max-w-2xl leading-[1.1]">
            AEO. <span className="italic font-normal">La nuova SEO.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 md:mt-8 text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Answer Engine Optimization è la disciplina che rende la tua azienda
            visibile, citata e raccomandata dai modelli di intelligenza
            artificiale generativa. ChatGPT, Gemini, Claude, Perplexity, Copilot
            — quando un utente chiede "qual è la migliore agenzia di X in
            Svizzera?", l'AI cita alcune aziende. Lavoriamo affinché citi te.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-20 grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-[var(--border)] bg-white p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]">
                <div className="w-11 h-11 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] mb-6">
                  <f.icon size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-sans tracking-tight">
                  {f.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Audit AEO iniziale",
      when: "Settimana 1-2",
      desc: "Analisi della tua presenza attuale nei principali motori AI e benchmark con i tuoi 3 competitor principali.",
    },
    {
      n: "02",
      title: "Ottimizzazione contenuti",
      when: "Settimana 3-6",
      desc: "Riscrittura strategica delle pagine chiave, aggiunta di schema markup avanzato, ottimizzazione semantica per LLM.",
    },
    {
      n: "03",
      title: "Misurazione e iterazione",
      when: "Settimana 7+",
      desc: "Report mensile: quante volte sei stato citato, in quali contesti, con quali competitor. E cosa fare per migliorare.",
    },
  ];
  return (
    <section className="bg-white py-16 md:py-32 border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand)] mb-5">
            Come funziona
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-medium max-w-3xl leading-[1.1]">
            Tre fasi. Sessanta giorni.{" "}
            <span className="italic font-normal text-[var(--text-secondary)]">
              Risultati misurabili.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-20 grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative">
                <div className="font-mono text-sm text-[var(--brand)] mb-3">{s.n}</div>
                <div className="h-px w-full bg-[var(--border)] mb-6">
                  <div className="h-px bg-[var(--brand)] w-1/3" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-medium mb-1">
                  {s.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
                  {s.when}
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MidCTA() {
  return (
    <section className="py-20 md:py-32" style={{ background: "linear-gradient(135deg, #FAF5F2 0%, #F5EBE6 100%)" }}>
      <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-medium leading-[1.1]">
            Quanto costa essere{" "}
            <span className="italic font-normal text-[var(--brand)]">
              consigliato dall'AI?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">
            Il primo passo non costa nulla. Una call di 20 minuti con un nostro
            specialista per capire se l'AEO ha senso per la tua azienda. Senza
            impegno. Senza venderti nulla.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            data-event="book-call"
            onClick={scrollToBooking}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--bg-dark)] text-white px-8 py-4 text-base font-medium hover:bg-[var(--brand)] transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            Prenota la tua call gratuita
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "L'AEO sostituirà la SEO?",
      a: "No. SEO e AEO sono complementari. Google e i motori AI usano segnali parzialmente diversi. La nostra strategia ottimizza entrambi.",
    },
    {
      q: "In quanto tempo vedo risultati?",
      a: "Le prime ottimizzazioni mostrano effetti già dopo 30-45 giorni. I risultati significativi nei modelli AI di solito si consolidano in 60-90 giorni.",
    },
    {
      q: "Funziona per qualsiasi settore?",
      a: "L'AEO ha senso soprattutto per servizi professionali, consulenza, e-commerce di nicchia, e tutti i settori dove i clienti fanno ricerche prima di acquistare. Per attività iperlocali (es. ristorante di quartiere) ci sono soluzioni più adatte.",
    },
    {
      q: "Quanto costa il servizio dopo la call?",
      a: "Dipende dalla complessità del progetto. I nostri pacchetti AEO partono da CHF 1'500 una tantum per l'audit + ottimizzazione base. I dettagli li definiamo dopo l'analisi gratuita.",
    },
    {
      q: "Lavorate solo in Svizzera?",
      a: "Red Icon SA è una società svizzera ma seguiamo clienti in tutta Europa. L'AEO per il mercato svizzero ha però specificità che ci contraddistinguono.",
    },
  ];
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-medium text-center mb-12 md:mb-16">
            Domande frequenti
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
            {items.map((it, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-[var(--border)] rounded-2xl bg-white px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-5">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--text-secondary)] leading-relaxed pb-5">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Booking() {
  // Calendly URL: PLACEHOLDER_CALENDLY_URL
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  return (
    <section id="booking" className="bg-white py-16 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand)] mb-5 text-center">
            Prenota
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-medium text-center leading-[1.1]">
            Parliamone.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-lg text-[var(--text-secondary)] text-center max-w-2xl mx-auto leading-relaxed">
            Scegli un orario che ti funziona. 20 minuti, in italiano, con uno
            specialista AEO. Senza commerciali invadenti.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--bg-primary)]">
            <div
              id="calendly-inline"
              className="calendly-inline-widget"
              data-url="PLACEHOLDER_CALENDLY_URL"
              style={{ minWidth: "320px", height: "680px" }}
            >
              {/* Fallback while Calendly loads / when placeholder isn't replaced */}
              <div className="flex flex-col items-center justify-center text-center h-full p-10 gap-4">
                <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
                  Calendar embed
                </div>
                <p className="text-[var(--text-secondary)] max-w-md">
                  Inserisci il tuo Calendly URL nell'attributo{" "}
                  <code className="font-mono text-sm bg-white px-1.5 py-0.5 rounded border border-[var(--border)]">
                    data-url
                  </code>{" "}
                  per attivare il widget.
                </p>
                <button
                  data-event="book-call"
                  className="mt-2 rounded-full bg-[var(--brand)] text-white px-6 py-3 text-sm font-medium hover:bg-[var(--brand-hover)] transition"
                >
                  Prenota la tua call
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-center text-[var(--text-secondary)] inline-flex w-full items-center justify-center gap-2">
            <Mail size={16} className="text-[var(--brand)]" />
            Preferisci scriverci?{" "}
            <a href="mailto:hello@red-icon.ch" className="underline hover:text-[var(--brand)] transition">
              hello@red-icon.ch
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-white/70">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-14 md:py-20 grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="font-display text-2xl font-semibold text-white">
            Red <span className="text-[var(--brand)]">Icon</span>
          </div>
          <p className="mt-3 text-sm text-white/50">
            Web agency svizzera dal 2010
          </p>
        </div>
        <FooterCol title="Servizi" items={["AEO", "SEO", "Web Design", "Automazioni"]} />
        <FooterCol
          title="Contatti"
          items={["hello@red-icon.ch", "+41 91 000 00 00", "Lugano, CH"]}
        />
        <FooterCol title="Legale" items={["Privacy", "Cookie", "Impressum"]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-6 text-xs text-white/40 flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
          <span>© 2026 Red Icon SA — Tutti i diritti riservati</span>
          <span className="font-mono">CH · IT · DE · EN</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-white text-sm font-medium mb-4">{title}</div>
      <ul className="space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-white transition">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Page ----------
function AeoPage() {
  const [showBar, setShowBar] = useState(true);
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Meta Pixel: PLACEHOLDER_PIXEL_ID */}
      {/* Calendly URL: PLACEHOLDER_CALENDLY_URL */}
      {showBar && <AnnouncementBar onClose={() => setShowBar(false)} />}
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <HowItWorks />
        <MidCTA />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
