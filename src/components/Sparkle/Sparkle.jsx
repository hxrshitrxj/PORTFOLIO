import React from 'react';
import './Sparkle.css';

/**
 * Sparkle element replicating the exact 4-point star from the original reference image
 * Supports dynamic rotation, scale, brightness flare, and scroll velocity responsiveness.
 */
export function Sparkle({
  size = 48,
  glowColor = 'rgba(255, 180, 50, 0.65)',
  rotation = 0,
  scale = 1,
  opacity = 1,
  className = '',
  style = {},
  velocity = 0
}) {
  const dynamicRotation = rotation + (velocity * 0.4);
  const dynamicScale = Math.max(0.6, scale * (1 + Math.min(Math.abs(velocity) * 0.005, 0.5)));
  const dynamicGlow = Math.min(1.0, 0.5 + Math.abs(velocity) * 0.02);

  return (
    <div
      className={`sparkle-container ${className}`}
      style={{
        width: size,
        height: size,
        transform: `translate3d(0, 0, 0) rotate(${dynamicRotation}deg) scale(${dynamicScale})`,
        opacity,
        ...style,
      }}
    >
      <div
        className="sparkle-glow"
        style={{
          boxShadow: `0 0 ${size * 0.8}px ${glowColor}, 0 0 ${size * 1.6}px rgba(255, 110, 0, ${0.4 * dynamicGlow})`
        }}
      />
      <svg
        viewBox="0 0 100 100"
        className="sparkle-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft radial background glow within the star SVG */}
        <defs>
          <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor="#ffe699" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#ff9900" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
          </radialGradient>
          <filter id="sparkleBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 4-point concave star matching the photo's sparkle */}
        <path
          d="M 50 0 
             Q 50 42 8 50 
             Q 50 58 50 100 
             Q 50 58 92 50 
             Q 50 42 50 0 Z"
          fill="url(#sparkleGrad)"
          filter="url(#sparkleBlur)"
        />
        {/* Crisp bright white core diamond */}
        <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

export default Sparkle;
