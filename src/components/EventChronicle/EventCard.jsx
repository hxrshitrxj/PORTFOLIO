import React from 'react';
import { Calendar, MapPin, ArrowUpRight, Flame, HeartHandshake, Sparkles } from 'lucide-react';
import './EventCard.css';

/**
 * EventCard
 * 
 * Individual editorial card for an event.
 * Displays:
 * - Cover photograph with aspect ratio and subtle hover zoom
 * - Role badge (Organized / Volunteered / Participated)
 * - Category pill
 * - Event title
 * - Date and location with Lucide icons
 * - Short description
 * - "View Experience" interactive button
 */
export function EventCard({ event, onOpenModal }) {
  if (!event) return null;

  const roleTypeBadgeClass = 
    event.type === 'Organized' ? 'type-organized' :
    event.type === 'Volunteered' ? 'type-volunteered' : 'type-participated';

  const roleTypeIcon = 
    event.type === 'Organized' ? Flame :
    event.type === 'Volunteered' ? HeartHandshake : Sparkles;

  const RoleIcon = roleTypeIcon;

  return (
    <article 
      className="chronicle-event-card"
      onClick={(e) => onOpenModal(event, e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(event, e);
        }
      }}
      aria-label={`View experience details for ${event.title}`}
    >
      {/* Cover Image Wrap */}
      <div className="card-media-wrap">
        <img 
          src={event.coverImage} 
          alt={event.title}
          className="card-cover-img"
          loading="lazy"
        />
        <div className="card-media-gradient" />

        {/* Top Badges */}
        <div className="card-top-badges">
          <span className={`card-role-badge ${roleTypeBadgeClass}`}>
            <RoleIcon size={11} />
            <span>{event.type.toUpperCase()}</span>
          </span>
          <span className="card-category-badge">{event.category}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="card-content-body">
        {/* Date & Location */}
        <div className="card-meta-row">
          <span className="card-meta-item">
            <Calendar size={13} className="meta-icon" />
            <span>{event.date}</span>
          </span>
          <span className="meta-sep">•</span>
          <span className="card-meta-item">
            <MapPin size={13} className="meta-icon" />
            <span>{event.location}</span>
          </span>
        </div>

        {/* Event Title */}
        <h3 className="card-event-title">{event.title}</h3>

        {/* Role Subtitle */}
        <p className="card-role-title">
          <span className="role-prefix">ROLE:</span> {event.role}
        </p>

        {/* Short Description */}
        <p className="card-event-desc">{event.shortDescription}</p>

        {/* Skills Tag Pills */}
        {event.skillsDeveloped && event.skillsDeveloped.length > 0 && (
          <div className="card-skills-row">
            {event.skillsDeveloped.slice(0, 3).map((skill, i) => (
              <span key={i} className="card-skill-tag">{skill}</span>
            ))}
            {event.skillsDeveloped.length > 3 && (
              <span className="card-skill-more">+{event.skillsDeveloped.length - 3}</span>
            )}
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="card-action-footer">
          <button 
            type="button" 
            className="card-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(event, e);
            }}
            aria-label={`View experience for ${event.title}`}
          >
            <span>VIEW EXPERIENCE</span>
            <ArrowUpRight size={15} className="view-btn-arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;

