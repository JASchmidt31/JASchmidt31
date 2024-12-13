import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import useFetch from '../src/hooks/useFetch';
import { DataType } from '../src/services/DataTypes';
import { useAppStore } from '../src/store/AppStore';
import ErrorOverlay from '../src/ui/ErrorOverlay';
import LoadingSpinner from '../src/ui/LoadingSpinner';
import RectangleGrid from '../src/ui/RectangleGrid';

export default function App() {
  const { fetchData } = useFetch();
  const { programs } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    fetchData(DataType.PROGRAM);
  }, [fetchData]);

  const handlePress = (id: number) => {
    router.push(`/programs/${id}`);
  };

  return (
    <>
      <ErrorOverlay />
      <LoadingSpinner />

      <SafeAreaView style={styles.container}>
        <RectangleGrid data={programs} onPress={handlePress} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  programItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  programName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center'
  }
});
