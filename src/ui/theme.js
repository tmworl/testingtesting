// src/ui/theme.js - Architectural transformation
import { Platform } from 'react-native';
import { merge } from 'lodash'; // For deep merging with proper reference handling
import baseTokens from './tokens/baseTokens';

// Define token resolution pipeline with proper composition patterns
function resolveTokens(platform = Platform.OS) {
  // Dynamic import for code-splitting and on-demand resolution
  let iosTokens = {};
  let androidTokens = {};
  
  try {
    // Safely attempt to import platform tokens
    if (platform === 'ios') {
      iosTokens = require('./tokens/iosTokens').default || {};
    } else if (platform === 'android') {
      androidTokens = require('./tokens/androidTokens').default || {};
    }
  } catch (error) {
    console.warn('Failed to load platform tokens:', error.message);
  }
  
  // Perform deep merge with proper inheritance chain
  return merge(
    {}, // Clean target to prevent reference pollution
    baseTokens,
    platform === 'ios' ? iosTokens : androidTokens,
    { _platform: platform } // Metadata for debugging
  );
}

// Path-based token resolution with proper fallback handling
export function resolveToken(path, fallback) {
  const tokens = resolveTokens();
  return getNestedProperty(tokens, path, fallback);
}

// Technical implementation of property path resolution
function getNestedProperty(obj, path, fallback) {
  if (!path) return obj;
  
  const properties = Array.isArray(path) ? path : path.split('.');
  let current = obj;
  
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    if (current === undefined || current === null || typeof current !== 'object') {
      return fallback;
    }
    current = current[key];
  }
  
  return current !== undefined ? current : fallback;
}

// Export legacy theme for backward compatibility
const theme = baseTokens;
export const legacyTheme = baseTokens;
export { resolveTokens, baseTokens };
export default theme;