import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import useFetch from '../src/hooks/useFetch';
import { DataType } from '../src/services/DataTypes';
import { useAppStore } from '../src/store/AppStore';
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
  }
});
