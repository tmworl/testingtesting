// src/ui/navigation/configs/stack.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTokens } from '../../hooks/useTokens';
import platform from '../../platform';

/**
 * Create stack navigator default screen options
 * These apply to all screens in the stack
 * 
 * @returns {Object} Default screen options for stack navigators
 */
export const createStackNavigatorScreenOptions = () => {
  const tokens = useTokens();
  const headerTokens = tokens.getComponentTokens('header');
  
  return {
    headerStyle: {
      backgroundColor: tokens.colors.background,
      elevation: platform.isAndroid ? headerTokens.elevation || 4 : 0,
      shadowOpacity: platform.isIOS && headerTokens.shadowEnabled ? 0.1 : 0,
      shadowOffset: { width: 0, height: platform.isIOS ? 1 : 0 },
      shadowRadius: 2,
      borderBottomWidth: platform.isIOS ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: tokens.colors.border,
      height: headerTokens.height + platform.getStatusBarHeight(),
    },
    headerTitleStyle: {
      color: tokens.colors.text,
      fontSize: tokens.typography.fontSize.subtitle,
      fontWeight: platform.isIOS ? '600' : '500',
    },
    headerTintColor: tokens.colors.primary,
    headerBackTitleVisible: platform.isIOS,
    headerTitleAlign: platform.isIOS ? 'center' : 'left',
    cardStyle: {
      backgroundColor: tokens.colors.background,
    },
    // Animation based on platform
    cardStyleInterpolator: platform.isIOS
      ? require('@react-navigation/stack').CardStyleInterpolators.forHorizontalIOS
      : require('@react-navigation/stack').CardStyleInterpolators.forFadeFromBottomAndroid,
    headerBackImage: ({ tintColor }) => (
      <Ionicons
        name={platform.isIOS ? "chevron-back" : "arrow-back"}
        size={platform.isIOS ? 28 : 24}
        color={tintColor}
        style={{ marginLeft: platform.isIOS ? 8 : 0 }}
      />
    ),
  };
};

/**
 * Create a custom header left component factory
 * 
 * @param {Function} navigation - Navigation object from React Navigation
 * @returns {Function} Function that returns a header left component
 */
export const createHeaderLeft = (navigation) => {
  const tokens = useTokens();
  
  return ({ canGoBack }) => {
    if (!canGoBack) return null;
    
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginLeft: platform.isIOS ? 8 : 0,
          padding: 8,
        }}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Ionicons
          name={platform.isIOS ? "chevron-back" : "arrow-back"}
          size={platform.isIOS ? 28 : 24}
          color={tokens.colors.primary}
        />
      </TouchableOpacity>
    );
  };
};

/**
 * Configuration factory for home stack
 * 
 * @returns {Object} Configuration object with screen options
 */
export const createHomeStackConfig = () => {
  const baseOptions = createStackNavigatorScreenOptions();
  
  return {
    screenOptions: baseOptions,
    screenConfigs: {
      HomeScreen: {
        options: {
          ...baseOptions,
          title: "Home",
          headerShown: true
        }
      },
      CourseSelector: {
        options: {
          ...baseOptions,
          title: "Select Course",
          headerShown: true
        }
      },
      Tracker: {
        options: ({ navigation }) => ({
          ...baseOptions,
          title: "Round Tracker",
          headerShown: true,
          // Prevent going back directly from tracker without completing the round
          headerLeft: () => null,
        })
      },
      ScorecardScreen: {
        options: {
          ...baseOptions,
          title: "Scorecard",
          headerShown: true
        }
      }
    }
  };
};

/**
 * Configuration factory for rounds stack
 * 
 * @returns {Object} Configuration object with screen options
 */
export const createRoundsStackConfig = () => {
  const baseOptions = createStackNavigatorScreenOptions();
  
  return {
    screenOptions: baseOptions,
    screenConfigs: {
      RoundsScreen: {
        options: {
          ...baseOptions,
          title: "Your Rounds",
          headerShown: true
        }
      },
      ScorecardScreen: {
        options: {
          ...baseOptions,
          title: "Scorecard",
          headerShown: true
        }
      }
    }
  };
};

/**
 * Configuration factory for insights stack
 * 
 * @returns {Object} Configuration object with screen options
 */
export const createInsightsStackConfig = () => {
  const baseOptions = createStackNavigatorScreenOptions();
  
  return {
    screenOptions: baseOptions,
    screenConfigs: {
      InsightsScreen: {
        options: {
          ...baseOptions,
          title: "Golf Insights",
          headerShown: true
        }
      }
    }
  };
};

/**
 * Configuration factory for profile stack
 * 
 * @returns {Object} Configuration object with screen options
 */
export const createProfileStackConfig = () => {
  const baseOptions = createStackNavigatorScreenOptions();
  
  return {
    screenOptions: baseOptions,
    screenConfigs: {
      ProfileScreen: {
        options: {
          ...baseOptions,
          title: "Profile",
          headerShown: true
        }
      }
    }
  };
};