const theme = {
  colors: {
    background: '#F4F5F6',
    backgroundAlt: '#F8F9FA',
    surface: '#FFFFFF',
    primary: '#34CB79',
    accent: '#2A9D8F',
    highlight: '#56CCF2',
    primarySoft: 'rgba(52, 203, 121, 0.12)',
    primaryStrong: '#2E9E5D',
    text: '#322153',
    textSecondary: '#6C6C80',
    textMuted: '#4F4F64',
    outline: '#E1E3E6',
    outlineSoft: '#E8E9ED',
    shadow: '#000000',
  },
  gradients: {
    hero: ['#34CB79', '#2A9D8F'] as const,
    card: ['#FFFFFF', '#F3FBF7'] as const,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  radii: {
    sm: 8,
    md: 10,
    lg: 16,
    full: 999,
  },
  shadow: {
    card: {
      shadowColor: '#000000',
      shadowOpacity: 0.14,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 6,
    },
    control: {
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 2,
    },
    cta: {
      shadowColor: '#000000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 12,
      elevation: 4,
    },
  },
};

export default theme;
