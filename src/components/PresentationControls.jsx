import React from 'react';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

export default function PresentationControls({
  currentSlide,
  totalSlides,
  onPrev,
  onNext
}) {
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <>
      {/* Slide Progress Center Dock */}
      <div className="hud-progress-dock" aria-label="Slide progress bar">
        <span className="hud-slide-counter">
          EXHIBIT {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
        <div className="hud-progress-track">
          <div
            className="hud-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Slide Navigation Arrow Buttons */}
      <div className="deck-hud-controls" aria-label="Slide navigation arrows">
        <button
          className="hud-arrow-btn"
          onClick={onPrev}
          disabled={currentSlide === 0}
          aria-label="Previous exhibit slide (Left Arrow)"
          title="Previous slide (← / Up)"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          className="hud-arrow-btn"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Next exhibit slide (Right Arrow / Space)"
          title="Next slide (→ / Space / Down)"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </>
  );
}
