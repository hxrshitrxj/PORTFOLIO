import React from 'react';
import HeroScroll from './components/HeroScroll/HeroScroll';
import ProjectsSection from './components/Projects/ProjectsSection';
import ContactSection from './components/Contact/ContactSection';
import CustomCursor from './components/Cursor/CustomCursor';
import { ModalProvider } from './context/ModalContext';
import { ExperienceProvider } from './context/ExperienceContext';
import CinematicModal from './components/Modal/CinematicModal';
import ExperienceManager from './components/Experiences/ExperienceManager';
import './App.css';

export function App() {
  return (
    <ModalProvider>
      <ExperienceProvider>
        <div className="portfolio-app">
          {/* Custom Magnetic Cursor */}
          <CustomCursor />

          {/* Master Cinematic Full-Screen Experience System (WORKS, LAB, JOURNEY, ABOUT) */}
          <ExperienceManager />

          {/* Global Cinematic Interactive Button Pop-up Modal */}
          <CinematicModal />

          {/* Main Hero Interactive Scroll Section (280vh track with pinned camera viewport) */}
          <main>
            <HeroScroll />

            {/* Subsequent Portfolio Content revealed smoothly as Hero finishes */}
            <div className="content-stream">
              <ProjectsSection />
              <ContactSection />
            </div>
          </main>
        </div>
      </ExperienceProvider>
    </ModalProvider>
  );
}

export default App;
