import React from 'react';
import { BookOpen, ExternalLink, RotateCcw, Wrench, MonitorPlay, Wind, MapPin, Award } from 'lucide-react';
import CopyrightAttribution from './CopyrightAttribution';

const verifiedSources = [
  {
    org: 'Comité pour l\'Histoire de La Poste',
    title: 'La poste pneumatique à Paris (1866–1984) : Le réseau avant l\'heure',
    desc: 'Official comprehensive history of the Parisian pneumatic network, detailing infrastructure growth, operating personnel, and post-war modernization.',
    url: 'https://comitehistoire.laposte.fr/publication/le-reseau-avant-lheure-la-poste-pneumatique-a-paris-1866-1984/'
  },
  {
    org: 'Bibliothèque nationale de France (Gallica)',
    title: 'Louis Figuier, "Les Merveilles de la science", Tome V (1868)',
    desc: 'Seminal 19th-century technical treatise featuring detailed woodcut engravings, cutaways of the Charpentier launching machine, and initial trial statistics.',
    url: 'https://gallica.bnf.fr/ark:/12148/bpt6k24660v'
  },
  {
    org: 'Musée de La Poste Paris',
    title: 'Collections historiques & Matériel Fortin-Hermann',
    desc: 'Physical archival artifacts including brass curseur carriers, leather buffer gaskets, telegrams, and preserved station receiving racks.',
    url: 'https://www.museedelaposte.fr'
  },
  {
    org: 'Smithsonian Institution Libraries',
    title: 'The Atmospheric Railway & Urban Pneumatic Systems',
    desc: 'Historical review comparing the Parisian network with pneumatic installations in London, Berlin, Vienna, and New York City.',
    url: 'https://www.si.edu'
  }
];

export default function ReferencesSection({ onReplay, onJumpLab, onToggleDeck, isPresentation }) {
  return (
    <section className="archive-section theme-parchment" id="references">
      <div className="section-header">
        <span className="archive-seal kicker-parchment">
          <BookOpen size={12} />
          BIBLIOGRAPHY & HISTORICAL SOURCES
        </span>
        <h2>
          Verified Sources & <em>Historical Bibliography.</em>
        </h2>
        <p className="section-lede">
          All dates, technical dimensions, pressure ranges, and historical facts presented in this archive are corroborated by French primary postal archives and contemporary civil engineering records.
        </p>
      </div>

      {/* Sources Grid */}
      <div className="references-library-grid">
        {verifiedSources.map((src, idx) => (
          <article className="citation-card" key={idx}>
            <span className="citation-org-badge">{src.org}</span>
            <h3 className="citation-title">{src.title}</h3>
            <p className="citation-desc">{src.desc}</p>
            <a
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="citation-link"
              title="Visit primary archival source"
            >
              <span>Examine Historical Record</span>
              <ExternalLink size={13} />
            </a>
          </article>
        ))}
      </div>

      {/* Grand Finale Showcase Box */}
      <div className="finale-showcase-box">
        <div className="finale-capsule-anim">
          <Wind size={32} />
        </div>

        <div className="archive-seal kicker-forest" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
          THE CONCLUDING MESSAGE
        </div>

        <h2 className="finale-quote">
          “A Simple Principle. A Remarkable Engineering Legacy.”
        </h2>

        <p className="finale-body-text">
          Before algorithms routed packets through invisible radio waves, Parisian engineers mastered the atmosphere. By capturing pressure differentials inside a dark labyrinth of iron pipes beneath the City of Light, they turned air itself into the swiftest messenger on earth.
        </p>

        <div className="finale-actions">
          <button className="btn-primary" onClick={onReplay}>
            <RotateCcw size={14} />
            <span>Replay Experience</span>
          </button>

          <button className="btn-outline-brass" onClick={onJumpLab}>
            <Wrench size={14} />
            <span>Revisit Engineering Lab</span>
          </button>

          <button className="btn-outline-brass" onClick={onToggleDeck}>
            <MonitorPlay size={14} />
            <span>{isPresentation ? 'Switch to Editorial Scroll' : 'Launch Keynote Presentation'}</span>
          </button>
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="archive-footer-strip" style={{ margin: '60px -6vw -100px -6vw' }}>
        <div className="footer-stamp">
          <Wind size={14} />
          <span>PARIS PNEUMATIC POST · 1866 — 1984 · LIVING ENGINEERING ARCHIVE</span>
        </div>
        <div>
          <span>VERIFIED HISTORICAL RESEARCH · REVOLUTIONARY URBAN TRANSIT</span>
        </div>
        <div>
          <a href="#hero" onClick={onReplay} style={{ color: '#D4B982' }}>
            BACK TO TOP ↑
          </a>
        </div>
        <CopyrightAttribution compact={isPresentation} />
      </footer>
    </section>
  );
}
