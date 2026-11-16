/**
 * ============================================================================
 * THE EVENT CHRONICLE — CENTRALIZED DATA SOURCE
 * ============================================================================
 * 
 * Single source of truth for "The Event Chronicle".
 * All event statistics, category filters, timeline nodes, cards, case studies,
 * and media galleries are dynamically computed from this data array.
 * 
 * ----------------------------------------------------------------------------
 * HOW TO ADD A NEW EVENT:
 * ----------------------------------------------------------------------------
 * 1. Duplicate one of the event objects below.
 * 2. Assign a unique `id` (e.g., 'tech-symposium-2026').
 * 3. Set `type` to one of: 'Organized' | 'Volunteered' | 'Participated'.
 * 4. Fill in the event details (title, date, location, category, role, etc.).
 * 5. Add cover and gallery images (placed in `/public/events/` or external URLs).
 * 6. Set `featured: true` on whichever event you want highlighted as the cover story.
 * 
 * Note: Keep all statistics and records authentic. Avoid fabricating dates,
 * attendance numbers, or fictitious awards.
 * ============================================================================
 */

export const INITIAL_EVENTS = [
  {
    id: 'annual-sports-event',
    title: "Annual Sports Event",
    shortTitle: "Annual Sports Meet",
    role: "Sports Meet Organizer & Field Coordinator",
    type: "Organized", // 'Organized' | 'Volunteered' | 'Participated'
    category: "Athletics & Sports",
    location: "School",
    date: "School Athletic Term",
    year: "2024",
    featured: true,
    tagline: "Track-side organization, field logistics, and heat scheduling for the school sports meet.",
    shortDescription: "Coordinated track and field heats, participant staging, field management, and logistics for the school annual sports meet.",
    overview: "The Annual Sports Event brought together students across track and field competitions. Role involved managing on-ground logistics, organizing athlete heats, marking lanes, coordinating with sports teachers, and supporting timely score compilation.",
    responsibilities: [
      "Assisted in track and field event layout, lane alignment, and equipment distribution",
      "Organized participant staging pens and called up athletic heats to the tracks",
      "Coordinated with sports officials, teachers, timekeepers, and peer marshals",
      "Maintained logistical support for sports gear, batons, and result slips"
    ],
    coordination: [
      "Synchronized schedule progression between sprint heats and field jump/throw events",
      "Established dedicated staging enclosures to keep competitors ready before race starts",
      "Managed spectator boundaries to maintain track safety and clear race lanes"
    ],
    challenges: [
      {
        challenge: "Rapid turnaround required between consecutive sprint heats and relays",
        solution: "Implemented an advance queueing pen where the next heat was pre-checked before the ongoing race finished."
      },
      {
        challenge: "Accurate communication of track results from judges to the central desk",
        solution: "Established a dedicated runner protocol to transmit verified result sheets immediately."
      }
    ],
    teamCollaboration: "Collaborated with the physical education faculty, student marshals, and peer volunteers to ensure safety, fair play, and high athletic spirit.",
    outcomes: [
      "Smooth execution of multi-category track and field events throughout the day",
      "Maintained zero race delays with disciplined heat staging and athlete readiness",
      "Created an organized, high-energy sporting atmosphere for competitors and spectators"
    ],
    lessonsLearned: [
      "Large-scale sports meets require rapid situational assessment and assertive field communication",
      "Clear role boundaries between track coordinators and field marshals prevent overlap"
    ],
    skillsDeveloped: [
      "Field Coordination",
      "Athletic Logistics",
      "Crowd Safety",
      "Rapid Problem Solving",
      "On-ground Leadership"
    ],
    coverImage: "/events/sports-event-cover.svg",
    gallery: [
      {
        url: "/events/sports-event-cover.svg",
        caption: "Track and field stadium setup on event morning",
        tag: "STADIUM & TRACK"
      },
      {
        url: "/events/sports-event-lineup.svg",
        caption: "Athlete heat staging and starting block coordination",
        tag: "HEAT MARSHALING"
      },
      {
        url: "/events/sports-event-podium.svg",
        caption: "Result collation and track-side medal ceremony setup",
        tag: "PODIUM & RESULTS"
      }
    ],
    behindTheScenes: [
      {
        title: "Track Preparation & Marking",
        desc: "Early morning lane marking and finish-line tape alignment with the sports department."
      },
      {
        title: "Marshaling Briefing",
        desc: "Conducted quick safety and protocol briefings with student marshals before races commenced."
      }
    ]
  },
  {
    id: 'teachers-day-celebration',
    title: "Teacher's Day Celebration",
    shortTitle: "Teacher's Day",
    role: "Lead Event Organizer",
    type: "Organized", // 'Organized' | 'Volunteered' | 'Participated'
    category: "Academic & Cultural",
    location: "School",
    date: "School Academic Term",
    year: "2024",
    featured: false,
    tagline: "Honoring educators through student-led coordination and ceremonial stage management.",
    shortDescription: "Organized the school Teacher's Day Celebration, coordinating cultural performances, stage scheduling, speaker transitions, and student participation to honor our educators.",
    overview: "The Teacher's Day Celebration was an event organized at school to express gratitude and honor the teaching faculty. As an organizer, the responsibility encompassed curating the event itinerary, coordinating with student performers across grades, managing stage equipment, and ensuring an orderly, heartfelt celebration.",
    responsibilities: [
      "Planned and structured the event agenda and stage proceedings",
      "Coordinated student rehearsals, speaking segments, and performance cues",
      "Liaised between school faculty, student volunteers, and technical support",
      "Managed backstage transitions and ensured on-time program delivery"
    ],
    coordination: [
      "Structured stage timeline for speeches, musical tributes, and token presentations",
      "Assigned duties among student coordinators for welcoming, stage decor, and audiovisual management",
      "Conducted run-through checks to minimize backstage pauses and technical delays"
    ],
    challenges: [
      {
        challenge: "Managing live performance time constraints to prevent program overrun",
        solution: "Established backstage visual time-cues and built subtle buffer intervals between segments."
      },
      {
        challenge: "Balancing rehearsal schedules with ongoing academic commitments",
        solution: "Organized focused micro-rehearsals during designated activity slots to respect class time."
      }
    ],
    teamCollaboration: "Worked in close collaboration with peer student organizers, faculty advisors, and junior volunteers, fostering a dependable and supportive team environment.",
    outcomes: [
      "Successfully delivered the celebration program seamlessly according to schedule",
      "Received sincere appreciation from teachers and peers for an orderly and dignified ceremony",
      "Strengthened school-wide student coordination and stage management capabilities"
    ],
    lessonsLearned: [
      "Buffer intervals and backstage discipline are essential for smooth live ceremonies",
      "Empathetic communication with performers helps ease pre-stage anxiety"
    ],
    skillsDeveloped: [
      "Event Planning",
      "Stage Management",
      "Team Coordination",
      "Public Address Support",
      "Time Discipline"
    ],
    coverImage: "/events/teachers-day-cover.svg",
    gallery: [
      {
        url: "/events/teachers-day-cover.svg",
        caption: "Main stage ceremonial setup and welcome proceedings",
        tag: "STAGE & CEREMONY"
      },
      {
        url: "/events/teachers-day-rehearsal.svg",
        caption: "Backstage cue management and technical coordination",
        tag: "BACKSTAGE LOGISTICS"
      },
      {
        url: "/events/teachers-day-presentation.svg",
        caption: "Student musical and speech tributes honoring teachers",
        tag: "CULTURAL TRIBUTES"
      }
    ],
    behindTheScenes: [
      {
        title: "Cue Cards & Running Order",
        desc: "Prepared detailed running sheets for the emcees, lighting operators, and backstage runners."
      },
      {
        title: "Audiovisual Rehearsals",
        desc: "Conducted sound checks for acoustic balance and microphone clarity prior to guest seating."
      }
    ]
  },
  {
    id: 'bosco-fest',
    title: "Bosco Fest",
    shortTitle: "Bosco Fest",
    role: "Student Volunteer & Contingent Guide",
    type: "Volunteered", // 'Organized' | 'Volunteered' | 'Participated'
    category: "Inter-School Competition",
    location: "Siliguri",
    date: "Competition Term",
    year: "2024",
    featured: false,
    tagline: "Volunteering at Siliguri's premier inter-school competition to support delegates and stage workflows.",
    shortDescription: "Volunteered at Bosco Fest in Siliguri, providing hospitality, stage support, and inter-school participant navigation during the inter-school competition.",
    overview: "Bosco Fest is an inter-school competitive festival held in Siliguri, hosting student contingents across multiple creative, cultural, and intellectual events. Contributed as an active event volunteer, helping visiting schools navigate venues, assisting stage crews, and supporting competition administration.",
    responsibilities: [
      "Welcomed and escorted visiting school contingents to designated holding halls",
      "Assisted stage managers with competition equipment, materials, and prop handovers",
      "Supported help desks by answering attendee queries and sharing schedule updates",
      "Assisted judging panels with score sheet delivery and protocol support"
    ],
    coordination: [
      "Facilitated smooth pedestrian transit between multiple simultaneous competition halls",
      "Ensured stage setups were cleared and reconfigured rapidly between competing schools",
      "Coordinated with core event organizing committees on participant headcounts"
    ],
    challenges: [
      {
        challenge: "Helping numerous external school teams navigate an expansive, unfamiliar campus",
        solution: "Stationed volunteer guides at key corridors and maintained active liaison between halls."
      },
      {
        challenge: "Tight turnover windows between diverse performing arts and debate rounds",
        solution: "Pre-positioned stage equipment in sequential order of appearance backstage."
      }
    ],
    teamCollaboration: "Worked in harmony with cross-school volunteer teams and organizing committees in Siliguri, building strong camaraderie across student groups.",
    outcomes: [
      "Assisted visiting inter-school delegates with prompt navigation and welcoming support",
      "Maintained seamless stage transitions across back-to-back competitive events",
      "Earned valuable firsthand insight into large-scale inter-institutional event execution"
    ],
    lessonsLearned: [
      "Volunteering at regional competitions demands patience, empathy, and active listening",
      "Proactive assistance and welcoming demeanor set the tone for visiting institutions"
    ],
    skillsDeveloped: [
      "Inter-Institutional Hospitality",
      "Multi-Hall Coordination",
      "Backstage Assistance",
      "Active Listening",
      "Team Adaptability"
    ],
    coverImage: "/events/bosco-fest-cover.svg",
    gallery: [
      {
        url: "/events/bosco-fest-cover.svg",
        caption: "Main auditorium during inter-school competitive proceedings",
        tag: "MAIN VENUE"
      },
      {
        url: "/events/bosco-fest-delegates.svg",
        caption: "Visiting school registration and help desk assistance",
        tag: "REGISTRATION & INFO"
      },
      {
        url: "/events/bosco-fest-stage.svg",
        caption: "Stage handover and backstage equipment preparation",
        tag: "STAGE MANAGEMENT"
      }
    ],
    behindTheScenes: [
      {
        title: "Campus Wayfinding Setup",
        desc: "Coordinated clear directional signage and registration kiosks for visiting delegates."
      },
      {
        title: "Backstage Prop Logistics",
        desc: "Inspected audio plugs, mic stands, and lecterns prior to debate and music events."
      }
    ]
  }
];

// ============================================================================
// DYNAMIC COMPUTATION & HELPER UTILITIES
// ============================================================================

export function getAllEvents() {
  return INITIAL_EVENTS;
}

export function getFeaturedEvent() {
  return INITIAL_EVENTS.find((e) => e.featured) || INITIAL_EVENTS[0];
}

export function getEventStats() {
  const total = INITIAL_EVENTS.length;
  const organized = INITIAL_EVENTS.filter((e) => e.type === 'Organized').length;
  const volunteered = INITIAL_EVENTS.filter((e) => e.type === 'Volunteered').length;
  const participated = INITIAL_EVENTS.filter((e) => e.type === 'Participated').length;

  return {
    total,
    organized,
    volunteered,
    participated,
  };
}

export function getCategories() {
  const set = new Set(INITIAL_EVENTS.map((e) => e.category).filter(Boolean));
  return Array.from(set);
}

export function getYears() {
  const set = new Set(INITIAL_EVENTS.map((e) => e.year).filter(Boolean));
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}

export function getEventById(id) {
  return INITIAL_EVENTS.find((e) => e.id === id) || null;
}
