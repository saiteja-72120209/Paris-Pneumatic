import React from 'react';
import { X, CheckCircle2, Wind, Calendar, Wrench, Navigation, Activity, Scale, Cpu, BookOpen } from 'lucide-react';

export const SLIDE_METADATA = [
  {
    id: 'hero',
    num: '01',
    title: 'Cinematic Introduction',
    subtitle: 'When Air Became the Messenger',
    kicker: 'PROLOGUE',
    icon: Wind,
    theme: 'Dark Forest Green'
  },
  {
    id: 'timeline',
    num: '02',
    title: 'Historical Timeline',
    subtitle: '1853 — 1984 Chronology & Milestones',
    kicker: 'CHRONOLOGY',
    icon: Calendar,
    theme: 'Warm Parchment'
  },
  {
    id: 'mechanism',
    num: '03',
    title: 'Subterranean Cycle',
    subtitle: 'Five Physical Stages of Propulsion',
    kicker: 'ENGINEERING',
    icon: Wrench,
    theme: 'Deep Forest Green'
  },
  {
    id: 'network',
    num: '04',
    title: 'Network Architecture',
    subtitle: 'Paris Radial Polygon & Sewer Ingress',
    kicker: 'TOPOLOGY',
    icon: Navigation,
    theme: 'Warm Parchment'
  },
  {
    id: 'lab',
    num: '05',
    title: 'Engineering Physics Lab',
    subtitle: 'Ideal Force Modeling: F = ΔP × A',
    kicker: 'SIMULATION',
    icon: Activity,
    theme: 'Technical Dark'
  },
  {
    id: 'comparison',
    num: '06',
    title: 'Critical Appraisal',
    subtitle: 'Triumphs vs Systemic Limitations',
    kicker: 'EVALUATION',
    icon: Scale,
    theme: 'Warm Parchment'
  },
  {
    id: 'legacy',
    num: '07',
    title: 'Contemporary Legacy',
    subtitle: 'Hospitals, Industry & Vactrains',
    kicker: 'MODERN ERA',
    icon: Cpu,
    theme: 'Cinematic Forest'
  },
  {
    id: 'references',
    num: '08',
    title: 'Archive & Bibliography',
    subtitle: 'Verified Sources & Concluding Legacy',
    kicker: 'FINALE',
    icon: BookOpen,
    theme: 'Warm Parchment'
  }
];

export default function SlideOverviewModal({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide
}) {
  if (!isOpen) return null;

  return (
    <div
      className="presentation-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Slide Overview Grid"
    >
      <div
        className="overview-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overview-modal-header">
          <div>
            <span className="archive-seal" style={{ marginBottom: '6px' }}>
              DECK NAVIGATOR · 8 EXHIBITS
            </span>
            <h3 className="overview-modal-title">Slide Overview</h3>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Slide Overview (Escape)"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overview-grid">
          {SLIDE_METADATA.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                className={`overview-card ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                aria-label={`Jump to slide ${slide.num}: ${slide.title}`}
              >
                <div className="overview-card-header">
                  <span className="overview-card-num">{slide.num}</span>
                  <span className="overview-card-kicker">{slide.kicker}</span>
                  {isActive && (
                    <span className="overview-card-badge">
                      <CheckCircle2 size={12} />
                      CURRENT
                    </span>
                  )}
                </div>

                <div className="overview-card-icon">
                  <Icon size={24} />
                </div>

                <h4 className="overview-card-title">{slide.title}</h4>
                <p className="overview-card-desc">{slide.subtitle}</p>

                <div className="overview-card-footer">
                  <span className="overview-card-theme">{slide.theme}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
