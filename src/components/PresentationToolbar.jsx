import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Maximize,
  Minimize,
  LayoutGrid,
  HelpCircle,
  X,
  ScrollText
} from 'lucide-react';

export default function PresentationToolbar({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  isFullscreen,
  onToggleFullscreen,
  onExitPresentation,
  onOpenOverview,
  onOpenShortcuts
}) {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerRef = useRef(null);

  // Inactivity auto-fade timer (3.5 seconds)
  const resetHideTimer = () => {
    setIsVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3500);
  };

  useEffect(() => {
    resetHideTimer();

    const handleMouseMove = () => {
      resetHideTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div
      className={`keynote-toolbar-container ${isVisible ? 'visible' : 'faded'}`}
      onMouseEnter={() => {
        setIsVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }}
      onMouseLeave={resetHideTimer}
      role="toolbar"
      aria-label="Presentation navigation toolbar"
    >
      <div className="keynote-toolbar-dock">
        {/* Slide Counter & Mini Progress */}
        <div className="toolbar-counter-group" title={`Exhibit ${currentSlide + 1} of ${totalSlides}`}>
          <span className="toolbar-slide-number">
            {String(currentSlide + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(totalSlides).padStart(2, '0')}
          </span>
          <div className="toolbar-progress-track">
            <div className="toolbar-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* Prev / Next Slide Arrows */}
        <div className="toolbar-button-group">
          <button
            className="toolbar-btn"
            onClick={onPrev}
            disabled={currentSlide === 0}
            aria-label="Previous slide (Left Arrow)"
            title="Previous Slide (← / Up)"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            className="toolbar-btn"
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            aria-label="Next slide (Right Arrow / Space)"
            title="Next Slide (→ / Space / Down)"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Interactive Feature Modals & Toggles */}
        <div className="toolbar-button-group">
          {/* Slide Overview Grid Toggle */}
          <button
            className="toolbar-btn"
            onClick={onOpenOverview}
            aria-label="Open slide grid overview"
            title="Slide Overview Grid"
          >
            <LayoutGrid size={16} />
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            className="toolbar-btn"
            onClick={onOpenShortcuts}
            aria-label="Show keyboard shortcuts"
            title="Keyboard Shortcuts (?)"
          >
            <HelpCircle size={16} />
          </button>

          {/* Native Fullscreen Toggle */}
          <button
            className="toolbar-btn"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'Exit native fullscreen (F / Escape)' : 'Enter native fullscreen (F)'}
            title={isFullscreen ? 'Exit Fullscreen (F / Esc)' : 'Enter Fullscreen (F)'}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Exit Presentation Mode Control */}
        <button
          className="toolbar-btn exit-btn"
          onClick={onExitPresentation}
          aria-label="Exit presentation mode and restore normal scroll website (Escape / P)"
          title="Exit Presentation Mode (P / Esc)"
        >
          <X size={16} />
          <span className="exit-btn-label">Exit</span>
        </button>
      </div>
    </div>
  );
}
