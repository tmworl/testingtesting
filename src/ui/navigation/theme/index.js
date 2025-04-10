// src/ui/navigation/theme/index.js
import { Platform, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import platform from '../../platform';
import tokens from '../../tokens/baseTokens';
import { useTokens } from '../../hooks/useTokens';

/**
 * Creates a complete set of options for React Navigation screen headers
 * 
 * @param {string} title - The header title text
 * @param {Object} options - Additional options to override defaults
 * @returns {Object} Complete header configuration object
 */
const getHeaderOptions = (title, options = {}) => {
  return {
    title,
    headerStyle: {
      backgroundColor: tokens.colors.background,
      height: platform.getHeaderHeight(),
      ...tokens.elevation.low,
      borderBottomWidth: platform.isIOS ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: tokens.colors.border,
    },
    headerTitleStyle: {
      ...tokens.typography.styles.subtitle,
      color: tokens.colors.text,
    },
    headerBackTitleStyle: platform.isIOS ? {
      ...tokens.typography.styles.body,
      color: tokens.colors.primary,
    } : undefined,
    headerTintColor: tokens.colors.primary,
    headerBackTitleVisible: platform.isIOS,
    headerTitleAlign: platform.isIOS ? 'center' : 'left',
    ...options,
  };
};

/**
 * Creates a complete set of options for React Navigation tab bar
 * 
 * @param {Object} route - Current route object
 * @returns {Object} Complete tab bar configuration object
 */
const getTabBarOptions = (route) => {
  return {
    activeTintColor: tokens.colors.primary,
    inactiveTintColor: tokens.colors.secondary,
    labelStyle: {
      ...tokens.typography.styles.caption,
    },
    tabStyle: {
      paddingVertical: tokens.spacing.xsmall,
    },
    style: {
      backgroundColor: tokens.colors.background,
      height: platform.getTabBarHeight(),
      paddingBottom: platform.getBottomSpace(),
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: tokens.colors.border,
      ...tokens.elevation.low,
    },
  };
};

/**
 * Determines if the tab bar should be hidden for certain routes
 * 
 * @param {Object} route - Current route object
 * @returns {Object|undefined} Style object with display: 'none' or undefined
 */
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  
  // Hide the tab bar on these screens
  const hiddenRoutes = [
    'CourseSelector', 
    'Tracker', 
    'ScorecardScreen'
  ];
  
  if (hiddenRoutes.includes(routeName)) {
    return { display: 'none' };
  }
  
  return undefined;
};

/**
 * Creates stack navigator screen options with consistent styling
 * 
 * @param {Object} options - Additional options to override defaults 
 * @returns {Object} Screen options for stack navigator
 */
const getStackScreenOptions = (options = {}) => {
  return {
    headerShown: true,
    cardStyle: {
      backgroundColor: tokens.colors.background,
    },
    // Animation configurations for transitions
    cardStyleInterpolator: platform.select({
      ios: require('@react-navigation/stack').CardStyleInterpolators.forHorizontalIOS,
      android: require('@react-navigation/stack').CardStyleInterpolators.forFadeFromBottomAndroid,
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: tokens.motion?.timing?.standard || 300,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: tokens.motion?.timing?.standard || 300,
        },
      },
    },
    ...options,
  };
};

/**
 * Creates modal screen options with appropriate animations
 * 
 * @param {Object} options - Additional options to override defaults
 * @returns {Object} Screen options for modal presentations
 */
const getModalScreenOptions = (options = {}) => {
  return {
    cardStyle: {
      backgroundColor: tokens.colors.background,
    },
    cardStyleInterpolator: platform.select({
      ios: require('@react-navigation/stack').CardStyleInterpolators.forModalPresentationIOS,
      android: require('@react-navigation/stack').CardStyleInterpolators.forRevealFromBottomAndroid,
    }),
    ...options,
  };
};

/**
 * Creates app navigator options for the root authentication navigator
 */
const createAppNavigatorScreenOptions = () => {
  return {
    // No headers at app level, screens handle their own headers
    headerShown: false,
    // Disable gestures at app level for security
    gestureEnabled: false,
    cardStyle: {
      backgroundColor: tokens.colors.background,
    },
  };
};

// Export the public API
export default {
  tokens,
  platform,
  getHeaderOptions,
  getTabBarOptions,
  getTabBarVisibility,
  getStackScreenOptions,
  getModalScreenOptions,
  createAppNavigatorScreenOptions,
};