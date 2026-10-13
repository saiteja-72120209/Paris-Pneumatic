import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

const shortcutsList = [
  { key: '→ / Space', desc: 'Advance to next slide' },
  { key: '←', desc: 'Return to previous slide' },
  { key: 'Home', desc: 'Jump to first slide (Opening)' },
  { key: 'End', desc: 'Jump to last slide (Archive)' },
  { key: 'F', desc: 'Toggle native browser fullscreen' },
  { key: 'Esc', desc: 'Exit fullscreen, close overlays, or exit presentation' },
  { key: '?', desc: 'Toggle this keyboard shortcuts dialog' },
  { key: 'P', desc: 'Toggle between Presentation Deck and Scroll Archive' }
];

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="presentation-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts"
    >
      <div
        className="shortcuts-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shortcuts-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="shortcuts-icon-frame">
              <Keyboard size={18} />
            </div>
            <div>
              <span className="archive-seal" style={{ marginBottom: '4px' }}>
                KEYNOTE NAVIGATION
              </span>
              <h3 className="shortcuts-modal-title">Keyboard Shortcuts</h3>
            </div>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close shortcuts dialog (Escape)"
          >
            <X size={20} />
          </button>
        </div>

        <div className="shortcuts-table">
          {shortcutsList.map((item, idx) => (
            <div className="shortcut-row" key={idx}>
              <kbd className="shortcut-kbd">{item.key}</kbd>
              <span className="shortcut-desc">{item.desc}</span>
            </div>
          ))}
        </div>

        <div className="shortcuts-modal-footer">
          <span>TIP: Mouse gestures (wheel & touch swipe) also navigate slides.</span>
        </div>
      </div>
    </div>
  );
}
