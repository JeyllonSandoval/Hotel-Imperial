import React, { useEffect, useState } from 'react';
import { HeroSection } from '@/components/features/hero/HeroSection';
import { AboutSection } from '@/components/features/about/AboutSection';
import { CommentsSection } from '@/components/features/comments/CommentsSection';

export const HomePage: React.FC = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const sections = [
    '#hero-section',
    '#about-section', 
    '#comments-section'
  ];

  const scrollToSection = (index: number) => {
    const targetSection = document.querySelector(sections[index]);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Update current section based on scroll position
  useEffect(() => {
    const updateCurrentSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(sections[i]);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionBottom = sectionTop + rect.height;
        
        // Check if section is in view (with some tolerance)
        if (scrollPosition >= sectionTop - windowHeight * 0.5 && 
            scrollPosition < sectionBottom - windowHeight * 0.5) {
          setCurrentSectionIndex(i);
          break;
        }
      }
    };

    // Initial check
    updateCurrentSection();

    // Update on scroll
    const handleScroll = () => {
      updateCurrentSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <div className="scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <div id="hero-section">
        <HeroSection />
      </div>
      <div id="about-section">
        <AboutSection />
      </div>
      <div id="comments-section">
        <CommentsSection />
      </div>
      
      {/* Indicador de sección actual */}
      <div className="flex flex-col gap-4 fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`scroll-indicator group relative w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSectionIndex
                ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50'
                : 'bg-white/20 hover:bg-white/40 hover:scale-110'
            }`}
            aria-label={`Ir a sección ${index + 1}`}
          >
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {index === 0 ? 'Inicio' : index === 1 ? 'Nosotros' : 'Testimonios'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
