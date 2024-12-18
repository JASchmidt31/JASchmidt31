import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, ListRenderItem, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useFetch from '../../src/hooks/useFetch';
import useWorkoutSession from '../../src/hooks/useWorkoutSession';
import { DataType } from '../../src/services/DataTypes';
import { useAppStore } from '../../src/store/AppStore';
import { WorkoutExerciseSet } from '../../src/types/WorkoutExerciseSet';
import Carousel from '../../src/ui/Carousel';
import WorkoutExerciseSetView from '../../src/ui/SetView';

const DayDetails = () => {
  const { id } = useLocalSearchParams();
  const { fetchData } = useFetch();
  const { executions } = useAppStore();
  const { initializeState, activeSlideIndex, workoutSlides, activeIndex, finishExerciseSet } = useWorkoutSession();

  useEffect(() => {
    fetchData(DataType.EXECUTION);
  }, [fetchData]);

  useEffect(() => {
    initializeState(executions.filter((e) => e.day === Number(id)));
  }, [executions, id, initializeState]);

  const renderWorkoutExerciseSlide: ListRenderItem<WorkoutExerciseSet[]> = ({ item }: ListRenderItemInfo<WorkoutExerciseSet[]>) => {
    if (!item[0]) {
      return null;
    }
    const exerciseID = item[0].exercise.id;
    const exerciseName = item[0].exercise.name;

    return (
      <>
        <View key={exerciseID} style={styles.slide}>
          <Text>{exerciseName}</Text>
          {item.map((exercise: WorkoutExerciseSet, index: number) => (
            <WorkoutExerciseSetView
              key={exercise.index}
              exerciseSet={exercise}
              activeIndex={activeIndex}
              finishExerciseSet={finishExerciseSet}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {workoutSlides && <Carousel data={Object.values(workoutSlides)} renderItem={renderWorkoutExerciseSlide} />}
    </SafeAreaView>
  );
};

export default DayDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  slide: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  slideText: {
    fontSize: 24,
    color: '#fff'
  }
});
