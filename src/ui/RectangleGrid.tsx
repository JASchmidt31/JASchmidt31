import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface RectangleGridProps {
  data: { id: number; name: string }[]; // Array of objects with name and id
  onPress?: (id: number) => void; // Optional callback when a rectangle is pressed
}

const RectangleGrid: React.FC<RectangleGridProps> = ({ data, onPress }) => {
  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity style={styles.rectangle} onPress={() => onPress?.(item.id)} activeOpacity={0.8}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2} // Two columns for side-by-side rectangles
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10
  },
  rectangle: {
    width: '45%', // Adjust the percentage to control the rectangle width
    aspectRatio: 1.5, // Maintains the consistent height-to-width ratio
    backgroundColor: '#4CAF50',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3 // Adds a subtle shadow
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default RectangleGrid;
