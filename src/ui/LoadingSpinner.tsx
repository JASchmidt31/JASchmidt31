import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppStore } from '../store/AppStore';

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useAppStore();
  if (!isLoading) return null; // Render nothing if not loading

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  }
});

export default LoadingSpinner;
