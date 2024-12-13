import { DataType } from '../services/DataTypes';
import { getPrograms } from '../services/program/ProgramService';
import { AppActionType } from '../store/AppAction';
import { useAppDispatch } from '../store/AppStore';

const useFethch = (dataType: DataType) => {
  const dispatch = useAppDispatch();

  let fetchFunction;
  switch (dataType) {
    case DataType.PRORGRAM:
      fetchFunction = getPrograms;
  }

  const executeFetchFunction = async (fetchFunction: () => Promise<any>, dataType: DataType) => {
    try {
      const data = await fetchFunction();
      dispatch({ type: AppActionType.SET_DATA, payload: { dataType, data } });
    } catch (err) {
      dispatch({ type: AppActionType.SET_ERROR, payload: { error: err instanceof Error ? err.message : 'An error occurred' } });
    } finally {
      dispatch({ type: AppActionType.SET_LOADING, payload: { isLoading: false } });
    }
  };
};
export default useFethch;
