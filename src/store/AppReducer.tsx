import { DataType } from '../services/DataTypes';
import { AppAction, AppActionType, AppStoreState } from './AppAction';

export const AppReducer = (state: AppStoreState, action: AppAction): AppStoreState => {
  switch (action.type) {
    case AppActionType.SAVE_WORKOUT_SESSION:
      return {
        ...state,
        workoutSessionState: {
          ...state.workoutSessionState,
          [action.payload.dayID]: {
            ...state.workoutSessionState[action.payload.dayID],
            ...action.payload.workoutSessionState
          }
        }
      };
    case AppActionType.SET_DATA:
      switch (action.payload.dataType) {
        case DataType.PROGRAM:
          return {
            ...state,
            programs: action.payload.data
          };
        case DataType.DAY:
          return {
            ...state,
            days: action.payload.data
          };
        case DataType.EXECUTION:
          return {
            ...state,
            executions: action.payload.data
          };
      }
    case AppActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    case AppActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
    default:
      return state;
  }
};
