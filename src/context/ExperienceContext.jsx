import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ExperienceContext = createContext(null);

export const EXPERIENCES = {
  WORKS: 'WORKS',
  LAB: 'LAB',
  JOURNEY: 'JOURNEY',
  ABOUT: 'ABOUT',
};

export function ExperienceProvider({ children }) {
  const [activeExperience, setActiveExperience] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState('IDLE'); // 'IDLE' | 'ENTERING' | 'ACTIVE' | 'EXITING' | 'SWITCHING'
  const [originRect, setOriginRect] = useState(null);
  const [targetSwitch, setTargetSwitch] = useState(null);

  // Open or switch to an experience
  const openExperience = useCallback((mode, eventOrElement) => {
    if (!mode || !EXPERIENCES[mode]) return;

    let rect = null;
    if (eventOrElement) {
      const el = eventOrElement.currentTarget || eventOrElement;
      if (el && typeof el.getBoundingClientRect === 'function') {
        const domRect = el.getBoundingClientRect();
        rect = {
          left: domRect.left,
          top: domRect.top,
          width: domRect.width,
          height: domRect.height,
          x: domRect.left + domRect.width / 2,
          y: domRect.top + domRect.height / 2,
        };
      }
    }

    if (rect) {
      setOriginRect(rect);
    }

    // Direct mode switch if already inside an experience
    if (activeExperience && activeExperience !== mode) {
      setTransitionPhase('SWITCHING');
      setTargetSwitch(mode);
      
      // Allow current mode to run rapid collapse before next mode enters
      setTimeout(() => {
        setActiveExperience(mode);
        setTransitionPhase('ENTERING');
        setTargetSwitch(null);
        setTimeout(() => {
          setTransitionPhase('ACTIVE');
        }, 500);
      }, 350);
      return;
    }

    if (activeExperience === mode) {
      return; // Already active
    }

    // First-time entry from main page
    setActiveExperience(mode);
    setTransitionPhase('ENTERING');
    document.body.style.overflow = 'hidden';

    // Settle into active state after entrance sequence
    setTimeout(() => {
      setTransitionPhase('ACTIVE');
    }, 600);
  }, [activeExperience]);

  // Close experience and return to main interface with reverse transition
  const closeExperience = useCallback(() => {
    if (!activeExperience) return;

    setTransitionPhase('EXITING');

    // Reverse duration
    setTimeout(() => {
      setActiveExperience(null);
      setTransitionPhase('IDLE');
      setOriginRect(null);
      setTargetSwitch(null);
      document.body.style.overflow = '';
    }, 450);
  }, [activeExperience]);

  const switchExperience = useCallback((newMode) => {
    openExperience(newMode, null);
  }, [openExperience]);

  // Global ESC key listener to exit experience
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeExperience) {
        // If an inner modal/card is open, allow it to handle ESC first
        if (document.querySelector('.expandable-overlay-backdrop, .cinematic-modal-overlay')) {
          return;
        }
        closeExperience();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeExperience, closeExperience]);

  return (
    <ExperienceContext.Provider
      value={{
        activeExperience,
        transitionPhase,
        originRect,
        targetSwitch,
        openExperience,
        closeExperience,
        switchExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return ctx;
}

export default ExperienceContext;
