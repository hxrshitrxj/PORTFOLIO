import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Flame, 
  HeartHandshake, 
  ArrowUpRight, 
  Maximize2 
} from 'lucide-react';
import { 
  INITIAL_EVENTS, 
  getFeaturedEvent 
} from '../../data/eventsData';
import EventDetailModal from './EventDetailModal';
import './EventChronicle.css';

/**
 * EventChronicle
 * 
 * Clean, high-impact Editorial Magazine & Event Archive presentation.
 * Features:
 * - Distinctive editorial typography and cinematic header
 * - Editorial Story Selector (switching active case study seamlessly)
 * - Large photographic heroic showcase
 * - In-depth case study presentation modal with multimedia lightbox
 */
export function EventChronicle({ isOverlay = false }) {
  // Selected event currently displayed in the heroic showcase
  const [activeEvent, setActiveEvent] = useState(() => getFeaturedEvent() || INITIAL_EVENTS[0]);

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event, e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSelectedEvent(event || activeEvent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const getRoleIcon = (type) => {
    if (type === 'Organized') return <Flame size={12} />;
    if (type === 'Volunteered') return <HeartHandshake size={12} />;
    return <Sparkles size={12} />;
  };

  return (
    <section 
      className={`event-chronicle-section ${isOverlay ? 'is-overlay-mode' : ''}`} 
      id={isOverlay ? undefined : "event-chronicle"}
    >
      {/* Ambient Radial Background Glows */}
      <div className="chronicle-ambient-glow glow-amber" />
      <div className="chronicle-ambient-glow glow-cyan" />
      <div className="chronicle-grid-lines" />

      <div className="chronicle-container">

        {/* 1. Header & Editorial Introduction */}
        <header className="chronicle-header-wrap">
          <div className="section-meta-tag">
            <span className="live-status-dot" />
            <span>ARCHIVE // LEADERSHIP, VOLUNTEERING &amp; MANAGEMENT</span>
          </div>

          <h2 className="chronicle-main-heading">The Event Chronicle</h2>
          
          <p className="chronicle-subtitle">
            Every event has a story. Here's mine.
          </p>

          <p className="chronicle-intro-desc">
            Organizing an event is an engineering discipline in itself: orchestrating people, timing, stagecraft,
            and contingencies to build unforgettable real-world experiences. From student celebrations and track meets
            to regional inter-school competitions, explore my hands-on journey in event coordination, stage management,
            and dedicated community volunteering.
          </p>
        </header>

        {/* 2. Editorial Archive Story Selector */}
        <div className="chronicle-story-selector-bar" role="tablist" aria-label="Select Event Story">
          <span className="story-selector-caption">ARCHIVE STORIES:</span>
          <div className="story-pills-row">
            {INITIAL_EVENTS.map((evt) => {
              const isSelected = activeEvent?.id === evt.id;
              return (
                <button
                  key={evt.id}
                  type="button"
                  className={`story-selector-pill ${isSelected ? 'active-story' : ''}`}
                  onClick={() => setActiveEvent(evt)}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <span className="pill-role-icon">{getRoleIcon(evt.type)}</span>
                  <span className="pill-title">{evt.title}</span>
                  <span className="pill-type-label">[{evt.type}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Heroic Photographic Showcase */}
        {activeEvent && (
          <div className="chronicle-featured-wrapper">
            <div className="featured-meta-label">
              <Sparkles size={14} className="sparkle-gold" />
              <span>CASE STUDY SPOTLIGHT // {activeEvent.type.toUpperCase()}</span>
            </div>

            <div 
              className="featured-heroic-card"
              onClick={(e) => handleOpenModal(activeEvent, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenModal(activeEvent, e);
                }
              }}
              aria-label={`Inspect event: ${activeEvent.title}`}
            >
              <div className="featured-media-col">
                <img 
                  src={activeEvent.coverImage} 
                  alt={activeEvent.title} 
                  className="featured-cover-img"
                  loading="eager"
                />
                <div className="featured-media-overlay" />
                <span className="featured-inspect-badge">
                  <Maximize2 size={14} />
                  <span>INSPECT FULL CASE STUDY</span>
                </span>
              </div>

              <div className="featured-details-col">
                <div className="featured-pill-row">
                  <span className="featured-role-pill">
                    {getRoleIcon(activeEvent.type)}
                    <span>{activeEvent.type.toUpperCase()}</span>
                  </span>
                  <span className="featured-category-pill">{activeEvent.category}</span>
                </div>

                <div className="featured-context-row">
                  <span className="ctx-item">
                    <Calendar size={13} className="ctx-icon" />
                    <span>{activeEvent.date}</span>
                  </span>
                  <span className="ctx-sep">•</span>
                  <span className="ctx-item">
                    <MapPin size={13} className="ctx-icon" />
                    <span>{activeEvent.location}</span>
                  </span>
                </div>

                <h3 className="featured-title">{activeEvent.title}</h3>
                
                <p className="featured-role">
                  <span className="role-tag">ROLE:</span> {activeEvent.role}
                </p>

                <p className="featured-desc">{activeEvent.shortDescription}</p>

                {activeEvent.skillsDeveloped && (
                  <div className="featured-skills-wrap">
                    {activeEvent.skillsDeveloped.map((skill, i) => (
                      <span key={i} className="featured-skill-chip">{skill}</span>
                    ))}
                  </div>
                )}

                <div className="featured-action-row">
                  <button 
                    type="button" 
                    className="featured-cta-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(activeEvent, e);
                    }}
                  >
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowUpRight size={16} className="btn-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Case Study Modal with cycle navigation & lightbox */}
      <EventDetailModal
        event={selectedEvent}
        allEvents={INITIAL_EVENTS}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectEvent={(newEvt) => {
          setSelectedEvent(newEvt);
          setActiveEvent(newEvt);
        }}
      />
    </section>
  );
}

export default EventChronicle;
