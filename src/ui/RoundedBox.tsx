import React from 'react';
import { StyleSheet, View } from 'react-native';

interface RoundedBoxProps {
  isActive: boolean;
  children: React.ReactNode;
}

const RoundedBox: React.FC<RoundedBoxProps> = ({ isActive, children }) => {
  return (
    <View style={(styles.container, !isActive && styles.opaque)}>
      <View style={styles.box}>{children}</View>
    </View>
  );
};

export default RoundedBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Stärke des Rahmens
    borderColor: '#eb0cf2', // Farbe des Rahmens
    borderRadius: 20, // Rundheit der Ecken
    backgroundColor: '#3b363b', // Hintergrundfarbe
    marginBottom: 10
  },
  opaque: {
    opacity: 0.7
  }
});
