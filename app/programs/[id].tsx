import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const ProgramDetails = () => {
  const { id } = useLocalSearchParams(); // Get the dynamic ID from the URL

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Program Details</Text>
        <Text style={styles.id}>Program ID: {id}</Text>
        {/* Fetch and display detailed data for this program */}
      </View>
    </SafeAreaView>
  );
};

export default ProgramDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  id: {
    fontSize: 18,
    color: '#555'
  }
});
