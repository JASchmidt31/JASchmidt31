import { create } from 'zustand';
import { WorkoutExercise } from '../services/workoutExercise/WorkoutExercise';
import { WorkoutExerciseSetRecord } from '../types/WorkoutExerciseSet';

export interface WorkoutSessionState {
  activeIndex: number;
  workoutSlides: Record<number, WorkoutExerciseSetRecord[]>;
}

interface WorkoutSessionStore {
  state: WorkoutSessionState;
  isInitialized: boolean;
  isAppStoreUpdateRequired: boolean;
  initializeSets: (workoutExercises: WorkoutExercise[]) => void;
  recoverState: (payload: Partial<WorkoutSessionState>) => void;
  finishExerciseSet: (exerciseSet: WorkoutExerciseSetRecord) => void;
  editExerciseSet: (exerciseID: number, reps: number, weight: number) => void;
}

const useWorkoutSessionStore = create<WorkoutSessionStore>((set, get) => ({
  state: {
    activeIndex: 0,
    workoutSlides: {}
  },
  isInitialized: false,
  isAppStoreUpdateRequired: false,
  initializeSets: (workoutExercises: WorkoutExercise[]) => {
    let order = 0;
    const workoutSlides: Record<number, WorkoutExerciseSetRecord[]> = {};

    workoutExercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        const workoutSet: WorkoutExerciseSetRecord = {
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

    set({
      state: { activeIndex: 0, workoutSlides },
      isInitialized: true,
      isAppStoreUpdateRequired: true
    });
  },
  recoverState: (payload: Partial<WorkoutSessionState>) => {
    set({
      state: { ...get().state, ...payload },
      isInitialized: true
    });
  },
  finishExerciseSet: (exerciseSet: WorkoutExerciseSetRecord) => {
    const { state } = get();
    const updatedSlides = { ...state.workoutSlides };
    const exerciseID = exerciseSet.exercise.id;

    updatedSlides[exerciseID] = updatedSlides[exerciseID].map((set) => {
      if (set.order === exerciseSet.order) {
        return { ...set, finishedAtDate: new Date() };
      }
      return set;
    });

    set({
      state: {
        ...state,
        activeIndex: state.activeIndex + 1,
        workoutSlides: updatedSlides
      }
    });
  },
  editExerciseSet: (exerciseID: number, reps: number, weight: number) => {
    const { state } = get();
    const updatedSlides = { ...state.workoutSlides };
    if (updatedSlides[exerciseID]) {
      updatedSlides[exerciseID] = updatedSlides[exerciseID].map((set) => ({
        ...set,
        reps,
        weight
      }));
    }

    set({
      state: { ...state, workoutSlides: updatedSlides },
      isAppStoreUpdateRequired: true
    });
  }
}));
export default useWorkoutSessionStore;
