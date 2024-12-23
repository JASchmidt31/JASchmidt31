import { useQuery } from '@tanstack/react-query';
import { TrainingProgram } from '../services/trainingProgram/TrainingProgram';
import { getTrainingPrograms } from '../services/trainingProgram/TrainingProgramService';

const useTrainingPrograms = () => {
  return useQuery<TrainingProgram[]>({
    queryKey: ['programs'],
    queryFn: () => getTrainingPrograms(),
    staleTime: Infinity // Data will not be considered stale and won't be refetched
  });
};
export default useTrainingPrograms;
