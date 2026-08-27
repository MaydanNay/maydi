import { useLocale } from '../i18n/LocaleContext';
import { useStickyHorizontalScroll } from '../hooks/useStickyHorizontalScroll';
import RevealText from './ui/RevealText';

function PartnerPhoto({ src, objectPosition }) {
  if (!src) {
    return <div className="photo-trail photo-trail--empty" aria-hidden />;
  }

  return (
    <div className="photo-trail">
      <img
        className="photo-trail__img"
        src={src}
        alt=""
        draggable={false}
        loading="lazy"
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}

function PartnerCard({ person, typeLabel }) {
  return (
    <article className="partners-rail__card">
      <div className="partners-rail__photo">
        <PartnerPhoto src={person.photo} objectPosition={person.photoPosition} />
        <span className="partners-rail__type">
          {person.type === 'partner' ? typeLabel.partner : typeLabel.inhouse}
        </span>
      </div>
      <div className="partners-rail__body">
        <h3 className="partners-rail__name">{person.name}</h3>
        <p className="partners-rail__role">{person.role}</p>
        <p className="partners-rail__desc">{person.description}</p>
      </div>
    </article>
  );
}

export default function Partners() {
  const { dict } = useLocale();
  const { partners: p } = dict;
  const { scrollRef, trackRef } = useStickyHorizontalScroll();

  return (
    <section id="partners" className="partners-rail">
      <header className="partners-rail__head">
        <RevealText
          as="p"
          text={p.kicker}
          mode="words"
          stagger={0.055}
          duration={0.75}
          className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]"
        />
        <RevealText
          as="h2"
          text={p.title}
          mode="words"
          delay={0.08}
          stagger={0.042}
          className="partners-rail__title mt-[var(--space-4)] max-w-[16ch] text-[clamp(28px,4.5vw,52px)] uppercase leading-[0.95] tracking-[-0.02em] text-[var(--color-white)]"
        />
        <RevealText
          as="p"
          text={p.subtitle}
          mode="words"
          delay={0.18}
          stagger={0.026}
          duration={0.9}
          className="mt-[var(--space-4)] max-w-md text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]"
        />
      </header>

      <div ref={scrollRef} className="partners-rail__scroll">
        <div className="partners-rail__pin">
          <div className="partners-rail__viewport">
            <div ref={trackRef} className="partners-rail__track">
              {p.people.map((person) => (
                <PartnerCard
                  key={person.id}
                  person={person}
                  typeLabel={{ partner: p.typePartner, inhouse: p.typeInhouse }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
