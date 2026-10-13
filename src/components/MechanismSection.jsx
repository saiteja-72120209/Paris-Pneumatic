import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Wind, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

const mechanismStages = [
  {
    stage: 1,
    title: 'Message Preparation & Encapsulation',
    short: 'Preparation',
    summary: 'Messages were inscribed onto lightweight blue stationery (cartes-télégrammes) and inserted into a cylindrical carrier called a curseur.',
    detail: 'The curseur consisted of a brass or sheet-iron body sheathed in leather, fitted with a felt front buffer and an expanding leather skirt at the rear. The leather collar expanded against the interior tube wall under air pressure, forming a sliding airtight piston seal without excessive mechanical friction.',
    glossary: {
      term: 'Curseur (Carrier Capsule)',
      definition: 'Cylindrical container measuring 120–150 mm in length and 60 mm in diameter, weighing ~250 grams loaded.'
    },
    svgHighlight: 'capsule-prep',
    capsuleX: 45
  },
  {
    stage: 2,
    title: 'Airlock Chamber Insertion',
    short: 'Loading',
    summary: 'The operator placed the capsule inside the heavy brass breech loading apparatus of the pneumatic telegraph station.',
    detail: 'The launching apparatus (Appareil distributeur) featured an airtight swinging breech door and an isolation valve. When open to atmospheric pressure for capsule loading, the main conduit remained isolated so system pressure was not compromised across the rest of the underground line.',
    glossary: {
      term: 'Boîte d\'envoi (Breech Airlock)',
      definition: 'Cast-iron airlock mechanism equipped with a screw-lever clamp that seals hermetically before pressurization.'
    },
    svgHighlight: 'breech-door',
    capsuleX: 95
  },
  {
    stage: 3,
    title: 'Pressure & Vacuum Generation',
    short: 'Pressure Source',
    summary: 'Centralized pumping stations injected compressed air behind the capsule or extracted air ahead to create a driving pressure differential (ΔP).',
    detail: 'Paris utilized two distinct propulsion modes: "Refoulement" (positive pressure blowing from the sending station at 0.5 to 1.0 bar gauge) and "Aspiration" (vacuum suction created ahead of the carrier by exhaust pumps at the receiving station). Alternating pressure and vacuum permitted bidirectional communication along single conduits.',
    glossary: {
      term: 'Surpresseur & Dépresseur',
      definition: 'Reciprocating steam and later centrifugal electric compressors providing 50–100 kPa differential pressure.'
    },
    svgHighlight: 'valves-pressure',
    capsuleX: 180
  },
  {
    stage: 4,
    title: 'Subterranean Pipeline Transit',
    short: 'Underground Transit',
    summary: 'Driven by the expanding column of air, the capsule accelerated through underground cast-iron and lead tubes at 10 to 12 meters per second.',
    detail: 'The tubes were primarily manufactured from cast iron with lead interior lining to minimize surface roughness, with an internal bore of 65 mm (later expanded to 80 mm). Because Paris constructed its monumental sewer collector network under Baron Haussmann concurrently, the pneumatic lines were securely suspended from sewer vault roofs without excavating road surfaces.',
    glossary: {
      term: 'Conduite de plomb & fonte',
      definition: 'Airtight pipe sections joined with lead solder and rubber gaskets, with minimum curve radii of 5 to 20 meters to prevent jamming.'
    },
    svgHighlight: 'tube-transit',
    capsuleX: 330
  },
  {
    stage: 5,
    title: 'Arrival Cushioning & Messenger Delivery',
    short: 'Arrival & Delivery',
    summary: 'At the destination bureau, an air cushion brake decelerated the capsule, triggering a mechanical chime for final messenger dispatch.',
    detail: 'Upon reaching the receiving apparatus (Appareil récepteur), the rapidly moving capsule compressed trapped air in a deceleration chamber (piston amortisseur). This pneumatic cushion absorbed kinetic energy smoothly. The carrier dropped into a brass wire basket, tripped a mechanical gong, and the telegraphist extracted the paper note for immediate dispatch by a courier on a bicycle.',
    glossary: {
      term: 'Piston amortisseur (Air Cushion Brake)',
      definition: 'Deceleration valve that traps a pocket of air ahead of the capsule to bring it to a safe halt from 40 km/h in under half a meter.'
    },
    svgHighlight: 'arrival-basket',
    capsuleX: 475
  }
];

const STAGE_INTERVAL_MS = 3500;

export default function MechanismSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [playbackState, setPlaybackState] = useState('idle');
  const timerRef = useRef(null);
  const deadlineRef = useRef(null);
  const remainingRef = useRef(STAGE_INTERVAL_MS);
  const activeStageRef = useRef(0);
  const playbackStateRef = useRef('idle');

  const isPlaying = playbackState === 'playing';
  const isPaused = playbackState === 'paused';
  const isCompleted = playbackState === 'completed';

  const updatePlaybackState = (nextState) => {
    playbackStateRef.current = nextState;
    setPlaybackState(nextState);
  };

  const updateActiveStage = (nextStage) => {
    activeStageRef.current = nextStage;
    setActiveStage(nextStage);
  };

  // One stage timer is active at a time. Remaining time is retained on pause.
  useEffect(() => {
    if (playbackState !== 'playing') return undefined;

    const delay = remainingRef.current;
    deadlineRef.current = Date.now() + delay;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      deadlineRef.current = null;
      remainingRef.current = STAGE_INTERVAL_MS;

      const currentStage = activeStageRef.current;
      if (currentStage < mechanismStages.length - 1) {
        updateActiveStage(currentStage + 1);
      } else {
        updatePlaybackState('completed');
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playbackState, activeStage]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Handle Play / Pause / Resume / Replay
  const handleTogglePlay = () => {
    if (playbackStateRef.current === 'playing') {
      if (deadlineRef.current !== null) {
        remainingRef.current = Math.max(0, deadlineRef.current - Date.now());
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      deadlineRef.current = null;
      updatePlaybackState('paused');
      return;
    }

    if (playbackStateRef.current === 'completed') {
      updateActiveStage(0);
      remainingRef.current = STAGE_INTERVAL_MS;
    } else if (playbackStateRef.current !== 'paused') {
      remainingRef.current = STAGE_INTERVAL_MS;
    }
    updatePlaybackState('playing');
  };

  // Handle Manual Stage Selection
  const handleSelectStage = (index) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    deadlineRef.current = null;
    remainingRef.current = STAGE_INTERVAL_MS;
    updatePlaybackState('idle');
    updateActiveStage(index);
  };

  // Handle Reset to Stage 1
  const handleReset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    deadlineRef.current = null;
    remainingRef.current = STAGE_INTERVAL_MS;
    updatePlaybackState('idle');
    updateActiveStage(0);
  };

  const current = mechanismStages[activeStage];

  return (
    <section className="archive-section theme-forest" id="mechanism">
      <div className="section-header">
        <span className="archive-seal kicker-forest">
          <Wind size={12} />
          TECHNICAL CUTAWAY · FIVE STAGES OF PROPULSION
        </span>
        <h2>
          Five Physical Stages. <em>One Subterranean Cycle.</em>
        </h2>
        <p className="section-lede">
          A pneumatic dispatch was not a simple pipe push: it was a synchronized sequence of airtight valving, pressure gradients, and kinetic energy dissipation. Explore each phase below.
        </p>
      </div>

      {/* Stage Tab Buttons */}
      <div className="stage-steps-nav" role="tablist" aria-label="Pneumatic cycle stages">
        {mechanismStages.map((stg, idx) => {
          const isActive = activeStage === idx;
          const isCurrentlyPlaying = isActive && isPlaying;
          return (
            <button
              key={stg.stage}
              role="tab"
              aria-selected={isActive}
              className={`stage-tab-btn ${isActive ? 'active' : ''} ${isCurrentlyPlaying ? 'playing' : ''}`}
              onClick={() => handleSelectStage(idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span className="stage-num-badge">STAGE 0{stg.stage}</span>
                {isCurrentlyPlaying && <span className="pulse-dot-indicator" title="Autoplaying this stage" />}
              </div>
              <span className="stage-tab-title">{stg.short}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Cutaway Grid */}
      <div className="mechanism-cutaway-container">
        {/* Left: Cutaway Diagram Visual */}
        <div className="cutaway-diagram-canvas">
          <div className="cutaway-visual-frame">
            <svg
              className="apparatus-svg"
              viewBox="0 0 600 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Engineering cutaway drawing of Paris pneumatic dispatch apparatus"
            >
              <defs>
                {/* Metallic gradients */}
                <linearGradient id="tubeGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#255444" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#0B1C17" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#1E4739" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="brassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F2D296" />
                  <stop offset="50%" stopColor="#B79A60" />
                  <stop offset="100%" stopColor="#6C5325" />
                </linearGradient>
              </defs>

              {/* Outer Tube Shell with Glass Gradient */}
              <rect x="20" y="90" width="560" height="60" rx="30" fill="url(#tubeGlass)" stroke="#B79A60" strokeWidth="2" />
              <line x1="20" y1="120" x2="580" y2="120" stroke="#B79A60" strokeOpacity="0.18" strokeDasharray="6 6" />

              {/* Breech Loading Door (Stage 2 Component) */}
              <g opacity={current.svgHighlight === 'breech-door' ? '1' : '0.4'} style={{ transition: 'opacity 0.4s ease' }}>
                <rect x="40" y="55" width="70" height="130" rx="6" fill="#1C4035" stroke={current.svgHighlight === 'breech-door' ? '#D2B881' : '#B79A60'} strokeWidth={current.svgHighlight === 'breech-door' ? '2.5' : '1.5'} />
                <circle cx="75" cy="80" r="14" fill="#B79A60" stroke="#F2D296" strokeWidth="1.5" />
                <rect x="71" y="74" width="8" height="12" rx="2" fill="#171A18" />
                <text x="75" y="152" fill="#F2E8D5" fontSize="9" fontFamily="DM Mono" textAnchor="middle" fontWeight="bold">BREECH</text>
                <text x="75" y="165" fill="#A9B8A6" fontSize="7.5" fontFamily="DM Mono" textAnchor="middle">AIRLOCK</text>
              </g>

              {/* Pressure Valve Manifold (Stage 3 Component) */}
              <g opacity={current.svgHighlight === 'valves-pressure' ? '1' : '0.4'} style={{ transition: 'opacity 0.4s ease' }}>
                <path d="M210 25 L210 90 M250 25 L250 90 M200 25 L260 25" stroke={current.svgHighlight === 'valves-pressure' ? '#E0673C' : '#C85D36'} strokeWidth="3" />
                {/* Pressure injection arrow */}
                <polygon points="230,60 240,78 220,78" fill={current.svgHighlight === 'valves-pressure' ? '#E0673C' : '#C85D36'} />
                <circle cx="230" cy="25" r="12" fill="#102D26" stroke="#C85D36" strokeWidth="2" />
                <text x="230" y="28" fill="#F2E8D5" fontSize="8" fontFamily="DM Mono" textAnchor="middle" fontWeight="bold">ΔP</text>
                <text x="230" y="16" fill="#E0673C" fontSize="9" fontFamily="DM Mono" textAnchor="middle" fontWeight="bold">AIR INJECTION</text>
              </g>

              {/* Animated Capsule inside Tube */}
              <g
                style={{
                  transform: `translate(${current.capsuleX}px, 100px)`,
                  transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                {/* Front Buffer */}
                <rect x="0" y="4" width="12" height="32" rx="6" fill="#6B4120" stroke="#B79A60" strokeWidth="1" />
                {/* Main Brass Cylinder */}
                <rect x="12" y="6" width="60" height="28" fill="url(#brassGrad)" stroke="#D2B881" strokeWidth="1" />
                <text x="42" y="24" fill="#171A18" fontSize="8.5" fontFamily="DM Mono" fontWeight="bold" textAnchor="middle">PNEU·42</text>
                {/* Leather Expansion Flange */}
                <rect x="72" y="3" width="10" height="34" rx="4" fill="#884A22" stroke="#D2B881" strokeWidth="1" />
              </g>

              {/* Airflow streamlines during Stage 3 (Pressure) and Stage 4 (Transit) */}
              {(activeStage === 2 || activeStage === 3) && (
                <g stroke="#C85D36" strokeWidth="2" strokeDasharray="8 6" opacity="0.9">
                  <line x1="180" y1="108" x2="310" y2="108" />
                  <line x1="160" y1="120" x2="330" y2="120" />
                  <line x1="180" y1="132" x2="310" y2="132" />
                </g>
              )}

              {/* Speed indication tag during Transit (Stage 4) */}
              {activeStage === 3 && (
                <g transform="translate(320, 68)">
                  <rect x="-40" y="-14" width="80" height="20" rx="3" fill="#102D26" stroke="#C85D36" strokeWidth="1.5" />
                  <text x="0" y="0" fill="#E0673C" fontSize="8.5" fontFamily="DM Mono" fontWeight="bold" textAnchor="middle">11.8 m/s (42 km/h)</text>
                </g>
              )}

              {/* Arrival Buffer & Deceleration Basket (Stage 5 Component) */}
              <g opacity={current.svgHighlight === 'arrival-basket' ? '1' : '0.4'} style={{ transition: 'opacity 0.4s ease' }}>
                <rect x="490" y="65" width="75" height="110" rx="6" fill="#1C4035" stroke={current.svgHighlight === 'arrival-basket' ? '#8cba9b' : '#B79A60'} strokeWidth={current.svgHighlight === 'arrival-basket' ? '2.5' : '1.5'} />
                <path d="M510 125 C520 145 545 145 555 125" stroke="#B79A60" strokeWidth="2.5" fill="none" />
                {activeStage === 4 && (
                  <circle cx="532" cy="100" r="14" fill="#8cba9b" fillOpacity="0.25" stroke="#8cba9b" strokeWidth="1.5" />
                )}
                <text x="528" y="152" fill="#F2E8D5" fontSize="9" fontFamily="DM Mono" textAnchor="middle" fontWeight="bold">BUFFER</text>
                <text x="528" y="165" fill="#8cba9b" fontSize="7.5" fontFamily="DM Mono" textAnchor="middle">AIR CUSHION</text>
              </g>
            </svg>
          </div>

          {/* Persistent Playback Bar */}
          <div className="stage-playback-bar">
            <div className="playback-controls">
              <button
                className={`play-pause-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause Auto Play sequence' : isPaused ? 'Resume Auto Play sequence' : isCompleted ? 'Replay completed sequence' : 'Start Auto Play sequence'}
              >
                {isPlaying ? (
                  <>
                    <Pause size={14} />
                    <span>Pause</span>
                  </>
                ) : isPaused ? (
                  <>
                    <RotateCcw size={14} />
                    <span>Resume</span>
                  </>
                ) : isCompleted ? (
                  <>
                    <RotateCcw size={14} />
                    <span>Replay Dispatch</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>Auto Play</span>
                  </>
                )}
              </button>

              <button
                className="btn-outline-brass"
                style={{ padding: '6px 12px' }}
                onClick={handleReset}
                title="Reset sequence to Stage 1"
                aria-label="Reset sequence to Stage 1"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Visual Status Indicator Pill */}
            {isPlaying ? (
              <span className="status-pill playing">
                <span className="pulse-dot-indicator" />
                <span>AUTOPLAYING · STAGE {activeStage + 1} OF 5</span>
              </span>
            ) : isCompleted ? (
              <span className="status-pill completed">
                <CheckCircle2 size={12} />
                <span>SEQUENCE COMPLETE</span>
              </span>
            ) : isPaused ? (
              <span className="status-pill paused">
                <span>❚❚ PAUSED AT STAGE {activeStage + 1}</span>
              </span>
            ) : (
              <span className="status-pill ready">
                <span>{activeStage === 0 ? 'READY · STAGE 1 OF 5' : `READY · STAGE ${activeStage + 1} OF 5`}</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Technical Explanation Pane */}
        <div className="stage-explanation-pane">
          <div className="stage-badge-row">
            <span className="archive-seal">
              STAGE 0{current.stage} / 05
            </span>
            <span className="technical-stamp" style={{ color: '#C85D36', fontWeight: 'bold' }}>
              PHYSICAL DISPATCH CYCLE
            </span>
          </div>

          <h3>{current.title}</h3>
          <p>{current.summary}</p>
          <p style={{ opacity: 0.85, fontSize: '13px' }}>{current.detail}</p>

          {/* Technical Glossary Box */}
          <div className="technical-glossary-box">
            <div className="glossary-term">{current.glossary.term}</div>
            <div className="glossary-desc">{current.glossary.definition}</div>
          </div>

          {/* Completion Banner when finished */}
          {isCompleted && (
            <div className="completion-banner">
              <div>
                <strong>DISPATCH SEQUENCE COMPLETED</strong>
                <p>The pneumatic carrier has completed all five stages and safely docked in the destination receiving basket.</p>
              </div>
              <button
                className="play-pause-btn"
                onClick={handleTogglePlay}
                style={{ fontSize: '10px', padding: '6px 12px', flexShrink: 0 }}
              >
                <RotateCcw size={12} />
                <span>Replay</span>
              </button>
            </div>
          )}

          {/* Archival Apparatus Illustration */}
          <div className="apparatus-photo-box">
            <img
              src="/images/pneumatic-apparatus.png"
              alt="Appareil de la poste pneumatique, Louis Figuier 1868"
            />
            <div className="apparatus-photo-caption">
              <strong>HISTORICAL CUTAWAY · 1868</strong>
              Authentic dispatch & arrival apparatus (Louis Figuier, <em>Les Merveilles de la science</em>). Note the pneumatic cushion valves at top and bottom.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
