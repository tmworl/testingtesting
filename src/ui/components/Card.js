// src/ui/components/Card.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { legacyTheme } from '../theme'; // For backward compatibility
import { useTokens } from '../hooks/useTokens';

/**
 * Card component with token-based styling
 * Maintains backward compatibility while enabling platform-specific refinements
 */
const Card = ({
  children,
  variant = 'default',
  noPadding = false,
  style,
  ...otherProps
}) => {
  // Access resolved tokens
  const tokens = useTokens();
  
  // Get platform-specific card configuration
  const cardTokens = tokens.getComponentTokens('card');
  
  // Determine elevation level based on variant
  const elevationLevel = variant === 'elevated' ? 'medium' : 
                        variant === 'outlined' ? 'none' : 
                        variant === 'flat' ? 'none' : 'low';
  
  // Get elevation style from token system
  const elevationStyle = tokens.getElevation(elevationLevel);
  
  // Get corner radius from token system with proper scaling
  const cornerRadius = cardTokens.cornerRadiusScale ? 
    tokens.layout.borderRadius.medium * cardTokens.cornerRadiusScale : 
    tokens.layout.borderRadius.medium;
  
  // Compose styles with proper precedence
  const cardStyle = [
    styles.base,
    { borderRadius: cornerRadius },
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    variant === 'flat' && styles.flat,
    noPadding && styles.noPadding,
    elevationStyle, // Platform-specific elevation
    style,
  ];

  return (
    <View style={cardStyle} {...otherProps}>
      {children}
    </View>
  );
};

// Keep existing styles for backward compatibility
const styles = StyleSheet.create({
  base: {
    backgroundColor: legacyTheme.colors.background,
    padding: legacyTheme.spacing.medium,
    marginBottom: legacyTheme.spacing.medium,
  },
  elevated: {
    // Legacy elevation styles preserved for backward compatibility
    // Token-based elevation now applied separately
  },
  outlined: {
    borderWidth: 1,
    borderColor: legacyTheme.colors.border,
  },
  flat: {
    backgroundColor: '#F5F5F5',
  },
  noPadding: {
    padding: 0,
  },
});

export default Card;