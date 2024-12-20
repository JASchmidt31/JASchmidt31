import { WorkoutSessionState } from '../hooks/useWorkoutSession';
import { DataPayloadType } from '../services/DataTypes';
import { Day } from '../services/day/Day';
import { Program } from '../services/program/Program';
import { WorkoutExercise } from '../services/workoutExercise/WorkoutExercise';

export type AppAction =
  | { type: AppActionType.SET_DATA; payload: DataPayloadType }
  | { type: AppActionType.SET_ERROR; payload: { error: string | null } }
  | { type: AppActionType.SET_LOADING; payload: { isLoading: boolean } }
  | { type: AppActionType.SAVE_WORKOUT_SESSION; payload: { dayID: number; workoutSessionState: WorkoutSessionState } };

export enum AppActionType {
  DEFAULT_ACTION = 'DEFAULT_ACTION',
  SET_ERROR = 'SET_ERROR',
  SET_DATA = 'SET_DATA',
  SET_LOADING = 'SET_LOADING',
  SAVE_WORKOUT_SESSION = 'SAVE_WORKOUT_SESSION'
}

export interface AppStoreState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  programs: Program[];
  days: Day[];
  executions: WorkoutExercise[];
  workoutSessionState: { [dayID: number]: WorkoutSessionState };
}

export const initialAppState: AppStoreState = {
  isLoggedIn: true,
  isLoading: false,
  error: null,
  programs: [],
  days: [],
  executions: [],
  workoutSessionState: {}
};
