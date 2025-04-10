// src/ui/components/BackdropMaterial.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import { useTokens } from '../hooks/useTokens';

/**
 * BackdropMaterial component
 * Provides a platform-specific backdrop material effect
 * 
 * @param {Object} props Component props
 * @param {string} props.type - Type of material ('regular', 'thin', 'ultraThin')
 * @param {number} props.intensity - Blur intensity (0-100)
 * @param {Object} props.style - Additional styles
 * @param {React.ReactNode} props.children - Child components
 */
const BackdropMaterial = ({ 
  type = 'regular', 
  intensity, 
  style, 
  children,
  ...props 
}) => {
  const tokens = useTokens();
  
  // Get material configuration from tokens
  const materialTokens = tokens.getMaterial(type) || {};
  
  // Determine blur effect and intensity
  const blurEffect = materialTokens.blurEffect || 'systemMaterial';
  const blurIntensity = intensity || materialTokens.intensity || 90;
  
  // Only use BlurView on iOS
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={[styles.container, style]}
        tint="light"
        intensity={blurIntensity}
        {...props}
      >
        {children}
      </BlurView>
    );
  }
  
  // Fallback for Android
  return (
    <View style={[styles.container, styles.androidFallback, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  androidFallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default BackdropMaterial;