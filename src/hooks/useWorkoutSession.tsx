import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { WorkoutExercise } from '../services/workoutExercise/WorkoutExercise';
import { getWorkoutExercisesByDayID } from '../services/workoutExercise/WorkoutExerciseService';
import { AppActionType } from '../store/AppAction';
import { useAppDispatch, useAppStore } from '../store/AppStore';
import { WorkoutExerciseSet } from '../types/WorkoutExerciseSet';
import { WorkoutSlide } from '../types/WorkoutSlide';

type Action =
  | { type: 'INITIALIZE_SETS'; payload: WorkoutExercise[] }
  | { type: 'RECOVER_STATE'; payload: WorkoutSessionState }
  | { type: 'FINISH_EXERCISE_SET'; payload: WorkoutExerciseSet }
  | { type: 'EDIT_EXERCISE_SET'; payload: { exerciseID: number; reps: number; weight: number } };

export interface WorkoutSessionState {
  activeIndex: number;
  workoutSlides: WorkoutSlide;
}

function workoutReducer(state: WorkoutSessionState, action: Action): WorkoutSessionState {
  switch (action.type) {
    case 'INITIALIZE_SETS': {
      let order = 0;
      const workoutSlides: WorkoutSlide = {};

      action.payload.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          const workoutSet = {
            exercise: exercise.exercise,
            dayID: exercise.day,
            index: set.index,
            reps: set.reps,
            weight: set.weight,
            order: order++
          };
          if (!workoutSlides[exercise.exercise.id]) {
            workoutSlides[exercise.exercise.id] = [];
          }
          workoutSlides[exercise.exercise.id].push(workoutSet);
        });
      });
      return { ...state, workoutSlides: workoutSlides };
    }

    case 'RECOVER_STATE':
      return { ...state, ...action.payload };

    case 'EDIT_EXERCISE_SET': {
      const { exerciseID, reps, weight } = action.payload;
      const updatedSlides = { ...state.workoutSlides };
      if (updatedSlides[exerciseID]) {
        updatedSlides[exerciseID] = updatedSlides[exerciseID].map((set) => ({
          ...set,
          reps,
          weight
        }));
      }
      return { ...state, workoutSlides: updatedSlides };
    }

    case 'FINISH_EXERCISE_SET': {
      let updatedSlides = { ...state.workoutSlides };
      const exerciseID = action.payload.exercise.id;
      const updatedSlide = updatedSlides[exerciseID].map((set) => {
        if (set.order === action.payload.order) {
          return { ...set, finishedAtDate: new Date() };
        }
        return set;
      });
      updatedSlides[exerciseID] = updatedSlide;

      const updatedActiveIndex = state.activeIndex + 1;
      return { ...state, activeIndex: updatedActiveIndex, workoutSlides: updatedSlides };
    }

    default:
      return state;
  }
}

function useWorkoutSession(dayID: string) {
  console.log('dayID', dayID);
  const [isInitialized, setInitialized] = useState(false);
  const initialState: WorkoutSessionState = { activeIndex: 0, workoutSlides: {} };
  const [state, dispatch] = useReducer(workoutReducer, initialState);
  const [isAppStoreUpdateRequired, setAppStoreUpdateRequired] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  const { workoutSessionState } = useAppStore();
  const dispatchApp = useAppDispatch();
  const { data: workoutExercises } = useQuery<WorkoutExercise[]>({
    queryKey: ['workoutexercise', dayID],
    queryFn: () => getWorkoutExercisesByDayID(dayID)
  });

  const isRecoveryRequired =
    workoutSessionState &&
    workoutSessionState[Number(dayID)] &&
    JSON.stringify(workoutSessionState[Number(dayID)]) !== JSON.stringify(stateRef.current);

  const handleFocusEffect = useCallback(() => {
    console.log('handleFocusEffect');
    console.log('dayID changed:', dayID);
    console.log('isInitialized changed:', isInitialized);
    console.log('isRecoveryRequired changed:', isRecoveryRequired);
    console.log('workoutExercises changed:', workoutExercises);
    console.log('workoutSessionState changed:', workoutSessionState);
    if (isRecoveryRequired) {
      console.log('RECOVER_STATE');
      dispatch({ type: 'RECOVER_STATE', payload: workoutSessionState[Number(dayID)] });
      setInitialized(true);
    } else if (!isInitialized && workoutExercises) {
      console.log('INITIALIZE_SETS');
      dispatch({ type: 'INITIALIZE_SETS', payload: workoutExercises });
      setInitialized(true);
    }
  }, [dayID, isInitialized, isRecoveryRequired, workoutExercises, workoutSessionState]);

  useFocusEffect(handleFocusEffect);

  const finishExerciseSet = useCallback(
    (exerciseSet: WorkoutExerciseSet) => dispatch({ type: 'FINISH_EXERCISE_SET', payload: exerciseSet }),
    []
  );

  const editExerciseSet = useCallback((exerciseID: number, reps: number, weight: number) => {
    dispatch({ type: 'EDIT_EXERCISE_SET', payload: { exerciseID, reps, weight } });
    setAppStoreUpdateRequired(true);
  }, []);

  useEffect(() => {
    if (!isAppStoreUpdateRequired) return;
    dispatchApp({ type: AppActionType.SAVE_WORKOUT_SESSION, payload: { dayID: Number(dayID), workoutSessionState: stateRef.current } });
    setAppStoreUpdateRequired(false);
  }, [dayID, dispatchApp, isAppStoreUpdateRequired]);

  const activeSlideIndex: number = state.workoutSlides
    ? (Object.keys(state.workoutSlides)
        .map(Number)
        .find((key: number) => state.workoutSlides[key].some((set) => set.order === state.activeIndex)) ?? 0)
    : 0;

  const sortedWorkoutSlides = useCallback(() => {
    const slides = Object.values(state.workoutSlides) as WorkoutExerciseSet[][];
    slides.sort((a, b) => {
      if (a.length === 0 || b.length === 0) return 0;
      return a[0].order - b[0].order;
    });
    return slides;
  }, [state.workoutSlides]);

  const getExerciseSets: (exerciseID: number) => WorkoutExerciseSet[] = useCallback(
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
