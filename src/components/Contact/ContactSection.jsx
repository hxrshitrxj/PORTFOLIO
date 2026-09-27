import React, { useState, useEffect } from 'react';
import { Mail, Check, ArrowUpRight, ArrowUp, Clock } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../Icons';
import { useModal } from '../../context/ModalContext';
import './ContactSection.css';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { openModal } = useModal();

  const email = 'hxrshitofficial7321@gmail.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as IST / Local Time with seconds
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-cta-wrapper">
          <div className="section-meta-tag">
            <span className="live-status-dot" />
            <span>DISPATCH // AVAILABLE FOR SELECT COLLABORATIONS</span>
          </div>

          <h2 className="contact-heading">
            LET'S BUILD SOMETHING EXTRAORDINARY.
          </h2>

          <p className="contact-sub">
            Whether developing an immersive flagship web experience, bespoke design engineering, 
            or experimental audio-visual tools — let's make it unforgettable.
          </p>

          <div className="contact-actions">
            <button 
              className={`copy-email-btn ${copied ? 'is-copied' : ''}`}
              onClick={handleCopyEmail}
            >
              {copied ? <Check size={18} /> : <Mail size={18} />}
              <span className="email-text">{copied ? 'EMAIL COPIED TO CLIPBOARD!' : email}</span>
              <span className="copy-tag">{copied ? 'DONE' : 'COPY'}</span>
            </button>

            <button 
              type="button"
              className="direct-mail-btn"
              onClick={(e) => openModal('contact', null, e)}
            >
              <span>SEND MESSAGE</span>
              <ArrowUpRight size={18} className="cta-arrow" />
            </button>
          </div>
        </div>

        {/* Social & Telemetry Bar */}
        <div className="contact-info-grid">
          <div className="info-block">
            <span className="info-title">CURRENT STATUS</span>
            <span className="info-value status-available">
              <span className="dot-pulse" />
              AVAILABLE FOR HIRE // 2026
            </span>
          </div>

          <div className="info-block">
            <span className="info-title">STUDIO LOCATION & TIME</span>
            <span className="info-value time-val">
              <Clock size={14} className="clock-icon" />
              {currentTime || '12:00:00 IST'}
            </span>
          </div>

          <div className="info-block social-block">
            <span className="info-title">NETWORK</span>
            <div className="social-links-row">
              <a href="https://github.com/hxrshitrxj" target="_blank" rel="noreferrer" className="social-pill" title="GitHub">
                <GithubIcon size={15} />
                <span>GITHUB</span>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="social-pill" title="X / Twitter">
                <TwitterIcon size={15} />
                <span>X / TWITTER</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill" title="LinkedIn">
                <LinkedinIcon size={15} />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="sub-footer-bar">
          <div className="sub-left">
            <span className="copyright-tag">© 2026 HARSHIT RAJ. CRAFTED WITH REACT & GSAP.</span>
          </div>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top of hero">
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default ContactSection;
