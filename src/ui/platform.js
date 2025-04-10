// src/ui/platform.js
import { Platform, Dimensions, StatusBar } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

// Platform detection with error prevention
const platform = {
  // Basic platform detection
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',
  
  // Platform-specific value selection
  select: (options = {}) => {
    const { ios, android, web, default: defaultValue } = options;
    
    if (Platform.OS === 'ios' && ios !== undefined) return ios;
    if (Platform.OS === 'android' && android !== undefined) return android;
    if (Platform.OS === 'web' && web !== undefined) return web;
    
    return defaultValue !== undefined ? defaultValue : 
           ios !== undefined ? ios : 
           android !== undefined ? android : 
           web !== undefined ? web : undefined;
  },
  
  // Safe layout measurements
  getStatusBarHeight: () => {
    try {
      return getStatusBarHeight(true);
    } catch (error) {
      return StatusBar.currentHeight || 0;
    }
  },
  
  getBottomSpace: () => {
    try {
      return getBottomSpace();
    } catch (error) {
      return 0;
    }
  },
  
  getTabBarHeight: () => {
    return platform.select({
      ios: 49 + platform.getBottomSpace(),
      android: 56,
      default: 50,
    });
  },
  
  // Screen dimensions
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};

export default platform;