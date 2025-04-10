// src/ui/motion/index.js
import { Animated, Easing } from 'react-native';
import { useRef, useEffect } from 'react';
import { useTokens } from '../hooks/useTokens';

/**
 * Hook for using animated values with token-based configuration
 * 
 * @param {number} initialValue - Initial value for the animation
 * @returns {Object} Animation utilities with value, spring, and timing methods
 */
export function useAnimatedValue(initialValue = 0) {
  const tokens = useTokens();
  const animation = useRef(new Animated.Value(initialValue)).current;
  
  // Get motion configuration from tokens
  const springConfig = tokens.motion?.spring || {};
  const timingConfig = tokens.motion?.timing || {};
  
  // Spring animation with token-based configuration
  const spring = (toValue, config = {}) => {
    const configName = config.preset || 'default';
    const presetConfig = springConfig[configName] || springConfig.default || {};
    
    return Animated.spring(animation, {
      toValue,
      useNativeDriver: config.useNativeDriver !== undefined ? 
        config.useNativeDriver : true,
      // Merge preset config with custom config
      ...presetConfig,
      ...config,
    });
  };
  
  // Timing animation with token-based configuration
  const timing = (toValue, config = {}) => {
    const duration = config.duration || 
      timingConfig[config.preset || 'standard'] || 
      300;
    
    return Animated.timing(animation, {
      toValue,
      duration,
      easing: config.easing || Easing.inOut(Easing.ease),
      useNativeDriver: config.useNativeDriver !== undefined ? 
        config.useNativeDriver : true,
      ...config,
    });
  };
  
  return {
    value: animation,
    spring,
    timing,
  };
}

/**
 * Hook for triggering animations on component mount
 * Creates entrance animations that automatically play when components mount
 * 
 * @param {Object} config - Animation configuration
 * @returns {Animated.Value} Animation value
 */
export function useEntranceAnimation(config = {}) {
  const animation = useAnimatedValue(0);
  
  useEffect(() => {
    // Start animation on mount
    const animationType = config.type || 'timing';
    const anim = animationType === 'spring' ? 
      animation.spring(1, config) : 
      animation.timing(1, config);
    
    anim.start();
    
    return () => {
      anim.stop();
    };
  }, []);
  
  return animation.value;
}

/**
 * Create fade transition style
 * 
 * @param {Animated.Value} value - Animation value
 * @returns {Object} Animation style
 */
export function useFadeTransition(value) {
  return {
    opacity: value,
  };
}

/**
 * Create slide transition style
 * 
 * @param {Animated.Value} value - Animation value 
 * @param {string} direction - Direction of slide ('left', 'right', 'up', 'down')
 * @param {number} distance - Distance to slide
 * @returns {Object} Animation style
 */
export function useSlideTransition(value, direction = 'right', distance = 20) {
  const tokens = useTokens();
  
  // Use token-based distance if available
  const slideDistance = tokens.motion?.slideDistance?.[direction] || distance;
  
  // Determine transform based on direction
  switch (direction) {
    case 'right':
      return {
        opacity: value,
        transform: [
          { translateX: value.interpolate({
            inputRange: [0, 1],
            outputRange: [-slideDistance, 0],
          })},
        ],
      };
    case 'left':
      return {
        opacity: value,
        transform: [
          { translateX: value.interpolate({
            inputRange: [0, 1],
            outputRange: [slideDistance, 0],
          })},
        ],
      };
    case 'up':
      return {
        opacity: value,
        transform: [
          { translateY: value.interpolate({
            inputRange: [0, 1],
            outputRange: [slideDistance, 0],
          })},
        ],
      };
    case 'down':
      return {
        opacity: value,
        transform: [
          { translateY: value.interpolate({
            inputRange: [0, 1],
            outputRange: [-slideDistance, 0],
          })},
        ],
      };
    default:
      return { opacity: value };
  }
}

/**
 * Create scale transition style
 * 
 * @param {Animated.Value} value - Animation value
 * @param {number} startScale - Starting scale
 * @returns {Object} Animation style
 */
export function useScaleTransition(value, startScale = 0.9) {
  const tokens = useTokens();
  
  // Use token-based scale if available
  const tokenStartScale = tokens.motion?.scale?.start || startScale;
  
  return {
    opacity: value,
    transform: [
      { scale: value.interpolate({
        inputRange: [0, 1],
        outputRange: [tokenStartScale, 1],
      })},
    ],
  };
}

/**
 * Create platform-specific button press animation style
 * iOS uses scale effect, Android uses opacity
 * 
 * @param {boolean} pressed - Whether button is pressed
 * @returns {Object} Animation style
 */
export function useButtonPressEffect(pressed) {
  const tokens = useTokens();
  const buttonTokens = tokens.getComponentTokens('button');
  
  // Get platform-specific settings
  const pressedScale = buttonTokens?.pressedStateScale || 0.98;
  const activeOpacity = buttonTokens?.activeOpacity || 0.8;
  
  if (tokens._platform === 'ios') {
    return {
      transform: [
        { scale: pressed ? pressedScale : 1 }
      ]
    };
  } else {
    return {
      opacity: pressed ? activeOpacity : 1
    };
  }
}

/**
 * Create keyframe animation
 * 
 * @param {Array} keyframes - Array of key-value pairs for animation
 * @param {Object} config - Animation configuration
 * @returns {Object} Animation controller
 */
export function useKeyframeAnimation(keyframes, config = {}) {
  const tokens = useTokens();
  const animation = useRef(new Animated.Value(0)).current;
  const keyframeCount = keyframes.length - 1;
  
  // Get timing configuration
  const duration = config.duration || 
    tokens.motion?.timing?.standard || 
    300;
  
  // Start the animation
  const start = (callback) => {
    Animated.timing(animation, {
      toValue: keyframeCount,
      duration,
      easing: config.easing || Easing.linear,
      useNativeDriver: config.useNativeDriver !== undefined ? 
        config.useNativeDriver : true,
    }).start(callback);
  };
  
  // Stop the animation
  const stop = () => {
    animation.stopAnimation();
  };
  
  // Reset the animation
  const reset = (callback) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: config.useNativeDriver !== undefined ? 
        config.useNativeDriver : true,
    }).start(callback);
  };
  
  // Create interpolations for each animated property
  const interpolations = {};
  
  // Get unique properties from all keyframes
  const properties = new Set();
  keyframes.forEach(frame => {
    Object.keys(frame).forEach(key => properties.add(key));
  });
  
  // Create interpolation for each property
  properties.forEach(property => {
    const inputRange = [];
    const outputRange = [];
    
    keyframes.forEach((frame, index) => {
      inputRange.push(index);
      outputRange.push(frame[property] !== undefined ? frame[property] : 
        // Find the last defined value for this property
        keyframes.slice(0, index).reverse().find(f => f[property] !== undefined)?.[property] || 0);
    });
    
    interpolations[property] = animation.interpolate({
      inputRange,
      outputRange,
    });
  });
  
  return {
    start,
    stop,
    reset,
    interpolations,
    animation,
  };
}