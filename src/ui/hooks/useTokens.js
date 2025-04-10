// src/ui/hooks/useTokens.js
import { useMemo } from 'react';
import { resolveTokens, resolveToken } from '../theme';

/**
 * Resolution hook with proper memoization for runtime performance
 * @returns {Object} Resolved tokens with resolution utilities
 */
export function useTokens() {
  // Platform-specific token resolution with proper dependency tracking
  const tokens = useMemo(() => resolveTokens(), []);
  
  // Enhanced token resolution API
  return {
    ...tokens, // Base tokens and platform overrides
    
    // Utility functions for component consumption
    resolveToken: (path, fallback) => resolveToken(path, fallback),
    
    // Typography resolution with optical scaling
    getTypography: (variant, options = {}) => {
      const base = tokens.typography?.styles?.[variant] || {};
      const scaling = tokens.typography?.scalingParameters?.[variant] || {};
      
      // Apply proper font weight mapping
      const weightKey = options.weight || base.fontWeight || 'regular';
      const mappedWeight = tokens.typography?.fontWeightMapping?.[weightKey] || weightKey;
      
      const defaultColor = tokens.colors?.text || '#000000';
      
      // Apply optical scaling parameters with safe fallbacks
      return {
        fontFamily: tokens.typography?.fontFamily || 'System',
        fontSize: options.size || base.fontSize || 16,
        fontWeight: mappedWeight,
        letterSpacing: scaling.tracking || 0,
        lineHeight: base.lineHeight || (base.fontSize ? base.fontSize * 1.5 : 24),
        color: options.color || base.color || defaultColor,
        fontStyle: options.italic ? 'italic' : 'normal',
      };
    },
    
    // Elevation resolution with platform-specific properties
    getElevation: (level = 'none') => {
      return tokens.elevation?.[level] || tokens.elevation?.none || {};
    },
    
    // Material resolution for iOS effects
    getMaterial: (type = 'none') => {
      return tokens.materials?.[type] || {};
    },
    
    // Component-specific token resolution
    getComponentTokens: (componentName) => {
      return tokens.components?.[componentName] || {};
    }
  };
}