export const theme = {
  colors: {
    heroTitle: '#3E6EB4',
    title: '#CD6028',
    subtitle: '#DFEEFC',
    body: '#FFFFFF',
    button: '#141219',
    buttonHover: '#1E1C26',
    // background: '#0a0a0a',
  },
  fonts: {
    raleway: "'Raleway', system-ui, sans-serif",
    manrope: "'Manrope', system-ui, sans-serif",
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  }
} as const;

export type Theme = typeof theme;
