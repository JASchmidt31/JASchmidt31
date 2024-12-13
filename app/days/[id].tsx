import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import useFetch from '../../src/hooks/useFetch';
import { DataType } from '../../src/services/DataTypes';
import { useAppStore } from '../../src/store/AppStore';
import RectangleGrid from '../../src/ui/RectangleGrid';

const DayDetails = () => {
  const { id } = useLocalSearchParams(); // Get the dynamic ID from the URL
  const { fetchData } = useFetch();
  const { executions } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    fetchData(DataType.EXECUTION);
  }, [fetchData]);

  const handlePress = (id: number) => {
    router.push(`/days/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RectangleGrid data={executions.filter((e) => e.day === Number(id))} onPress={handlePress} />
    </SafeAreaView>
  );
};

export default DayDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  }
});
