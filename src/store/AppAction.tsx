import { DataPayloadType } from '../services/DataTypes';
import { Day } from '../services/day/Day';
import { Execution } from '../services/execution/Execution';
import { Program } from '../services/program/Program';

export type AppAction =
  | { type: AppActionType.SET_DATA; payload: DataPayloadType }
  | { type: AppActionType.SET_ERROR; payload: { error: string | null } }
  | { type: AppActionType.SET_LOADING; payload: { isLoading: boolean } };

export enum AppActionType {
  DEFAULT_ACTION = 'DEFAULT_ACTION',
  SET_ERROR = 'SET_ERROR',
  SET_DATA = 'SET_DATA',
  SET_LOADING = 'SET_LOADING'
}

export interface AppStoreState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  programs: Program[];
  days: Day[];
  executions: Execution[];
}

export const initialAppState: AppStoreState = {
  isLoggedIn: true,
  isLoading: false,
  error: null,
  programs: [],
  days: [],
  executions: []
};
