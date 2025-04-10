// src/ui/navigation/configs/tabBar.js
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useTokens } from '../../hooks/useTokens';
import platform from '../../platform';

/**
 * Generate tab bar icon component
 * 
 * @param {string} name - Base name of the icon (without -outline suffix)
 * @returns {Function} Component for rendering tab bar icon
 */
export const getTabBarIcon = (name) => ({ focused, color, size }) => {
  // Use solid icons for selected tabs, outline for inactive
  const iconName = focused ? name : `${name}-outline`;
  return <Ionicons name={iconName} size={size} color={color} />;
};

/**
 * Get icon name mapping for the main tabs
 * 
 * @param {string} routeName - Name of the route
 * @returns {string} Corresponding Ionicon name
 */
export const getIconName = (routeName) => {
  switch (routeName) {
    case 'HomeTab':
      return 'home';
    case 'Rounds':
      return 'golf';
    case 'Insights':
      return 'bulb';
    case 'Profile':
      return 'person';
    default:
      return 'apps';
  }
};

/**
 * Determines if the tab bar should be hidden for certain routes
 * 
 * @param {Object} route - Current route object
 * @returns {Object|undefined} Style object with display: 'none' or undefined
 */
export const getTabBarVisibility = (route) => {
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
 * Create complete tab bar configuration for the main navigator
 * 
 * @param {Object} route - Current route object
 * @returns {Object} Tab bar configuration object
 */
export const getTabBarConfig = (route) => {
  const tokens = useTokens();
  const tabBarTokens = tokens.getComponentTokens('tabBar');
  const baseName = route.name;
  
  return {
    // Convert route name to display name if needed
    tabBarLabel: baseName === 'HomeTab' ? 'Home' : baseName,
    
    // Generate appropriate icon based on route
    tabBarIcon: getTabBarIcon(getIconName(baseName)),
    
    // Apply consistent styling from tokens
    tabBarActiveTintColor: tokens.colors.primary,
    tabBarInactiveTintColor: tokens.colors.secondary,
    
    // Style the tab bar itself
    tabBarStyle: {
      ...(getTabBarVisibility(route) || {}),
      backgroundColor: platform.isIOS && tabBarTokens.transparency ? 
        'rgba(255,255,255,0.8)' : tokens.colors.background,
      height: tabBarTokens.height || platform.getTabBarHeight(),
      paddingBottom: platform.getBottomSpace(),
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: tokens.colors.border,
      ...tokens.getElevation(tabBarTokens.shadowEnabled ? 'low' : 'none'),
    },
    
    // Style for tab label
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: platform.isIOS ? 0 : 4,
    },
    
    // Add badge for Insights tab to indicate new content
    ...(baseName === 'Insights' ? {
      tabBarBadge: undefined, // Set to a value like 'New' to show a badge
    } : {}),
  };
};

/**
 * Create the full tab navigator screen options
 * 
 * @returns {Object} Screen options for tab navigator
 */
export const getTabNavigatorScreenOptions = () => {
  return {
    // Hide the tab-level header since each stack has its own headers
    headerShown: false,
    
    // Set tab bar visibility based on current route
    tabBarStyle: ({ route }) => getTabBarVisibility(route),
    
    // Lazy loading to improve performance
    lazy: true,
    
    // Transition configuration
    animationEnabled: platform.isIOS,
    // Android specific ripple effect for material design
    ...(platform.isAndroid && {
      tabBarPressColor: 'rgba(0,0,0,0.1)',
      tabBarIndicatorStyle: {
        backgroundColor: 'transparent',
      },
    }),
  };
};