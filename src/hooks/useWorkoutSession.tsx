import { useCallback, useReducer } from 'react';
import { WorkoutExercise } from '../services/execution/ExerciseExecution';
import { WorkoutExerciseSet } from '../types/WorkoutExerciseSet';
import { WorkoutSlide } from '../types/WorkoutSlide';

type Action = { type: 'INITIALIZE_SETS'; payload: WorkoutExercise[] } | { type: 'FINISH_EXERCISE_SET'; payload: WorkoutExerciseSet };

interface State {
  activeIndex: number;
  workoutSlides: WorkoutSlide;
}

function workoutReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INITIALIZE_SETS': {
      console.log(action.payload);
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
            console.log('initialized');
            workoutSlides[exercise.exercise.id] = [];
          }
          workoutSlides[exercise.exercise.id].push(workoutSet);
        });
      });
      console.log('workoutSlides');
      console.log(workoutSlides);
      return { ...state, workoutSlides: workoutSlides };
    }

    case 'FINISH_EXERCISE_SET': {
      console.log('FINISH_EXERCISE_SET');
      console.log(action.payload);
      let updatedSlides = { ...state.workoutSlides };
      const exerciseID = action.payload.exercise.id;
      console.log(exerciseID);
      console.log(updatedSlides);
      console.log(updatedSlides[exerciseID]);
      console.log(state.workoutSlides);
      const updatedSlide = updatedSlides[exerciseID].map((set) => {
        if (set.order === action.payload.order) {
          return { ...set, finishedAtDate: new Date() };
        }
        return set;
      });
      console.log(updatedSlide);
      updatedSlides[exerciseID] = updatedSlide;

      const updatedActiveIndex = state.activeIndex + 1;
      return { ...state, activeIndex: updatedActiveIndex, workoutSlides: updatedSlides };
    }

    default:
      return state;
  }
}

function useWorkoutSession() {
  const initialState: State = { activeIndex: 0, workoutSlides: {} };
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const initializeState = useCallback((exercises: WorkoutExercise[]) => dispatch({ type: 'INITIALIZE_SETS', payload: exercises }), []);

  const finishExerciseSet = useCallback(
    (exerciseSet: WorkoutExerciseSet) => dispatch({ type: 'FINISH_EXERCISE_SET', payload: exerciseSet }),
    []
  );

  const activeSlideIndex: number = state.workoutSlides
    ? (Object.keys(state.workoutSlides)
        .map(Number)
        .find((key: number) => state.workoutSlides[key].some((set) => set.order === state.activeIndex)) ?? 0)
    : 0;

  const sortedWorkoutSlides = Object.values(state.workoutSlides);
  sortedWorkoutSlides.sort((a, b) => {
    if (a.length === 0 || b.length === 0) return 0;
    return a[0].order - b[0].order;
  });

  return {
    activeIndex: state.activeIndex,
    workoutSlides: sortedWorkoutSlides,
    activeSlideIndex,
    initializeState,
    finishExerciseSet
  };
}
export default useWorkoutSession;
