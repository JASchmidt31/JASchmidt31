import { create } from 'zustand';
import { WorkoutSessionState } from './useWorkoutSessionStore';

interface AppStoreState {
  error: string | null;
  workoutSessionState: { [dayID: number]: WorkoutSessionState };
  saveWorkoutSession: (dayID: number, workoutSessionState: WorkoutSessionState) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  error: null,
  workoutSessionState: {},

  saveWorkoutSession: (dayID, workoutSessionState) =>
    set((state) => ({
      workoutSessionState: {
        ...state.workoutSessionState,
        [dayID]: {
          ...state.workoutSessionState[dayID],
          ...workoutSessionState
        }
      }
    })),

  setError: (error: string) => set(() => ({ error }))
}));
