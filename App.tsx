import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Program } from './src/services/program/Program';
import { getPrograms } from './src/services/program/ProgramService';
import ErrorOverlay from './src/ui/ErrorOverlay';
import LoadingSpinner from './src/ui/LoadingSpinner';
import RectangleGrid from './src/ui/RectangleGrid';

export default function App() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsData = await getPrograms();
        setPrograms(programsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const handlePress = (id: number) => {
    console.log(`Rectangle with ID: ${id} pressed`);
  };

  return (
    <>
      <ErrorOverlay error={error} setError={setError} />
      <LoadingSpinner loading={isLoading} />

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
