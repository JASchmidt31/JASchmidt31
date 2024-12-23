import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ListRenderItem, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../../src/hooks/useTheme';
import useWorkoutSession from '../../src/hooks/useWorkoutSession';
import { WorkoutExerciseSetRecord } from '../../src/types/WorkoutExerciseSet';
import Carousel from '../../src/ui/Carousel';
import LoadingSpinner from '../../src/ui/LoadingSpinner';
import WorkoutExerciseSetView from '../../src/ui/WorkoutExerciseSetView';

const DayDetails = () => {
  const { id } = useLocalSearchParams();
  const { workoutSlides, activeIndex, finishExerciseSet, isInitialized } = useWorkoutSession(Array.isArray(id) ? id[0] : id);
  const { t } = useTranslation();
  const { colors } = useTheme();

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  const renderWorkoutExerciseSlide: ListRenderItem<WorkoutExerciseSetRecord[]> = ({
    item
  }: ListRenderItemInfo<WorkoutExerciseSetRecord[]>) => {
    if (!item[0]) {
      return null;
    }
    const exerciseID = item[0].exercise.id;
    const exerciseName = item[0].exercise.name;

    return (
      <View key={exerciseID} style={styles.slide}>
        <Text style={[styles.slideText, { color: colors.primary }]}>{t(exerciseName)}</Text>
        {item.map((exercise: WorkoutExerciseSetRecord, index: number) => (
          <WorkoutExerciseSetView
            key={exercise.index}
            exerciseSet={exercise}
            activeIndex={activeIndex}
            finishExerciseSet={finishExerciseSet}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {workoutSlides && <Carousel data={Object.values(workoutSlides)} renderItem={renderWorkoutExerciseSlide} />}
    </SafeAreaView>
  );
};

export default DayDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slide: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  slideText: {
    fontSize: 24
  }
});
