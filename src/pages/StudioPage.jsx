import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  STUDIO_APPROACH,
  STUDIO_GLOBAL,
  STUDIO_RESCUE,
  STUDIO_STACK,
} from '../data/studioContent';

function scrollToContact() {
  const el = document.getElementById('studio-contact');
  const root = document.getElementById('root');
  if (!el || !root) return;
  const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
  root.scrollTo({ top, behavior: 'smooth' });
}

function StudioHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between px-[var(--space-3)] pt-[var(--space-4)] md:px-[var(--space-6)]">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-[var(--space-2)] border border-[var(--color-line)] bg-[var(--color-bg-0)]/80 px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-muted)] backdrop-blur-sm transition-colors hover:border-[var(--color-muted)] hover:text-[var(--color-white)]"
        >
          ← maydi
        </Link>
        <p className="pointer-events-none hidden font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--color-muted)] sm:block">
          maydi studio
        </p>
      </div>

      <motion.div
        className="mx-auto w-full max-w-[var(--max-width)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="max-w-4xl text-[clamp(32px,6vw,56px)] font-semibold leading-tight tracking-tight text-[var(--color-white)]">
          Разработка AI-продуктов и сложных B2B-систем.
        </h1>
        <p className="mt-[var(--space-4)] max-w-2xl text-[clamp(16px,2.2vw,20px)] leading-relaxed text-[var(--color-muted)]">
          Проектируем highload-архитектуру, внедряем RAG-системы и упаковываем бизнесы с прицелом на
          глобальный рынок.
        </p>
        <Button className="mt-[var(--space-6)]" onClick={scrollToContact}>
          Обсудить проект
        </Button>
      </motion.div>
    </section>
  );
}

function StudioRescue() {
  return (
    <section className="border-t border-[var(--color-line)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Rescue / Takeover
        </p>
        <p className="mb-[var(--space-6)] max-w-3xl text-[var(--text-base)] leading-relaxed text-[var(--color-text)]">
          Часто нас зовут не начинать с нуля, а спасать проекты, которые уперлись в архитектурный
          потолок или застряли на этапе масштабирования.
        </p>

        <div className="grid grid-cols-1 gap-[var(--space-3)] md:grid-cols-2">
          {STUDIO_RESCUE.map((item) => (
            <Card key={item.id} className="flex flex-col gap-[var(--space-4)]">
              <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-white)]">
                {item.title}
              </h3>
              <div className="flex flex-col gap-[var(--space-3)]">
                <div>
                  <p className="mb-[var(--space-1)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    Ситуация
                  </p>
                  <p className="text-[var(--text-sm)] text-[var(--color-muted)]">{item.situation}</p>
                </div>
                <div>
                  <p className="mb-[var(--space-1)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    Решение
                  </p>
                  <p className="text-[var(--text-sm)] text-[var(--color-muted)]">{item.solution}</p>
                </div>
                <div>
                  <p className="mb-[var(--space-1)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    Результат
                  </p>
                  <p className="text-[var(--text-sm)] text-[var(--color-text)]">{item.result}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioApproach() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-1)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Approach
        </p>
        <h2 className="max-w-3xl text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
          Мы — слаженный продуктовый механизм.
        </h2>
        <p className="mt-[var(--space-4)] max-w-3xl text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
          {STUDIO_APPROACH}
        </p>
      </div>
    </section>
  );
}

function StudioStack() {
  return (
    <section className="border-t border-[var(--color-line)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Stack
        </p>
        <h2 className="mb-[var(--space-6)] text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
          Стек и инструменты
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-3 md:gap-[var(--space-6)]">
          {STUDIO_STACK.map((group) => (
            <div key={group.title}>
              <h3 className="mb-[var(--space-3)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-[var(--space-1)]">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-[var(--color-line)] px-[var(--space-2)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-text)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioGlobal() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-1)] px-[var(--space-3)] py-[var(--space-8)] md:px-[var(--space-6)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Global
        </p>
        <p className="max-w-3xl text-[clamp(16px,2vw,20px)] leading-relaxed text-[var(--color-text)]">
          {STUDIO_GLOBAL}
        </p>
      </div>
    </section>
  );
}

const inputClass =
  'w-full border border-[var(--color-line)] bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-muted)]';

function StudioContact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [brief, setBrief] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert('Request sent');
    setName('');
    setContact('');
    setBrief('');
  };

  return (
    <section
      id="studio-contact"
      className="border-t border-[var(--color-line)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Contact
        </p>
        <h2 className="max-w-3xl text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
          Давайте соберем архитектуру вашего продукта.
        </h2>

        <form
          onSubmit={onSubmit}
          className="mt-[var(--space-6)] grid max-w-xl grid-cols-1 gap-[var(--space-3)]"
        >
          <label className="flex flex-col gap-[var(--space-1)]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Имя / Компания
            </span>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              autoComplete="organization"
              required
            />
          </label>

          <label className="flex flex-col gap-[var(--space-1)]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Telegram / Email
            </span>
            <input
              className={inputClass}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              name="contact"
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-[var(--space-1)]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Краткая суть задачи
            </span>
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              name="brief"
              placeholder="Или ссылка на текущий проект"
              required
            />
          </label>

          <Button type="submit" className="justify-self-start">
            Отправить запрос
          </Button>
        </form>
      </div>
    </section>
  );
}

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-0)] text-[var(--color-text)]">
      <StudioHero />
      <StudioRescue />
      <StudioApproach />
      <StudioStack />
      <StudioGlobal />
      <StudioContact />
      <footer className="border-t border-[var(--color-line)] px-[var(--space-3)] py-[var(--space-6)] md:px-[var(--space-6)]">
        <div className="mx-auto flex max-w-[var(--max-width)] flex-wrap items-center justify-between gap-[var(--space-3)]">
          <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
            © 2026 maydi studio
          </p>
          <Link
            to="/"
            className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-white)]"
          >
            maydi.net
          </Link>
        </div>
      </footer>
    </div>
  );
}
