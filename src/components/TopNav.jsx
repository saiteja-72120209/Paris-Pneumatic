import React from 'react';
import { Wind, Menu, X, MonitorPlay, ScrollText } from 'lucide-react';

export default function TopNav({
  isPresentation,
  setIsPresentation,
  activeSection,
  menuOpen,
  setMenuOpen,
  currentSlide,
  totalSlides
}) {
  const navItems = [
    { label: 'Introduction', href: '#hero' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Mechanism', href: '#mechanism' },
    { label: 'Network', href: '#network' },
    { label: 'Engineering Lab', href: '#lab' },
    { label: 'Appraisal', href: '#comparison' },
    { label: 'Modern Legacy', href: '#legacy' },
    { label: 'Archive', href: '#references' }
  ];

  const handleNavClick = (e, href) => {
    setMenuOpen(false);
    if (isPresentation) {
      // In presentation mode, jump to corresponding slide index
      const slideIndex = navItems.findIndex(item => item.href === href);
      if (slideIndex !== -1 && window.__goToSlide) {
        window.__goToSlide(slideIndex);
      }
    }
  };

  return (
    <>
      <header className="archive-topbar">
        <a href="#hero" className="topbar-brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <div className="brand-monogram">
            <Wind size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">POSTE PNEUMATIQUE</span>
            <span className="brand-meta">PARIS · ARCHIVE 1866–1984</span>
          </div>
        </a>

        <nav className="topbar-nav" aria-label="Main Navigation">
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${(isPresentation ? currentSlide === idx : activeSection === item.href.slice(1)) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="deck-toggle-btn"
            onClick={() => setIsPresentation(!isPresentation)}
            title="Toggle between Presentation Keynote and Editorial Archive"
          >
            {isPresentation ? (
              <>
                <ScrollText size={14} />
                <span>Scroll Mode</span>
              </>
            ) : (
              <>
                <MonitorPlay size={14} />
                <span>Keynote Deck</span>
              </>
            )}
            <span className="key-hint">P</span>
          </button>

          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${(isPresentation ? currentSlide === idx : activeSection === item.href.slice(1)) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
