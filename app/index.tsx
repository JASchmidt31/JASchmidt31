import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import usePrefetching from '../src/hooks/usePrefetching';
import useTraingPrograms from '../src/hooks/useTrainingPrograms';
import ErrorOverlay from '../src/ui/ErrorOverlay';
import LoadingSpinner from '../src/ui/LoadingSpinner';
import RectangleGrid from '../src/ui/RectangleGrid';

export default function App() {
  const router = useRouter();
  const { data: programs, isError, isLoading, error } = useTraingPrograms();
  usePrefetching();

  if (isError) return <ErrorOverlay error={error.toString()} />;
  if (isLoading || !programs) return <LoadingSpinner />;

  const handlePress = (id: number) => {
    router.push(`/programs/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RectangleGrid data={programs} onPress={handlePress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  }
});
