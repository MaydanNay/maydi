import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from '../i18n/LocaleContext';
import { Button } from './ui/Button';

export default function DataRoomModal({ open, onClose }) {
  const { t } = useLocale();
  const titleId = useId();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setName('');
      setContact('');
      setNote('');
      setSent(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      [`Name / Company: ${name}`, `Contact: ${contact}`, `Note: ${note || '—'}`].join('\n'),
    );
    window.location.href = `mailto:partners@maydi.net?subject=DataRoom%20access%20request&body=${body}`;
    setSent(true);
  };

  return createPortal(
    <>
      <button
        type="button"
        className="dataroom-modal__backdrop"
        aria-label={t('dataRoom.close')}
        onClick={onClose}
      />
      <div className="dataroom-modal" role="presentation">
        <div
          className="dataroom-modal__panel maydi-scroll"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-lenis-prevent
        >
          <div className="dataroom-modal__head">
            <div>
              <p className="dataroom-modal__kicker">{t('dataRoom.kicker')}</p>
              <h2 id={titleId} className="dataroom-modal__title">
                {t('dataRoom.title')}
              </h2>
            </div>
            <button
              type="button"
              className="dataroom-modal__close"
              onClick={onClose}
              aria-label={t('dataRoom.close')}
            >
              ×
            </button>
          </div>

          {sent ? (
            <p className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-text)]">
              {t('dataRoom.sent')}
            </p>
          ) : (
            <form className="dataroom-modal__form" onSubmit={handleSubmit}>
              <label className="dataroom-modal__label">
                <span>{t('dataRoom.name')}</span>
                <input
                  className="dataroom-modal__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  autoComplete="organization"
                  required
                />
              </label>
              <label className="dataroom-modal__label">
                <span>{t('dataRoom.contact')}</span>
                <input
                  className="dataroom-modal__input"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  name="contact"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="dataroom-modal__label">
                <span>{t('dataRoom.note')}</span>
                <textarea
                  className="dataroom-modal__input dataroom-modal__input--area"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  name="note"
                  placeholder={t('dataRoom.notePlaceholder')}
                />
              </label>
              <Button type="submit" className="dataroom-modal__submit">
                {t('dataRoom.submit')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
