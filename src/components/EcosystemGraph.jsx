import '../styles/ecosystem.css';
import { PROJECTS } from '../data/content';

const SELECTABLE = new Set(Object.keys(PROJECTS));

function NodeButton({
  id,
  label,
  variant,
  className = '',
  captionOutside = false,
  onSelect,
}) {
  const selectable = SELECTABLE.has(id);

  return (
    <button
      type="button"
      id={`eco-node-${id}`}
      className={`eco-node eco-node--${variant} ${className}`.trim()}
      data-id={id}
      aria-label={selectable ? `Открыть проект ${label}` : label}
      onClick={() => {
        if (selectable) onSelect?.(id);
      }}
    >
      {captionOutside ? (
        <span className="eco-node__caption">{label}</span>
      ) : (
        <span className="eco-node__label">{label}</span>
      )}
    </button>
  );
}

/**
 * DOM/CSS solar system — visual port of `_legacy/` orbits + nodes.
 * Product satellites: filled discs + caption beside (not text inside a stroke ring).
 * Click opens React sidebar via onSelect.
 */
export default function EcosystemGraph({ dimmed = false, onSelect, fullPage = false }) {
  return (
    <div
      className={`eco-universe${fullPage ? ' eco-universe--full' : ''}`.trim()}
      aria-label="Экосистема проектов maydi"
    >
      <div
        className={`eco-universe__system${dimmed ? ' is-blurred' : ''}`.trim()}
      >
        <NodeButton
          id="helixa"
          label="Helixa"
          variant="bright"
          className="eco-node--center"
          onSelect={onSelect}
        />

        <div className="eco-orbit eco-orbit--inner">
          <div className="eco-connector" style={{ transform: 'rotate(-90deg)' }} />
          <div className="eco-connector" style={{ transform: 'rotate(90deg)' }} />
          <NodeButton id="mimora" label="mimora" variant="bright" captionOutside onSelect={onSelect} />
          <NodeButton id="vivida" label="vivida" variant="bright" captionOutside onSelect={onSelect} />
        </div>

        <div className="eco-orbit eco-orbit--outer">
          <div className="eco-connector" style={{ transform: 'rotate(0deg)' }} />
          <div className="eco-connector" style={{ transform: 'rotate(180deg)' }} />
          <NodeButton id="lyutik" label="Lyutik" variant="dark" captionOutside onSelect={onSelect} />
          <NodeButton id="mixlink" label="mixlink" variant="dark" captionOutside onSelect={onSelect} />
        </div>

        <div className="eco-orbit eco-orbit--secret">
          <div className="eco-connector" style={{ transform: 'rotate(-135deg)' }} />
          <div className="eco-connector" style={{ transform: 'rotate(45deg)' }} />
          <div className="eco-connector" style={{ transform: 'rotate(-45deg)' }} />
          <NodeButton id="secret1" label="?" variant="secret" className="eco-node--glitch" />
          <NodeButton id="secret2" label="?" variant="secret" className="eco-node--glitch" />
          <NodeButton id="secret3" label="?" variant="secret" className="eco-node--glitch" />
        </div>
      </div>
    </div>
  );
}
