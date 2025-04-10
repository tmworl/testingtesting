import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DesignSystemErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.warn('Design System Error:', error);
  }
  
  render() {
    if (this.state.hasError) {
      // Render fallback UI without using design system components
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Component Error
          </Text>
          {__DEV__ && (
            <Text style={styles.errorDetails}>
              {this.state.error?.toString()}
            </Text>
          )}
        </View>
      );
    }
    
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFDDDD',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  errorDetails: {
    fontSize: 12,
    color: '#770000',
    marginTop: 4,
  },
});

export default DesignSystemErrorBoundary;