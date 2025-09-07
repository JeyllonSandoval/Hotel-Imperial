// Constantes compartidas de la aplicación

export const APP_CONFIG = {
  name: 'Hotel Imperial',
  version: '1.0.0',
  description: 'Experimenta el lujo y la comodidad en el corazón de la ciudad'
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact'
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms'
} as const;
