import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface RoundedBoxProps {
  isActive: boolean;
  children: React.ReactNode;
}

const RoundedBox: React.FC<RoundedBoxProps> = ({ isActive, children }) => {
  const { colors } = useTheme();
  return (
    <View style={(styles.container, !isActive && styles.opaque)}>
      <View style={[styles.box, { backgroundColor: colors.primary, borderColor: colors.primary }]}>{children}</View>
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
    borderRadius: 20, // Rundheit der Ecken
    marginBottom: 10
  },
  opaque: {
    opacity: 0.7
  }
});
