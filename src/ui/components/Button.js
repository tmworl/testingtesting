// src/ui/components/Button.js
import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { legacyTheme } from '../theme'; // For backward compatibility
import { useTokens } from '../hooks/useTokens';

/**
 * Button component with token-based styling
 * Maintains backward compatibility while enabling platform-specific refinements
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  onPress,
  style,
  textStyle,
  ...otherProps
}) => {
  // Access resolved tokens
  const tokens = useTokens();
  
  // Get platform-specific button configuration
  const buttonTokens = tokens.getComponentTokens('button');
  
  // Determine if button should be disabled
  const isDisabled = disabled || loading;
  
  // Determine border radius from token system with proper scaling
  const borderRadius = buttonTokens.cornerRadiusScale ? 
    tokens.layout.borderRadius.pill * buttonTokens.cornerRadiusScale : 
    tokens.layout.borderRadius.pill;
  
  // Compose button styles with proper precedence
  const containerStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Container`],
    { borderRadius },
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    isDisabled && variant === 'outline' && styles.disabledOutline,
    style,
  ];
  
  // Compose text styles with proper precedence
  const textStyles = [
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];
  
  // Apply platform-specific interaction feedback
  const handlePress = () => {
    // iOS-specific haptic feedback
    if (tokens._platform === 'ios' && buttonTokens.hapticFeedback) {
      // Implementation of haptic feedback would go here
      // This would typically use a library like react-native-haptic-feedback
    }
    
    if (onPress) onPress();
  };
  
  // Determine icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 24;
      default: return 20;
    }
  };
  
  // Determine icon color based on variant and disabled state
  const getIconColor = () => {
    if (isDisabled) {
      return '#aaa';
    }
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
      case 'text':
        return tokens.colors.primary;
      default:
        return tokens.colors.primary;
    }
  };
  
  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={buttonTokens.activeOpacity || 0.7}
      {...otherProps}
    >
      {/* Left Icon */}
      {iconLeft && !loading && (
        <Ionicons
          name={iconLeft}
          size={getIconSize()}
          color={getIconColor()}
          style={styles.leftIcon}
        />
      )}
      
      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'text' ? tokens.colors.primary : '#FFFFFF'}
        />
      ) : (
        /* Button Text */
        <Text style={textStyles}>
          {children}
        </Text>
      )}
      
      {/* Right Icon */}
      {iconRight && !loading && (
        <Ionicons
          name={iconRight}
          size={getIconSize()}
          color={getIconColor()}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
};

// Styles - we're keeping compatibility with existing style definitions
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: legacyTheme.spacing.large,
    paddingVertical: legacyTheme.spacing.medium,
    ...legacyTheme.elevation.low,
  },
  
  // Variants
  primary: {
    backgroundColor: legacyTheme.colors.primary,
  },
  secondary: {
    backgroundColor: legacyTheme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: legacyTheme.colors.primary,
    ...legacyTheme.elevation.none,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: legacyTheme.spacing.small,
    ...legacyTheme.elevation.none,
  },
  
  // Sizes
  smallContainer: {
    paddingVertical: legacyTheme.spacing.small - 4,
    paddingHorizontal: legacyTheme.spacing.medium,
    borderRadius: 20,
    minHeight: 32,
  },
  mediumContainer: {
    minHeight: 44,
  },
  largeContainer: {
    paddingVertical: legacyTheme.spacing.medium,
    paddingHorizontal: legacyTheme.spacing.large,
    borderRadius: 28,
    minHeight: 56,
  },
  
  // Text Styles
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineText: {
    color: legacyTheme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  textText: {
    color: legacyTheme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: '#e0e0e0',
    ...legacyTheme.elevation.none,
  },
  disabledOutline: {
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },
  disabledText: {
    color: '#aaa',
  },
  
  // Icons
  leftIcon: {
    marginRight: legacyTheme.spacing.small,
  },
  rightIcon: {
    marginLeft: legacyTheme.spacing.small,
  },
});

export default Button;