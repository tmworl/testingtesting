// src/ui/tokens/androidTokens.js
export default {
    // Typography refinements for Android
    typography: {
      fontWeightMapping: {
        regular: '400',
        medium: '500', // Material Design standard
        semibold: '600', // Maps to Roboto medium-bold
        bold: '700',
      },
      // Material Design text scaling
      scalingParameters: {
        title: { tracking: 0, adaptiveTracking: false },
        subtitle: { tracking: 0.15, adaptiveTracking: false },
        body: { tracking: 0.5, adaptiveTracking: false },
        caption: { tracking: 0.4, adaptiveTracking: false },
      },
    },
    
    // Corner radius adjustments for Android Material 3
    layout: {
      borderRadius: {
        small: 4, // Android-specific value
        medium: 8, // Android-specific value
        large: 16, // Android-specific value
        pill: 28, // Slightly larger for Android buttons
      },
    },
    
    // Android elevation system with properly parameterized values
    elevation: {
      none: {
        shadowOpacity: 0,
        elevation: 0,
      },
      low: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 2, // Android elevation
      },
      medium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 4, // Android elevation
      },
      high: {
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 8, // Android elevation
      },
    },
    
    // Component-specific tokens
    components: {
      // Header-specific tokens
      header: {
        height: 56, // Android standard
        blurEffect: null,
        blurIntensity: 0,
        transparency: false,
        shadowEnabled: false,
        dynamicTextSize: false,
      },
      
      // Card-specific tokens
      card: {
        cornerRadiusScale: 1.0,
        material: 'none',
        shadowType: 'elevation',
      },
      
      // Tab bar-specific tokens
      tabBar: {
        height: 56, // Android standard
        blurEffect: null,
        blurIntensity: 0,
        transparency: false,
        shadowEnabled: false,
      },
      
      // Button-specific tokens
      button: {
        cornerRadiusScale: 1.0,
        hapticFeedback: false,
        activeOpacity: 0.7,
        pressedStateScale: 1.0, // Android uses color change instead
        rippleEffect: true, // Android ripple effect
        rippleColor: 'rgba(0,0,0,0.12)',
      },
    },
    
    // Motion system
    motion: {
      spring: {
        default: { mass: 1, stiffness: 280, damping: 26 },
        responsive: { mass: 1, stiffness: 180, damping: 22 },
        energetic: { mass: 1, stiffness: 380, damping: 30 },
      },
      timing: {
        standard: 300,
        emphasize: 400,
        quick: 200,
      },
    },
  };