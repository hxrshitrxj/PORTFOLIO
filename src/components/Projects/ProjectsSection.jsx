import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Cpu, 
  Radio, 
  Shield, 
  Zap, 
  Sparkles, 
  Eye, 
  ArrowUpRight, 
  CheckCircle2, 
  Play, 
  Terminal, 
  Activity,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import './ProjectsSection.css';

export const LIFI_PROJECT = {
  id: '01',
  title: 'Li-Fi (Light Fidelity) Data Transmission System',
  shortTitle: 'Li-Fi VLC SYSTEM',
  category: 'HARDWARE ENGINEERING / EMBEDDED SYSTEMS',
  year: '2024',
  achievement: '🏆 2nd Position, Class 11 Science Exhibition',
  role: 'Hardware Developer & Programmer',
  color: '#ff8c00',
  secondaryColor: '#00e5ff',
  images: [
    {
      url: '/projects/lifi-receiver-box.png',
      caption: 'Working Li-Fi Receiver Unit',
      sub: 'Light-shielded cardboard enclosure with photosensitive detector receiving "HELLO WORLD!" via optical pulses',
      tag: 'OPTICAL RECEIVER ENCLOSURE'
    },
    {
      url: '/projects/lifi-circuit.png',
      caption: 'Arduino UNO & Breadboard Circuitry',
      sub: 'Central processing unit with jumper wiring, signal conditioning, and 16x2 I2C LCD character display',
      tag: 'CONTROLLER & MODULATION BUS'
    },
    {
      url: '/projects/lifi-certificate.jpg',
      caption: 'Official Certificate of Appreciation',
      sub: '2nd Position, Class 11 Science Exhibition, Modi Public School, Siliguri (11.01.2025)',
      tag: 'OFFICIAL ACHIEVEMENT PROOF'
    }
  ],
  objective:
    'Engineered a working Visible Light Communication (VLC) prototype to transmit alphanumeric data wirelessly using light waves instead of traditional radio frequencies. This project demonstrated a secure, high-speed alternative to standard Wi-Fi, specifically designed for environments sensitive to electromagnetic interference. The successful demonstration of this prototype earned 2nd place at the Class 11 Science Exhibition.',
  hardware: [
    {
      title: 'Microcontroller',
      spec: 'Arduino UNO (ATmega328P)',
      role: 'Central Processing Unit',
      desc: 'Utilized as the central processing unit for data encoding, optical modulation timing, and signal generation.',
      icon: Cpu,
      color: '#ff8800'
    },
    {
      title: 'Display Unit',
      spec: '16x2 Character LCD + I2C Module',
      role: 'Real-time Output Interface',
      desc: 'Equipped with a 4-wire I2C interface (VCC, GND, SDA, SCL) to minimize pin utilization and display received ASCII strings instantly.',
      icon: Terminal,
      color: '#00e5ff'
    },
    {
      title: 'Circuitry & Enclosure',
      spec: 'Solderless Prototyping & Shielded Box',
      role: 'Optical Noise Isolation',
      desc: 'Solderless breadboard prototyping with assorted jumper wires and a custom-built, light-shielded cardboard enclosure to house the receiver logic from ambient light interference.',
      icon: Shield,
      color: '#00ff88'
    }
  ],
  phases: [
    {
      step: '01',
      title: 'Digital Encoding',
      badge: 'ASCII ➔ BINARY',
      desc: 'The system captures an input string (e.g., "HELLO WORLD!") and the Arduino UNO translates the alphanumeric characters into ASCII binary code.',
      signal: '01001000 01000101 01001100 01001100 01001111'
    },
    {
      step: '02',
      title: 'Optical Modulation',
      badge: 'HIGH-SPEED PULSING',
      desc: 'A light source (LED/Laser) pulses rapidly, toggling on and off at speeds imperceptible to the human eye to represent binary \'1s\' and \'0s\'.',
      signal: '▲ HIGH (1) / ▼ LOW (0) kHz Modulation'
    },
    {
      step: '03',
      title: 'Photodetection & Decoding',
      badge: 'OPTICAL ➔ VOLTAGE',
      desc: 'A photosensitive receiver detects these microscopic fluctuations in light intensity, converting the optical pulses back into electrical voltage variations.',
      signal: 'V_out = f(Light Intensity) Analog Waveform'
    },
    {
      step: '04',
      title: 'Data Reconstruction',
      badge: 'I2C LCD STREAM',
      desc: 'The receiving microcontroller processes the timing of the analog signals, reconstructs the original ASCII text, and routes it via the I2C protocol to be successfully displayed on the LCD screen.',
      signal: '16x2 LCD: "DATA RECEIVED HELLO WORLD!"'
    }
  ],
  applications: [
    {
      title: 'Localized Security',
      subtitle: 'ZERO WALL LEAKAGE',
      desc: 'Demonstrated how light-based data transfer prevents network interception through walls, offering inherently secure localized networks impenetrable from outside the room.',
      icon: Shield,
      highlight: 'Military & Defense Grade Privacy'
    },
    {
      title: 'EMI-Safe Networking',
      subtitle: 'ZERO RF INTERFERENCE',
      desc: 'Showcased a viable communication method for hospitals and aviation, where traditional radio frequencies pose severe interference risks to critical medical equipment and cockpit avionics.',
      icon: Radio,
      highlight: 'Hospitals, ICU & Aviation Certified'
    },
    {
      title: 'Bandwidth Expansion',
      subtitle: 'VISIBLE SPECTRUM UTILIZATION',
      desc: 'Highlighted Li-Fi\'s potential to relieve radio spectrum congestion by utilizing the massive, unlicensed bandwidth of the visible light spectrum (10,000x wider than RF).',
      icon: Zap,
      highlight: 'Unlicensed Terahertz Spectrum'
    }
  ],
  tags: [
    'Visible Light Communication (VLC)',
    'Arduino UNO',
    'Embedded C++',
    'I2C Protocol',
    'Hardware Prototyping',
    'Photodetector Optics',
    'Class 11 Science Exhibition Silver'
  ]
};

export function ProjectsSection() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [simText, setSimText] = useState('HELLO WORLD!');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmittedChars, setTransmittedChars] = useState('HELLO WORLD!');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview, hardware, protocol, applications
  const { openModal } = useModal();
  const simTimeoutRef = useRef(null);

  // Convert text to binary string representation
  const textToBinary = (text) => {
    return text
      .split('')
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const handleRunTransmission = (customMessage) => {
    const message = customMessage || simText || 'HELLO WORLD!';
    setIsTransmitting(true);
    setTransmittedChars('');
    setActivePhaseIndex(1); // Encoding

    if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current);

    // Step through the phases
    simTimeoutRef.current = setTimeout(() => {
      setActivePhaseIndex(2); // Optical Modulation
      simTimeoutRef.current = setTimeout(() => {
        setActivePhaseIndex(3); // Photodetection
        simTimeoutRef.current = setTimeout(() => {
          setActivePhaseIndex(4); // LCD Reconstruction
          setTransmittedChars(message);
          setIsTransmitting(false);
        }, 800);
      }, 700);
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current);
    };
  }, []);

  const currentImg = LIFI_PROJECT.images[activeImageIdx];

  return (
    <section className="projects-section lifi-work-section" id="projects">
      {/* Background Optical Ambience */}
      <div className="lifi-bg-beam" aria-hidden="true" />
      <div className="lifi-ambient-glow" aria-hidden="true" />

      {/* Section Header */}
      <div className="section-header-wrap">
        <div className="section-meta-tag">
          <Layers size={14} className="meta-icon" />
          <span>PORTFOLIO SELECTION // HARDWARE & EMBEDDED ENGINEERING</span>
        </div>
        
        <div className="work-header-flex">
          <div>
            <h2 className="section-title">PROJECT: LI-FI SYSTEM.</h2>
            <p className="section-subtitle">
              Visible Light Communication (VLC) prototype transmitting wireless alphanumeric data through high-speed modulated light waves.
            </p>
          </div>

          {/* Achievement Trophy Banner */}
          <div className="award-trophy-card">
            <div className="award-trophy-icon-wrap">
              <Award size={28} className="trophy-gold" />
            </div>
            <div className="award-trophy-content">
              <span className="award-badge-tag">RECOGNITION & HONORS</span>
              <h3 className="award-title">2nd Position // Silver Medal</h3>
              <p className="award-sub">Class 11 Science Exhibition</p>
              <span className="award-role-pill">
                <strong>Role:</strong> {LIFI_PROJECT.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="lifi-tabs-bar">
        <button
          type="button"
          className={`lifi-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Sparkles size={15} />
          <span>PROJECT OVERVIEW</span>
        </button>
        <button
          type="button"
          className={`lifi-tab-btn ${activeTab === 'hardware' ? 'active' : ''}`}
          onClick={() => setActiveTab('hardware')}
        >
          <Cpu size={15} />
          <span>HARDWARE ARCHITECTURE</span>
        </button>
        <button
          type="button"
          className={`lifi-tab-btn ${activeTab === 'protocol' ? 'active' : ''}`}
          onClick={() => setActiveTab('protocol')}
        >
          <Activity size={15} />
          <span>4-PHASE IMPLEMENTATION</span>
        </button>
        <button
          type="button"
          className={`lifi-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <Shield size={15} />
          <span>REAL-WORLD APPLICATIONS</span>
        </button>
      </div>

      {/* Main Feature Showcase Grid */}
      <div className="lifi-main-showcase">
        
        {/* Left: Dual Prototype Gallery */}
        <div className="lifi-gallery-col">
          <div className="gallery-primary-frame">
            <img 
              src={currentImg.url} 
              alt={currentImg.caption} 
              className="gallery-active-photo"
            />
            
            <div className="gallery-overlay-badge">
              <span className="badge-pulse-dot" />
              <span className="badge-text">{currentImg.tag}</span>
            </div>

            <button 
              type="button"
              className="gallery-expand-btn"
              title="Inspect Full Resolution"
              onClick={(e) => openModal('project', LIFI_PROJECT, e)}
            >
              <Maximize2 size={16} />
            </button>

            <div className="gallery-photo-caption">
              <h4>{currentImg.caption}</h4>
              <p>{currentImg.sub}</p>
            </div>
          </div>

          {/* Thumbnail Selectors */}
          <div className="gallery-thumbs-row">
            {LIFI_PROJECT.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`gallery-thumb-btn ${activeImageIdx === idx ? 'is-active' : ''}`}
                onClick={() => setActiveImageIdx(idx)}
              >
                <img src={img.url} alt={img.caption} />
                <div className="thumb-info">
                  <span className="thumb-idx">PHASE // 0{idx + 1}</span>
                  <span className="thumb-title">{img.caption}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Technical Specs Pill Cluster */}
          <div className="lifi-meta-specs-box">
            <div className="spec-item">
              <span className="spec-k">COMMUNICATION</span>
              <span className="spec-v">Simplex VLC (One-Way)</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">WAVELENGTH</span>
              <span className="spec-v">Visible Light Spectrum</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">MCU PLATFORM</span>
              <span className="spec-v">Arduino UNO (ATmega328P)</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">DISPLAY BUS</span>
              <span className="spec-v">16x2 I2C 4-Wire Interface</span>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Interactive Content based on Tab */}
        <div className="lifi-details-col">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane-fade">
              <div className="lifi-card-panel objective-panel">
                <div className="card-badge-row">
                  <span className="panel-tag">
                    <span className="tag-dot" />
                    PRIMARY SPECIFICATION
                  </span>
                  <span className="panel-year">2024</span>
                </div>

                <h3 className="panel-main-heading">🎯 Project Objective</h3>
                <p className="panel-lead-text">
                  {LIFI_PROJECT.objective}
                </p>

                <div className="objective-highlights-grid">
                  <div className="highlight-pill">
                    <CheckCircle2 size={16} className="hl-icon" />
                    <span>RF-Immune Visible Light Transmission</span>
                  </div>
                  <div className="highlight-pill">
                    <CheckCircle2 size={16} className="hl-icon" />
                    <span>Real-time Alphanumeric ASCII Output</span>
                  </div>
                  <div className="highlight-pill">
                    <CheckCircle2 size={16} className="hl-icon" />
                    <span>Zero Wall Penetration Security</span>
                  </div>
                  <div className="highlight-pill">
                    <CheckCircle2 size={16} className="hl-icon" />
                    <span>Award-Winning Working Hardware Prototype</span>
                  </div>
                </div>
              </div>

              {/* Live Interactive Signal Simulator */}
              <div className="lifi-card-panel simulator-panel">
                <div className="simulator-header">
                  <div className="sim-title-group">
                    <Terminal size={17} className="sim-terminal-icon" />
                    <span>INTERACTIVE LI-FI SIMULATION CONSOLE</span>
                  </div>
                  <span className="sim-status">
                    {isTransmitting ? '● MODULATING LIGHT...' : '● SYSTEM READY'}
                  </span>
                </div>

                <div className="sim-controls-row">
                  <input
                    type="text"
                    value={simText}
                    maxLength={16}
                    onChange={(e) => setSimText(e.target.value.toUpperCase())}
                    placeholder="ENTER ALPHANUMERIC STRING..."
                    className="sim-text-input"
                    disabled={isTransmitting}
                  />
                  <button
                    type="button"
                    className="sim-transmit-btn"
                    onClick={() => handleRunTransmission()}
                    disabled={isTransmitting}
                  >
                    <Play size={14} />
                    <span>TRANSMIT VIA LIGHT</span>
                  </button>
                </div>

                {/* Simulation Pipeline States */}
                <div className="sim-pipeline-grid">
                  <div className={`pipeline-step ${activePhaseIndex >= 1 ? 'step-active' : ''}`}>
                    <span className="step-label">1. ASCII BINARY</span>
                    <span className="step-val">{textToBinary(simText).slice(0, 17)}...</span>
                  </div>
                  <div className={`pipeline-step ${activePhaseIndex >= 2 ? 'step-active' : ''}`}>
                    <span className="step-label">2. OPTICAL PULSE</span>
                    <span className={`pulse-indicator ${isTransmitting ? 'is-pulsing' : ''}`} />
                  </div>
                  <div className={`pipeline-step ${activePhaseIndex >= 3 ? 'step-active' : ''}`}>
                    <span className="step-label">3. PHOTODETECTOR</span>
                    <span className="step-val">ANALOG VOLTAGE DETECTED</span>
                  </div>
                  <div className={`pipeline-step ${activePhaseIndex >= 4 ? 'step-active' : ''}`}>
                    <span className="step-label">4. 16x2 LCD SCREEN</span>
                    <span className="lcd-preview-text">
                      {transmittedChars || 'AWAITING STREAM...'}
                    </span>
                  </div>
                </div>

                {/* Simulated 16x2 LCD Display Screen */}
                <div className="sim-lcd-hardware-box">
                  <div className="lcd-bezel-top">
                    <span>1602A I2C MODULE // RECEIVER LOGIC</span>
                    <span className="lcd-i2c-addr">0x27 ADDR</span>
                  </div>
                  <div className="lcd-green-screen">
                    <div className="lcd-line line-1">DATA RECEIVED</div>
                    <div className="lcd-line line-2">
                      {transmittedChars}
                      <span className="lcd-cursor">█</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HARDWARE ARCHITECTURE */}
          {activeTab === 'hardware' && (
            <div className="tab-pane-fade">
              <div className="hardware-cards-stack">
                {LIFI_PROJECT.hardware.map((hw, idx) => {
                  const Icon = hw.icon;
                  return (
                    <div key={idx} className="hardware-card" style={{ '--hw-accent': hw.color }}>
                      <div className="hw-icon-box">
                        <Icon size={24} />
                      </div>
                      <div className="hw-body">
                        <div className="hw-top-meta">
                          <span className="hw-category">{hw.role}</span>
                          <span className="hw-spec-badge">{hw.spec}</span>
                        </div>
                        <h4 className="hw-title">⚙️ {hw.title}</h4>
                        <p className="hw-desc">{hw.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 4-PHASE IMPLEMENTATION */}
          {activeTab === 'protocol' && (
            <div className="tab-pane-fade">
              <div className="protocol-timeline-wrap">
                <div className="protocol-header-desc">
                  <span className="protocol-badge">SIMPLEX ONE-WAY ARCHITECTURE</span>
                  <p>
                    The system executes a precision Visible Light Communication pipeline split across four discrete physical stages:
                  </p>
                </div>

                <div className="protocol-steps-list">
                  {LIFI_PROJECT.phases.map((phase, idx) => (
                    <div key={idx} className="protocol-step-item">
                      <div className="protocol-step-num-col">
                        <span className="step-num">{phase.step}</span>
                        {idx < LIFI_PROJECT.phases.length - 1 && <span className="step-line" />}
                      </div>
                      <div className="protocol-step-card">
                        <div className="step-top-row">
                          <span className="step-badge">{phase.badge}</span>
                          <h4 className="step-heading">{phase.title}</h4>
                        </div>
                        <p className="step-desc">{phase.desc}</p>
                        <div className="step-telemetry">
                          <code>{phase.signal}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REAL-WORLD APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="tab-pane-fade">
              <div className="applications-grid">
                {LIFI_PROJECT.applications.map((app, idx) => {
                  const Icon = app.icon;
                  return (
                    <div key={idx} className="app-card">
                      <div className="app-card-header">
                        <div className="app-icon-wrap">
                          <Icon size={22} />
                        </div>
                        <div>
                          <span className="app-sub">{app.subtitle}</span>
                          <h4 className="app-title">{app.title}</h4>
                        </div>
                      </div>
                      <p className="app-desc">{app.desc}</p>
                      <div className="app-highlight-pill">
                        <ChevronRight size={13} />
                        <span>{app.highlight}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Card Footer Actions */}
          <div className="lifi-card-footer">
            <button
              type="button"
              className="lifi-primary-cta-btn"
              onClick={(e) => openModal('project', LIFI_PROJECT, e)}
            >
              <span>INSPECT FULL LI-FI SPECIFICATION</span>
              <ArrowUpRight size={16} className="cta-arrow" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;
