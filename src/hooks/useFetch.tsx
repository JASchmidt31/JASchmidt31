import { useCallback } from 'react';
import { DataType } from '../services/DataTypes';
import { getDays } from '../services/day/DayService';
import { getExecutions } from '../services/execution/ExecutionService';
import { getPrograms } from '../services/program/ProgramService';
import { AppActionType } from '../store/AppAction';
import { useAppDispatch } from '../store/AppStore';

const useFetch = () => {
  const dispatch = useAppDispatch(); // Call the hook at the top level

  const getFetchFunction = (dataType: DataType): (() => Promise<any>) | null => {
    switch (dataType) {
      case DataType.PROGRAM:
        return getPrograms;
      case DataType.DAY:
        return getDays;
      case DataType.EXECUTION:
        return getExecutions;
      default:
        return null; // Return null for unsupported data types
    }
  };

  const fetchData = useCallback(
    async (dataType: DataType) => {
      const fetchFunction = getFetchFunction(dataType);

      if (!fetchFunction) {
        console.error(`No fetch function available for DataType: ${dataType}`);
        dispatch({ type: AppActionType.SET_ERROR, payload: { error: 'Invalid data type' } });
        return;
      }

      dispatch({ type: AppActionType.SET_LOADING, payload: { isLoading: true } }); // Set loading state

      try {
        const data = await fetchFunction();
        dispatch({ type: AppActionType.SET_DATA, payload: { dataType, data } });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        dispatch({ type: AppActionType.SET_ERROR, payload: { error: errorMessage } });
      } finally {
        dispatch({ type: AppActionType.SET_LOADING, payload: { isLoading: false } }); // Reset loading state
      }
    },
    [dispatch]
  );

  return { fetchData }; // Return the fetchData function
};

export default useFetch;
