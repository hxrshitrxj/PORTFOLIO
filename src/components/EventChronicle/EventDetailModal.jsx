import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Tag, 
  Award, 
  CheckCircle2, 
  Users, 
  Lightbulb, 
  ShieldAlert, 
  Target, 
  BookOpen, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Layers,
  Flame,
  HeartHandshake
} from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import './EventDetailModal.css';

/**
 * EventDetailModal
 * 
 * Editorial Magazine Case Study Presentation for individual events.
 * Features:
 * - Complete case study breakdown
 * - Dynamic tabbed or sectioned presentation
 * - Integrated Image Lightbox
 * - Previous & Next event navigation
 * - Keyboard listeners (Escape, Left/Right navigation)
 * - Strict non-fabrication of statistics
 */
export function EventDetailModal({ 
  event, 
  allEvents = [], 
  isOpen = false, 
  onClose, 
  onSelectEvent 
}) {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'coordination' | 'challenges' | 'gallery'
  const [lightboxState, setLightboxState] = useState({ isOpen: false, index: 0 });

  // Find index of current event for prev/next cycling
  const currentIndex = allEvents.findIndex((e) => e.id === event?.id);

  const handlePrev = useCallback(() => {
    if (!allEvents || allEvents.length <= 1) return;
    const newIndex = (currentIndex - 1 + allEvents.length) % allEvents.length;
    onSelectEvent(allEvents[newIndex]);
    setActiveTab('overview');
  }, [allEvents, currentIndex, onSelectEvent]);

  const handleNext = useCallback(() => {
    if (!allEvents || allEvents.length <= 1) return;
    const newIndex = (currentIndex + 1) % allEvents.length;
    onSelectEvent(allEvents[newIndex]);
    setActiveTab('overview');
  }, [allEvents, currentIndex, onSelectEvent]);

  // Lock page scrolling and handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (lightboxState.isOpen) return; // Lightbox takes precedence

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && e.altKey) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, lightboxState.isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !event) return null;

  const roleTypeBadgeClass = 
    event.type === 'Organized' ? 'type-organized' :
    event.type === 'Volunteered' ? 'type-volunteered' : 'type-participated';

  const roleTypeIcon = 
    event.type === 'Organized' ? Flame :
    event.type === 'Volunteered' ? HeartHandshake : Sparkles;

  const RoleIcon = roleTypeIcon;

  return (
    <>
      <div 
        className="chronicle-modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${event.title} Case Study`}
      >
        <div 
          className="chronicle-modal-container"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Bar */}
          <header className="chronicle-modal-header">
            <div className="header-meta-left">
              <span className={`event-role-pill ${roleTypeBadgeClass}`}>
                <RoleIcon size={12} />
                <span>{event.type.toUpperCase()}</span>
              </span>
              <span className="header-category-label">{event.category}</span>
            </div>

            <div className="header-nav-actions">
              {allEvents.length > 1 && (
                <div className="event-cycle-btns">
                  <button 
                    type="button" 
                    className="cycle-btn"
                    onClick={handlePrev}
                    aria-label="Previous Event"
                    title="Previous Event (Alt+Left)"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="cycle-indicator">
                    {currentIndex + 1} / {allEvents.length}
                  </span>
                  <button 
                    type="button" 
                    className="cycle-btn"
                    onClick={handleNext}
                    aria-label="Next Event"
                    title="Next Event (Alt+Right)"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <button 
                type="button" 
                className="chronicle-close-btn"
                onClick={onClose}
                aria-label="Close Case Study"
                title="Close (ESC)"
              >
                <X size={18} />
                <span className="close-badge">ESC</span>
              </button>
            </div>
          </header>

          {/* Dedicated Scrollable Content Area */}
          <div className="chronicle-modal-scroll-area">
            {/* Hero Header Presentation */}
            <div className="chronicle-hero-banner">
            <div className="hero-banner-image-wrap">
              <img 
                src={event.coverImage} 
                alt={event.title}
                className="hero-banner-cover"
                onClick={() => setLightboxState({ isOpen: true, index: 0 })}
                title="Click to view full image in lightbox"
              />
              <div className="hero-banner-gradient-overlay" />
              <button 
                type="button"
                className="banner-zoom-btn"
                onClick={() => setLightboxState({ isOpen: true, index: 0 })}
                aria-label="Zoom Cover Image"
              >
                <Maximize2 size={16} />
                <span>VIEW FULL COVER</span>
              </button>
            </div>

            <div className="hero-banner-content">
              <div className="banner-context-tags">
                <span className="context-item">
                  <Calendar size={14} className="ctx-icon" />
                  <span>{event.date}</span>
                </span>
                <span className="ctx-sep">•</span>
                <span className="context-item">
                  <MapPin size={14} className="ctx-icon" />
                  <span>{event.location}</span>
                </span>
                <span className="ctx-sep">•</span>
                <span className="context-item">
                  <Tag size={14} className="ctx-icon" />
                  <span>{event.year}</span>
                </span>
              </div>

              <h2 className="banner-event-title">{event.title}</h2>
              <p className="banner-role-line">
                <strong>ROLE:</strong> {event.role}
              </p>
              {event.tagline && (
                <p className="banner-tagline">“{event.tagline}”</p>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="chronicle-tab-nav" role="tablist">
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'overview' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('overview')}
              role="tab"
              aria-selected={activeTab === 'overview'}
            >
              <span>CASE OVERVIEW</span>
            </button>

            <button 
              type="button"
              className={`tab-btn ${activeTab === 'coordination' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('coordination')}
              role="tab"
              aria-selected={activeTab === 'coordination'}
            >
              <span>COORDINATION &amp; TEAMWORK</span>
            </button>

            <button 
              type="button"
              className={`tab-btn ${activeTab === 'challenges' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('challenges')}
              role="tab"
              aria-selected={activeTab === 'challenges'}
            >
              <span>CHALLENGES &amp; OUTCOMES</span>
            </button>

            <button 
              type="button"
              className={`tab-btn ${activeTab === 'gallery' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('gallery')}
              role="tab"
              aria-selected={activeTab === 'gallery'}
            >
              <span>MEDIA &amp; BEHIND-THE-SCENES</span>
              {event.gallery?.length > 0 && (
                <span className="tab-count-badge">{event.gallery.length}</span>
              )}
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="chronicle-modal-body">

            {/* TAB 1: OVERVIEW & RESPONSIBILITIES */}
            {activeTab === 'overview' && (
              <div className="tab-pane-fade">
                {/* Event Overview Section */}
                <section className="case-study-section">
                  <div className="section-title-row">
                    <BookOpen size={18} className="sec-icon" />
                    <h3>Event Overview</h3>
                  </div>
                  <p className="case-body-text">{event.overview || event.shortDescription}</p>
                </section>

                {/* Role & Responsibilities */}
                {event.responsibilities && event.responsibilities.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Target size={18} className="sec-icon" />
                      <h3>My Role &amp; Core Responsibilities</h3>
                    </div>
                    <div className="responsibilities-grid">
                      {event.responsibilities.map((resp, i) => (
                        <div key={i} className="resp-card">
                          <CheckCircle2 size={16} className="resp-check-icon" />
                          <p>{resp}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills Developed */}
                {event.skillsDeveloped && event.skillsDeveloped.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Sparkles size={18} className="sec-icon" />
                      <h3>Core Competencies &amp; Skills Developed</h3>
                    </div>
                    <div className="skills-pill-wrap">
                      {event.skillsDeveloped.map((skill, i) => (
                        <span key={i} className="skill-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* TAB 2: PLANNING, COORDINATION & TEAMWORK */}
            {activeTab === 'coordination' && (
              <div className="tab-pane-fade">
                {/* Planning & Coordination */}
                {event.coordination && event.coordination.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Layers size={18} className="sec-icon" />
                      <h3>Planning &amp; Coordination Framework</h3>
                    </div>
                    <div className="coordination-timeline-cards">
                      {event.coordination.map((coord, i) => (
                        <div key={i} className="coord-step-card">
                          <div className="coord-num-badge">0{i + 1}</div>
                          <div className="coord-body">
                            <p>{coord}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Team Collaboration */}
                {event.teamCollaboration && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Users size={18} className="sec-icon" />
                      <h3>Team Collaboration &amp; Cross-Functional Synergy</h3>
                    </div>
                    <div className="teamwork-highlight-card">
                      <p>{event.teamCollaboration}</p>
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* TAB 3: CHALLENGES, OUTCOMES & LESSONS */}
            {activeTab === 'challenges' && (
              <div className="tab-pane-fade">
                {/* Challenges & Solutions */}
                {event.challenges && event.challenges.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <ShieldAlert size={18} className="sec-icon" />
                      <h3>Challenges Faced &amp; Practical Solutions</h3>
                    </div>
                    <div className="challenges-stack">
                      {event.challenges.map((item, i) => (
                        <div key={i} className="challenge-solution-card">
                          <div className="challenge-side">
                            <span className="cs-label cs-label-challenge">CHALLENGE {i + 1}</span>
                            <p className="cs-text">{item.challenge}</p>
                          </div>
                          <div className="solution-side">
                            <span className="cs-label cs-label-solution">ACTION / SOLUTION</span>
                            <p className="cs-text">{item.solution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Outcomes & Achievements */}
                {event.outcomes && event.outcomes.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Award size={18} className="sec-icon" />
                      <h3>Achievements &amp; Tangible Outcomes</h3>
                    </div>
                    <div className="outcomes-list">
                      {event.outcomes.map((outcome, i) => (
                        <div key={i} className="outcome-item">
                          <CheckCircle2 size={16} className="outcome-icon" />
                          <p>{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Lessons Learned */}
                {event.lessonsLearned && event.lessonsLearned.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Lightbulb size={18} className="sec-icon" />
                      <h3>Lessons Learned &amp; Organizational Wisdom</h3>
                    </div>
                    <div className="lessons-grid">
                      {event.lessonsLearned.map((lesson, i) => (
                        <div key={i} className="lesson-card">
                          <p>“{lesson}”</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* TAB 4: PHOTO GALLERY & BEHIND-THE-SCENES */}
            {activeTab === 'gallery' && (
              <div className="tab-pane-fade">
                {/* Photo Gallery Grid */}
                <section className="case-study-section">
                  <div className="section-title-row">
                    <Sparkles size={18} className="sec-icon" />
                    <h3>Photo &amp; Visual Gallery</h3>
                  </div>
                  {event.gallery && event.gallery.length > 0 ? (
                    <div className="gallery-photographic-grid">
                      {event.gallery.map((img, i) => (
                        <div 
                          key={i} 
                          className="gallery-photo-card"
                          onClick={() => setLightboxState({ isOpen: true, index: i })}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setLightboxState({ isOpen: true, index: i });
                            }
                          }}
                          aria-label={`View ${img.caption || 'image'} in lightbox`}
                        >
                          <div className="photo-card-media">
                            <img src={img.url} alt={img.caption || 'Event photograph'} loading="lazy" />
                            <div className="photo-card-hover-overlay">
                              <Maximize2 size={20} className="hover-zoom-icon" />
                              <span>INSPECT FULL VIEW</span>
                            </div>
                            {img.tag && <span className="photo-tag-badge">{img.tag}</span>}
                          </div>
                          {img.caption && (
                            <div className="photo-card-caption">
                              <p>{img.caption}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-subtext">No visual media currently added for this event.</p>
                  )}
                </section>

                {/* Behind-The-Scenes Section */}
                {event.behindTheScenes && event.behindTheScenes.length > 0 && (
                  <section className="case-study-section">
                    <div className="section-title-row">
                      <Layers size={18} className="sec-icon" />
                      <h3>Behind-The-Scenes Field Notes</h3>
                    </div>
                    <div className="bts-notes-grid">
                      {event.behindTheScenes.map((bts, i) => (
                        <div key={i} className="bts-note-card">
                          <h4 className="bts-title">📋 {bts.title}</h4>
                          <p className="bts-desc">{bts.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

          </div>
          </div>

          {/* Modal Footer Bar - Firmly Anchored Outside Scroll Area */}
          <footer className="chronicle-modal-footer">
            <div className="footer-left-info">
              <span className="footer-event-name">{event.title}</span>
              <span className="footer-dot-sep">•</span>
              <span className="footer-location-name">{event.location}</span>
            </div>
            <div className="footer-right-actions">
              <button 
                type="button" 
                className="modal-footer-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close Case Study Experience"
              >
                CLOSE EXPERIENCE
              </button>
            </div>
          </footer>

        </div>
      </div>

      {/* Lightbox Triggered from Gallery or Cover */}
      <ImageLightbox
        images={event.gallery || [{ url: event.coverImage, caption: event.title, tag: event.category }]}
        currentIndex={lightboxState.index}
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState({ isOpen: false, index: 0 })}
        onNavigate={(newIdx) => setLightboxState((prev) => ({ ...prev, index: newIdx }))}
      />
    </>
  );
}

export default EventDetailModal;

