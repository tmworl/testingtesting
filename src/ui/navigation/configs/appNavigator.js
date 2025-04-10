// src/ui/navigation/configs/appNavigator.js
import navigationTheme from '../theme';

/**
 * Creates screen options for the root authentication navigator
 * 
 * @returns {Object} Screen options configuration
 */
export const createAppNavigatorScreenOptions = () => {
  return {
    // No headers at app level, screens handle their own headers
    headerShown: false,
    
    // Disable gestures at app level for security
    gestureEnabled: false,
    
    // Essential styling
    cardStyle: {
      backgroundColor: navigationTheme.tokens.colors.background,
    },
    
    // Disable animation between auth states for cleaner transitions
    animationEnabled: false,
    
    // Prevent going back to previously authenticated screens
    detachPreviousScreen: true,
  };
};