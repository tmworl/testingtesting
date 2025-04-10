// src/ui/components/Typography.js
import React from 'react';
import { Text } from 'react-native';
import { legacyTheme } from '../theme'; // For backward compatibility
import { useTokens } from '../hooks/useTokens';

/**
 * Typography component with token-based styling
 * Maintains backward compatibility while enabling platform-specific refinements
 */
const Typography = ({
  children,
  variant = 'body',
  weight,
  italic = false,
  color,
  size,
  align = 'left',
  style,
  ...otherProps
}) => {
  // Access resolved tokens
  const tokens = useTokens();
  
  // Get base style from static theme for backward compatibility
  const baseStyle = legacyTheme.typography.styles[variant] || legacyTheme.typography.styles.body;
  
  // Get platform-specific typography refinements
  const platformStyle = tokens.getTypography(variant, { 
    weight: weight || baseStyle.fontWeight,
    size: size || baseStyle.fontSize,
    italic,
    color
  });
  
  // Compose style with proper precedence
  const textStyle = {
    ...baseStyle, // Base style for backward compatibility
    fontFamily: tokens.typography.fontFamily, // Explicitly apply system font family
    ...platformStyle, // Platform-specific refinements
    textAlign: align,
  };

  return (
    <Text
      style={[textStyle, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default Typography;