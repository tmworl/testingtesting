// src/ui/tokens/baseTokens.js
import { Platform } from 'react-native';

const baseTokens = {
  colors: {
    primary: '#2196F3',
    secondary: '#FF9800',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    error: '#B00020',
  },
  
  typography: {
    fontFamily: 'System',
    fontWeightMapping: {
      thin: '100',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    styles: {
      h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
      h2: { fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
      h3: { fontSize: 24, fontWeight: 'semibold', lineHeight: 32 },
      h4: { fontSize: 20, fontWeight: 'semibold', lineHeight: 28 },
      h5: { fontSize: 18, fontWeight: 'medium', lineHeight: 24 },
      h6: { fontSize: 16, fontWeight: 'medium', lineHeight: 22 },
      body: { fontSize: 16, fontWeight: 'regular', lineHeight: 24 },
      bodySmall: { fontSize: 14, fontWeight: 'regular', lineHeight: 20 },
      caption: { fontSize: 12, fontWeight: 'regular', lineHeight: 16 },
      button: { fontSize: 16, fontWeight: 'medium', lineHeight: 24 },
      default: { fontSize: 16, fontWeight: 'regular', lineHeight: 24 },
    },
    scalingParameters: {},
  },
  
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 40,
  },
  
  layout: {
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
      pill: 999,
    },
  },
  
  elevation: {
    none: {},
    low: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    high: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 6,
    },
  },
  
  materials: {
    none: {},
    thin: { blurType: 'light', blurAmount: 10 },
    regular: { blurType: 'light', blurAmount: 20 },
    thick: { blurType: 'dark', blurAmount: 30 },
  },
  
  components: {
    card: {
      cornerRadiusScale: 1,
    },
    button: {
      cornerRadiusScale: 1,
      hapticFeedback: true,
    },
  }
};

export default baseTokens;