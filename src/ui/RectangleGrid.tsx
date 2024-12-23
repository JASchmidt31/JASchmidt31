import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import useTheme from '../hooks/useTheme';

interface RectangleGridProps {
  data: { id: number; name: string }[]; // Array of objects with name and id
  onPress?: (id: number) => void; // Optional callback when a rectangle is pressed
}

const RectangleGrid: React.FC<RectangleGridProps> = ({ data, onPress }) => {
  const { colors } = useTheme();
  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity
      style={[styles.rectangle, { backgroundColor: colors.primary }]}
      onPress={() => onPress?.(item.id)}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={styles.grid} />;
};

const styles = StyleSheet.create({
  grid: {
    padding: '10%'
  },
  rectangle: {
    width: '80%',
    aspectRatio: 4.0,
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RectangleGrid;
