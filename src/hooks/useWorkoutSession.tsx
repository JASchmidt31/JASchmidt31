import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import useWorkoutSessionStore from '../store/useWorkoutSessionStore';
import { WorkoutExerciseSetRecord } from '../types/WorkoutExerciseSet';
import useWorkoutExercises from './useWorkoutExercises';

function useWorkoutSession(dayID: string) {
  const { state, isInitialized, isAppStoreUpdateRequired, initializeSets, recoverState, finishExerciseSet, editExerciseSet } =
    useWorkoutSessionStore();

  const { workoutSessionState, saveWorkoutSession } = useAppStore();

  const { data: workoutExercises } = useWorkoutExercises(dayID);
  const isRecoveryRequired =
    workoutSessionState &&
    workoutSessionState[Number(dayID)] &&
    JSON.stringify(workoutSessionState[Number(dayID)]) !== JSON.stringify(state);

  const handleFocusEffect = useCallback(() => {
    if (isRecoveryRequired) {
      recoverState(workoutSessionState[Number(dayID)]);
    } else if (!isInitialized && workoutExercises) {
      initializeSets(workoutExercises);
    }
  }, [dayID, initializeSets, isInitialized, isRecoveryRequired, recoverState, workoutExercises, workoutSessionState]);

  useFocusEffect(handleFocusEffect);

  useEffect(() => {
    if (!isAppStoreUpdateRequired) return;
    saveWorkoutSession(Number(dayID), state);
    useWorkoutSessionStore.setState({ isAppStoreUpdateRequired: false });
  }, [dayID, isAppStoreUpdateRequired, saveWorkoutSession, state]);

  const activeSlideIndex =
    Object.keys(state.workoutSlides)
      .map(Number)
      .find((key) => state.workoutSlides[key].some((set) => set.order === state.activeIndex)) ?? 0;

  const sortedWorkoutSlides = useCallback(() => {
    const slides = Object.values(state.workoutSlides) as WorkoutExerciseSetRecord[][];
    slides.sort((a, b) => {
      if (a.length === 0 || b.length === 0) return 0;
      return a[0].order - b[0].order;
    });
    return slides;
  }, [state.workoutSlides]);

  const getExerciseSets = useCallback(
    (exerciseID: number) => {
      return state.workoutSlides[exerciseID] ?? [];
    },
    [state.workoutSlides]
  );

  return {
    isInitialized,
    activeIndex: state.activeIndex,
    workoutSlides: sortedWorkoutSlides(),
    activeSlideIndex,
    finishExerciseSet,
    editExerciseSet,
    getExerciseSets
  };
}

export default useWorkoutSession;
