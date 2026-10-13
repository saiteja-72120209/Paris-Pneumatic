import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';

import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import MechanismSection from './components/MechanismSection';
import NetworkSection from './components/NetworkSection';
import EngineeringLab from './components/EngineeringLab';
import ComparisonSection from './components/ComparisonSection';
import LegacySection from './components/LegacySection';
import ReferencesSection from './components/ReferencesSection';
import PresentationToolbar from './components/PresentationToolbar';
import SlideOverviewModal, { SLIDE_METADATA } from './components/SlideOverviewModal';
import ShortcutsModal from './components/ShortcutsModal';

import './styles.css';

const TOTAL_SLIDES = 8;
const SLIDE_IDS = ['hero', 'timeline', 'mechanism', 'network', 'lab', 'comparison', 'legacy', 'references'];

function App() {
  const [isPresentation, setIsPresentation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [apiStatus, setApiStatus] = useState('connecting');

  // Modal dialog states
  const [showOverview, setShowOverview] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Refs
  const presentationContainerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Sync document body overflow with presentation mode
  useEffect(() => {
    if (isPresentation) {
      document.body.classList.add('in-presentation-mode');
    } else {
      document.body.classList.remove('in-presentation-mode');
    }
    return () => {
      document.body.classList.remove('in-presentation-mode');
    };
  }, [isPresentation]);

  // Fullscreen API event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(active);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Expose global navigation for TopNav
  useEffect(() => {
    window.__goToSlide = (idx) => {
      if (idx >= 0 && idx < TOTAL_SLIDES) {
        setCurrentSlide(idx);
        setActiveSection(SLIDE_IDS[idx]);
      }
    };
  }, []);

  // Fetch timeline data from Node backend
  useEffect(() => {
    fetch('/api/timeline')
      .then(res => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then(data => {
        setTimelineData(data);
        setApiStatus('connected');
      })
      .catch(() => {
        setApiStatus('fallback');
      });
  }, []);

  // Native Fullscreen API trigger
  const toggleFullscreen = async () => {
    try {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      if (!isCurrentlyFullscreen) {
        if (!isPresentation) setIsPresentation(true);
        const target = presentationContainerRef.current || document.documentElement;
        if (target.requestFullscreen) {
          await target.requestFullscreen();
        } else if (target.webkitRequestFullscreen) {
          await target.webkitRequestFullscreen();
        } else if (target.msRequestFullscreen) {
          await target.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Native Fullscreen API error (fallback CSS presentation remains active):', err);
    }
  };

  // Exit presentation mode completely
  const handleExitPresentation = async () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (e) {
        // Ignored
      }
    }
    setIsPresentation(false);
    setShowOverview(false);
    setShowShortcuts(false);

    // Scroll to current section in normal website mode
    setTimeout(() => {
      const targetId = SLIDE_IDS[currentSlide];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in forms/inputs
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      // If an overlay modal is open, Escape closes it
      if (showOverview || showShortcuts) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setShowOverview(false);
          setShowShortcuts(false);
          return;
        }
      }

      // Toggle Presentation Mode via 'P'
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        if (isPresentation) {
          handleExitPresentation();
        } else {
          setIsPresentation(true);
        }
        return;
      }

      // If not in presentation mode, don't hijack arrows
      if (!isPresentation) return;

      // Fullscreen shortcut 'F'
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Shortcuts help dialog '?'
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }

      // Slide navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, TOTAL_SLIDES - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(TOTAL_SLIDES - 1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleExitPresentation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentation, showOverview, showShortcuts, currentSlide]);

  // Wheel gesture handling in presentation mode
  useEffect(() => {
    if (!isPresentation) return;

    let wheelTimeout;
    const handleWheel = (e) => {
      if (showOverview || showShortcuts) return;
      if (Math.abs(e.deltaY) < 30) return;
      if (wheelTimeout) return;

      if (e.deltaY > 30) {
        setCurrentSlide(prev => Math.min(prev + 1, TOTAL_SLIDES - 1));
      } else if (e.deltaY < -30) {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }

      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 500);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [isPresentation, showOverview, showShortcuts]);

  // Touch swipe handling for presentation mode
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!isPresentation || showOverview || showShortcuts || touchStartX.current === null) return;
      const diffX = e.changedTouches[0].clientX - touchStartX.current;
      const diffY = e.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX < 0) {
          setCurrentSlide(prev => Math.min(prev + 1, TOTAL_SLIDES - 1));
        } else {
          setCurrentSlide(prev => Math.max(prev - 1, 0));
        }
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPresentation, showOverview, showShortcuts]);

  // Scroll tracking in normal editorial website mode
  useEffect(() => {
    if (isPresentation) return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    SLIDE_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isPresentation]);

  // Navigation helpers
  const goToNextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, TOTAL_SLIDES - 1));
  const goToPrevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const handleExplore = (e) => {
    if (isPresentation) {
      e?.preventDefault();
      setCurrentSlide(2); // Jump to Mechanism (Slide 3)
    }
  };

  const handleLaunchDeck = () => {
    setIsPresentation(true);
    setCurrentSlide(0);
  };

  const handleReplay = (e) => {
    if (isPresentation) {
      e?.preventDefault();
      setCurrentSlide(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpLab = (e) => {
    if (isPresentation) {
      e?.preventDefault();
      setCurrentSlide(4); // Jump to Lab (Slide 5)
    } else {
      const labEl = document.getElementById('lab');
      if (labEl) labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={presentationContainerRef}
      className={`app-container ${isPresentation ? 'presentation-fullscreen-root' : ''}`}
    >
      {/* Scroll Progress Bar (Only visible in normal website mode) */}
      {!isPresentation && (
        <div
          className="scroll-progress-line"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      )}

      {/* Primary Navigation Topbar (Hidden in presentation mode for edge-to-edge experience) */}
      {!isPresentation && (
        <TopNav
          isPresentation={isPresentation}
          setIsPresentation={setIsPresentation}
          activeSection={activeSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          currentSlide={currentSlide}
          totalSlides={TOTAL_SLIDES}
        />
      )}

      {/* Master Slides / Content Wrapper */}
      <motion.div
        className={`slides-wrapper ${isPresentation ? 'presentation' : ''}`}
        animate={isPresentation ? { x: `-${currentSlide * 100}vw` } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        {/* Exhibit 01: Hero Introduction */}
        <HeroSection
          onExplore={handleExplore}
          onLaunchDeck={handleLaunchDeck}
        />

        {/* Exhibit 02: Historical Timeline */}
        <TimelineSection
          timelineData={timelineData}
          apiStatus={apiStatus}
        />

        {/* Exhibit 03: How the System Worked (Subterranean Cycle) */}
        <MechanismSection />

        {/* Exhibit 04: Network Architecture */}
        <NetworkSection />

        {/* Exhibit 05: Engineering Physics Laboratory */}
        <EngineeringLab />

        {/* Exhibit 06: Advantages & Limitations */}
        <ComparisonSection />

        {/* Exhibit 07: Modern Legacy & Descendants */}
        <LegacySection />

        {/* Exhibit 08: Bibliography, References & Finale */}
        <ReferencesSection
          onReplay={handleReplay}
          onJumpLab={handleJumpLab}
          onToggleDeck={() => setIsPresentation(prev => !prev)}
          isPresentation={isPresentation}
        />
      </motion.div>

      {/* Floating Keynote Presentation Toolbar */}
      {isPresentation && (
        <PresentationToolbar
          currentSlide={currentSlide}
          totalSlides={TOTAL_SLIDES}
          onPrev={goToPrevSlide}
          onNext={goToNextSlide}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          onExitPresentation={handleExitPresentation}
          onOpenOverview={() => setShowOverview(true)}
          onOpenShortcuts={() => setShowShortcuts(true)}
        />
      )}

      {/* Slide Overview Grid Modal */}
      <SlideOverviewModal
        isOpen={showOverview}
        onClose={() => setShowOverview(false)}
        currentSlide={currentSlide}
        onSelectSlide={(idx) => setCurrentSlide(idx)}
      />

      {/* Keyboard Shortcuts Dialog */}
      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);