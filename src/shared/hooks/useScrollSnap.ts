import { useEffect, useRef, useCallback, useState } from 'react';

interface UseScrollSnapOptions {
  sections: string[];
  scrollDuration?: number;
  threshold?: number;
}

export const useScrollSnap = ({ 
  sections, 
  scrollDuration = 1000,
  threshold = 0.3 
}: UseScrollSnapOptions) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTime = useRef(0);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set scrolling flag briefly to prevent rapid successive calls
    isScrolling.current = true;
    setCurrentSectionIndex(index);
    
    const targetSection = document.querySelector(sections[index]);
    if (!targetSection) {
      isScrolling.current = false;
      return;
    }

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Reset scrolling flag much sooner to allow continuous scrolling
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 300); // Reduced from scrollDuration to 300ms
  }, [sections, scrollDuration]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isScrolling.current) return;

    // Reduced throttle for more responsive scrolling
    const now = Date.now();
    if (now - lastWheelTime.current < 50) return; // Reduced from 100ms to 50ms
    lastWheelTime.current = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
    
    if (nextIndex !== currentSectionIndex) {
      scrollToSection(nextIndex);
    }
  }, [scrollToSection, currentSectionIndex, sections.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling.current) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        scrollToSection(Math.min(sections.length - 1, currentSectionIndex + 1));
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        scrollToSection(Math.max(0, currentSectionIndex - 1));
        break;
      case 'Home':
        e.preventDefault();
        scrollToSection(0);
        break;
      case 'End':
        e.preventDefault();
        scrollToSection(sections.length - 1);
        break;
    }
  }, [scrollToSection, currentSectionIndex, sections.length]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isScrolling.current) return;
    // Store initial touch position
    const touch = e.touches[0];
    const startY = touch.clientY;
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endY = touch.clientY;
      const deltaY = startY - endY;
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        const direction = deltaY > 0 ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
        
        if (nextIndex !== currentSectionIndex) {
          scrollToSection(nextIndex);
        }
      }
      
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [scrollToSection, currentSectionIndex, sections.length]);

  useEffect(() => {
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleWheel, handleKeyDown, handleTouchStart]);

  // Initialize current section based on scroll position
  useEffect(() => {
    const updateCurrentSection = () => {
      if (isScrolling.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(sections[i]);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPosition >= sectionTop - windowHeight * threshold && 
            scrollPosition < sectionBottom - windowHeight * threshold) {
          setCurrentSectionIndex(i);
          break;
        }
      }
    };

    // Initial check
    updateCurrentSection();

    // Update on scroll (but not during programmatic scrolling)
    const handleScroll = () => {
      if (!isScrolling.current) {
        updateCurrentSection();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, threshold]);

  return {
    currentSectionIndex,
    scrollToSection,
    isScrolling: isScrolling.current
  };
};
