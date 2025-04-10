// src/ui/tokens/iosTokens.js
export default {
    // Typography refinements for iOS
    typography: {
      fontWeightMapping: {
        regular: '400',
        medium: '510', // Optimized optical weight for SF Pro
        semibold: '590', // Optical adjustment for SF Pro
        bold: '700',
      },
      // Optical size adjustments for SF Pro
      scalingParameters: {
        title: { tracking: -0.5, adaptiveTracking: true },
        subtitle: { tracking: -0.25, adaptiveTracking: true },
        body: { tracking: 0, adaptiveTracking: false },
        caption: { tracking: 0.25, adaptiveTracking: false },
      },
    },
    
    // Corner radius adjustments for iOS
    layout: {
      borderRadius: {
        small: 6, // iOS-specific value
        medium: 10, // iOS-specific value
        large: 16, // iOS-specific value
        pill: 24,
      },
    },
    
    // iOS elevation system with properly parameterized values
    elevation: {
      none: {
        shadowOpacity: 0,
        elevation: 0,
      },
      low: {
        shadowColor: "rgba(0,0,0,0.15)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.16,
        shadowRadius: 6,
        elevation: 0, // No elevation on iOS
      },
      medium: {
        shadowColor: "rgba(0,0,0,0.12)",
        shadowOffset: { width: 0, height: 2.5 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 0, // No elevation on iOS
      },
      high: {
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 0, // No elevation on iOS
      },
    },
    
    // Component-specific tokens
    components: {
      // Header-specific tokens
      header: {
        height: 44, // iOS standard
        blurEffect: 'systemThinMaterial',
        blurIntensity: 85,
        transparency: true,
        shadowEnabled: true,
        dynamicTextSize: true, // Enable optical scaling
      },
      
      // Card-specific tokens
      card: {
        cornerRadiusScale: 1.0, // Dynamic scaling factor
        material: 'none', // Default to no material effect
        shadowType: 'natural', // Natural shadow spread
      },
      
      // Tab bar-specific tokens
      tabBar: {
        height: 49, // iOS standard
        blurEffect: 'systemThinMaterial',
        blurIntensity: 90,
        transparency: true,
        shadowEnabled: true,
      },
      
      // Button-specific tokens
      button: {
        cornerRadiusScale: 1.0,
        hapticFeedback: true,
        activeOpacity: 0.8,
        pressedStateScale: 0.98,
      },
    },
    
    // Motion system
    motion: {
      spring: {
        default: { mass: 1, stiffness: 300, damping: 30 },
        responsive: { mass: 1, stiffness: 200, damping: 25 },
        energetic: { mass: 1, stiffness: 400, damping: 35 },
      },
      timing: {
        standard: 250,
        emphasize: 350,
        quick: 150,
      },
    },
    
    // Materials for iOS effects
    materials: {
      regular: {
        blurEffect: 'systemMaterial',
        intensity: 90,
      },
      thin: {
        blurEffect: 'systemThinMaterial',
        intensity: 80,
      },
      ultraThin: {
        blurEffect: 'systemUltraThinMaterial',
        intensity: 60,
      },
    },
  };