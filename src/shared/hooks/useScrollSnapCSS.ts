import { useEffect, useRef, useCallback, useState } from 'react';

interface UseScrollSnapCSSOptions {
  sections: string[];
}

export const useScrollSnapCSS = ({ sections }: UseScrollSnapCSSOptions) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;

    const targetSection = document.querySelector(sections[index]);
    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [sections]);

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

  return {
    currentSectionIndex,
    scrollToSection,
    containerRef
  };
};
