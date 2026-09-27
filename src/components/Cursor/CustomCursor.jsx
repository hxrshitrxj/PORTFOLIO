import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHover = false;
    let animId;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      const target = e.target;
      const hoverable = !!(
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      );

      if (hoverable !== isHover) {
        isHover = hoverable;
        if (isHover) {
          dot.classList.add('is-hover');
          ring.classList.add('is-hover');
        } else {
          dot.classList.remove('is-hover');
          ring.classList.remove('is-hover');
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}

export default CustomCursor;
