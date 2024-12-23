import { useQuery } from '@tanstack/react-query';
import { TrainingDay } from '../services/trainingDay/TrainingDay';
import { getDaysByProgramID } from '../services/trainingDay/TrainingDayService';

export const useTrainingDays = (programID: string) => {
  return useQuery<TrainingDay[]>({
    queryKey: ['trainingDays', programID],
    queryFn: () => getDaysByProgramID(programID),
    staleTime: Infinity
  });
};
