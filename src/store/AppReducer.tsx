import { DataType } from '../services/DataTypes';
import { AppAction, AppActionType, AppStoreState } from './AppAction';

export const AppReducer = (state: AppStoreState, action: AppAction): AppStoreState => {
  switch (action.type) {
    case AppActionType.SET_DATA:
      switch (action.payload.dataType) {
        case DataType.PRORGRAM:
          return {
            ...state,
            programs: action.payload.data
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
