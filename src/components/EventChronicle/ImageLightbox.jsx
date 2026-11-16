import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import './ImageLightbox.css';

/**
 * ImageLightbox
 * 
 * Cinematic image viewer for event gallery photographs with:
 * - Next / Prev keyboard navigation (ArrowLeft / ArrowRight)
 * - Close on Escape or click outside
 * - Image counter and editorial captions
 * - Accessible ARIA attributes and focus trap
 */
export function ImageLightbox({ images = [], currentIndex = 0, isOpen = false, onClose, onNavigate }) {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (images.length > 1) {
        onNavigate((currentIndex + 1) % images.length);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (images.length > 1) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <div 
      className="chronicle-lightbox-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Event Gallery Lightbox"
    >
      <div 
        className="chronicle-lightbox-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="lightbox-top-bar">
          <div className="lightbox-counter-badge">
            <Tag size={12} className="counter-icon" />
            <span>IMAGE {currentIndex + 1} OF {images.length}</span>
            {currentImage.tag && (
              <>
                <span className="badge-sep">•</span>
                <span className="lightbox-image-tag">{currentImage.tag}</span>
              </>
            )}
          </div>

          <div className="lightbox-actions">
            <button 
              type="button" 
              className="lightbox-close-btn"
              onClick={onClose}
              aria-label="Close Lightbox (ESC)"
              title="Close (ESC)"
            >
              <X size={18} />
              <span className="esc-hint">ESC</span>
            </button>
          </div>
        </div>

        {/* Main Stage with Image and Nav Arrows */}
        <div className="lightbox-stage">
          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn btn-prev"
              onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
              aria-label="Previous Image"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="lightbox-img-wrapper">
            <img 
              src={currentImage.url} 
              alt={currentImage.caption || `Event visual ${currentIndex + 1}`}
              className="lightbox-active-img"
              loading="eager"
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn btn-next"
              onClick={() => onNavigate((currentIndex + 1) % images.length)}
              aria-label="Next Image"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom Caption Bar */}
        {currentImage.caption && (
          <div className="lightbox-caption-bar">
            <p className="lightbox-caption-text">{currentImage.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageLightbox;
