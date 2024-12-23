import { useRouter } from 'expo-router';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import useI18n from '../src/hooks/useI18n';
import usePrefetching from '../src/hooks/usePrefetching';
import useTheme from '../src/hooks/useTheme';
import useTraingPrograms from '../src/hooks/useTrainingPrograms';
import ErrorOverlay from '../src/ui/ErrorOverlay';
import LoadingSpinner from '../src/ui/LoadingSpinner';
import RectangleGrid from '../src/ui/RectangleGrid';

export default function App() {
  const router = useRouter();
  const { data: programs, isError, isLoading, error } = useTraingPrograms();
  const i18n = useI18n();
  usePrefetching();
  const { colors } = useTheme();

  if (isError) return <ErrorOverlay error={error.toString()} />;
  if (isLoading || !programs) return <LoadingSpinner />;

  const handlePress = (id: number) => {
    router.push(`/programs/${id}`);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <RectangleGrid data={programs} onPress={handlePress} />
      </SafeAreaView>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
