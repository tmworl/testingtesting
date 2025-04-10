// src/ui/tests/tokens.test.js
// Note: This file is for Jest testing framework

import { Platform } from 'react-native';
import { resolveTokens, resolveToken } from '../theme';
import baseTokens from '../tokens/baseTokens';
import iosTokens from '../tokens/iosTokens';
import androidTokens from '../tokens/androidTokens';

// Mock Platform.OS to test both iOS and Android behavior
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(obj => obj.ios),
}));

describe('Token System', () => {
  describe('resolveTokens', () => {
    it('should merge base tokens with platform-specific tokens', () => {
      // Test for iOS
      Platform.OS = 'ios';
      const iosResolvedTokens = resolveTokens();
      
      // Check that iOS-specific properties were merged
      expect(iosResolvedTokens.layout.borderRadius.small).toBe(iosTokens.layout.borderRadius.small);
      expect(iosResolvedTokens._platform).toBe('ios');
      
      // Test for Android
      Platform.OS = 'android';
      const androidResolvedTokens = resolveTokens();
      
      // Check that Android-specific properties were merged
      expect(androidResolvedTokens.layout.borderRadius.small).toBe(androidTokens.layout.borderRadius.small);
      expect(androidResolvedTokens._platform).toBe('android');
      
      // Restore platform
      Platform.OS = 'ios';
    });
    
    it('should preserve base tokens when not overridden', () => {
      const resolvedTokens = resolveTokens();
      
      // Check that base tokens are preserved
      expect(resolvedTokens.colors.primary).toBe(baseTokens.colors.primary);
    });
    
    it('should allow platform-specific tokens to override base tokens', () => {
      Platform.OS = 'ios';
      const resolvedTokens = resolveTokens();
      
      // Check that iOS-specific elevation overrides base elevation
      expect(resolvedTokens.elevation.low.shadowRadius).toBe(iosTokens.elevation.low.shadowRadius);
      
      // Restore platform
      Platform.OS = 'ios';
    });
  });
  
  describe('resolveToken', () => {
    it('should resolve nested token paths', () => {
      // Test for color token
      const primaryColor = resolveToken('colors.primary');
      expect(primaryColor).toBe(baseTokens.colors.primary);
      
      // Test for nested token
      const titleFontSize = resolveToken('typography.fontSize.title');
      expect(titleFontSize).toBe(baseTokens.typography.fontSize.title);
    });
    
    it('should return fallback value when path does not exist', () => {
      const fallbackValue = 'fallback';
      const result = resolveToken('nonexistent.path', fallbackValue);
      expect(result).toBe(fallbackValue);
    });
    
    it('should handle nested platform-specific overrides', () => {
      Platform.OS = 'ios';
      const borderRadius = resolveToken('layout.borderRadius.small');
      expect(borderRadius).toBe(iosTokens.layout.borderRadius.small);
      
      // Restore platform
      Platform.OS = 'ios';
    });
  });
});