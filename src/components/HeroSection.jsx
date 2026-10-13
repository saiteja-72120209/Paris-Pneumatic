import React, { useState } from 'react';
import { ArrowRight, Play, RotateCcw, Gauge, Wind, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function HeroSection({ onExplore, onLaunchDeck }) {
  const [capsuleStatus, setCapsuleStatus] = useState('idle'); // 'idle' | 'moving' | 'docked'
  const [speedReadout, setSpeedReadout] = useState('0.0');
  const [pressureDelta, setPressureDelta] = useState(1400); // Pa

  const handleLaunch = () => {
    if (capsuleStatus === 'moving') return;
    setCapsuleStatus('moving');
    setSpeedReadout('11.8');
    setTimeout(() => {
      setCapsuleStatus('docked');
      setSpeedReadout('0.0');
    }, 2200);
  };

  const handleReset = () => {
    setCapsuleStatus('idle');
    setSpeedReadout('0.0');
  };

  return (
    <section className="archive-section theme-forest-dark hero-shell" id="hero">
      <div className="bg-grid-overlay" aria-hidden="true" />

      <div className="hero-editorial-grid">
        {/* Left Column: Documentary Narrative */}
        <div className="hero-copy-column">
          <div className="hero-kicker-bar">
            <span className="archive-seal">
              <Wind size={12} />
              ARCHIVE REF: PNEU-1866
            </span>
            <span className="archive-label kicker-forest">
              PARIS · 19TH CENTURY ENGINEERING
            </span>
          </div>

          <h1 className="hero-title text-display">
            THE PARIS PNEUMATIC POST
          </h1>

          <p className="hero-subtitle">
            When Air Became the Messenger.
          </p>

          <p className="hero-lede-text">
            Long before electronic packets routed across glass fibers, 19th-century Paris built a subterranean arterial network. Beneath boulevards and inside sewer vaults, miles of airtight cast-iron tubing propelled leather-collared brass capsules carrying telegrams at forty kilometers an hour — driven purely by differential air pressure.
          </p>

          <div className="hero-action-cluster">
            <a href="#mechanism" className="btn-primary" onClick={onExplore}>
              <span>Explore The System</span>
              <ArrowRight size={15} />
            </a>
            <button className="btn-outline-brass" onClick={onLaunchDeck}>
              <span>Engineering Deck</span>
              <Sparkles size={14} />
            </button>
          </div>

          <div className="hero-archival-thumb">
            <div className="thumb-image-frame">
              <img
                src="/images/bourse-station.png"
                alt="Bureau central de la poste pneumatique de la Bourse, Paris"
                loading="eager"
              />
            </div>
            <div className="thumb-caption">
              <strong>BUREAU CENTRAL DE LA BOURSE (1866)</strong>
              First operational station connecting the Stock Exchange to the Grand Hôtel (Louis Figuier, <em>Les Merveilles de la science</em>).
            </div>
          </div>
        </div>

        {/* Right Column: Physical Cutaway Demonstration */}
        <div className="hero-capsule-stage">
          <div className="stage-header">
            <div>
              <span className="archive-label kicker-forest">EXHIBIT A · PNEUMATIC CARRIER (CURSEUR)</span>
              <div className="technical-stamp">SCALE 1:1 · GAUGED CAST-IRON DUCT</div>
            </div>
            <div className="archive-seal">
              <Gauge size={12} />
              <span>ΔP: {pressureDelta.toLocaleString()} Pa</span>
            </div>
          </div>

          {/* Interactive Transparent Tube */}
          <div className="tube-visual-chamber" aria-label="Transparent tube simulation">
            <div className="tube-center-streamline" />

            <div
              className={`pneumatic-capsule-body ${
                capsuleStatus === 'moving'
                  ? 'capsule-transit-moving'
                  : capsuleStatus === 'docked'
                  ? 'capsule-transit-moving'
                  : 'capsule-transit-idle'
              }`}
            >
              <div className="capsule-buffer-front" title="Front felt & leather buffer" />
              <div className="capsule-brass-cylinder">
                <span>POSTE·PNEU·42</span>
              </div>
              <div className="capsule-leather-collar" title="Leather expansion collar (garniture de cuir)" />
            </div>
          </div>

          {/* Real-time telemetry readouts & trigger */}
          <div className="stage-launch-strip">
            <div className="capsule-readout-item">
              <span className="readout-label">VELOCITY</span>
              <span className="readout-val">{speedReadout} m/s</span>
            </div>

            <div className="capsule-readout-item">
              <span className="readout-label">STATUS</span>
              <span className="readout-val" style={{ color: capsuleStatus === 'moving' ? '#E0673C' : '#D2B881' }}>
                {capsuleStatus === 'idle' ? 'READY IN TUBE' : capsuleStatus === 'moving' ? 'IN TRANSIT...' : 'ARRIVED & DOCKED'}
              </span>
            </div>

            <div className="capsule-readout-item">
              <span className="readout-label">DIAMETER</span>
              <span className="readout-val">65 mm</span>
            </div>

            {capsuleStatus === 'docked' ? (
              <button className="launch-trigger-btn" onClick={handleReset}>
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            ) : (
              <button
                className="launch-trigger-btn"
                onClick={handleLaunch}
                disabled={capsuleStatus === 'moving'}
              >
                <Play size={14} />
                <span>Propel</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
