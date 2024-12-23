import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTrainingDays } from '../../src/hooks/useTrainingDays';
import ErrorOverlay from '../../src/ui/ErrorOverlay';
import LoadingSpinner from '../../src/ui/LoadingSpinner';
import RectangleGrid from '../../src/ui/RectangleGrid';

const ProgramDetails = () => {
  const { id } = useLocalSearchParams();
  const programID = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { data: days, isLoading, isError } = useTrainingDays(programID);

  if (isError) return ErrorOverlay;

  if (isLoading || !days) return LoadingSpinner;

  const handlePress = (id: number) => {
    router.push(`/days/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RectangleGrid data={days.filter((d) => d.program === Number(programID))} onPress={handlePress} />
    </SafeAreaView>
  );
};
export default ProgramDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  }
});
