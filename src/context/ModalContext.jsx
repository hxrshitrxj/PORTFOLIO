import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'project' | 'contact' | 'archive'
    data: null,
    origin: { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400 },
  });

  const openModal = useCallback((type, data, eventOrElement) => {
    let origin = {
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    };

    if (eventOrElement) {
      const el = eventOrElement.currentTarget || eventOrElement;
      if (el && typeof el.getBoundingClientRect === 'function') {
        const rect = el.getBoundingClientRect();
        origin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };

        // Add tactile click compression class
        el.classList.add('cinematic-btn-clicked');
        setTimeout(() => el.classList.remove('cinematic-btn-clicked'), 160);

        // Add subtle radial click ripple
        if (eventOrElement.clientX && eventOrElement.clientY) {
          const ripple = document.createElement('span');
          ripple.className = 'btn-click-ripple';
          ripple.style.left = `${eventOrElement.clientX - rect.left}px`;
          ripple.style.top = `${eventOrElement.clientY - rect.top}px`;
          el.appendChild(ripple);
          setTimeout(() => ripple.remove(), 400);
        }
      }
    }

    // Delay slightly (70ms) to allow button scale compression and ripple feedback to register
    setTimeout(() => {
      setModalState({
        isOpen: true,
        type,
        data,
        origin,
      });
    }, 70);
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}

export default ModalContext;
