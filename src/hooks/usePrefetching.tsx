import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { TrainingDay } from '../services/trainingDay/TrainingDay';
import { getDaysByProgramID } from '../services/trainingDay/TrainingDayService';
import { TrainingProgram } from '../services/trainingProgram/TrainingProgram';
import { getWorkoutExercisesByDayID } from '../services/workoutExercise/WorkoutExerciseService';
import usePrograms from './useTrainingPrograms';

const usePrefetching = () => {
  const queryClient = useQueryClient();
  const { data: programs } = usePrograms();

  useEffect(() => {
    if (programs) {
      programs.forEach((program: TrainingProgram) => {
        queryClient
          .prefetchQuery({
            queryKey: ['trainingDays', program.id],
            queryFn: () => getDaysByProgramID(program.id.toString())
          })
          .then((days: any) => {
            if (days) {
              days.forEach((day: TrainingDay) => {
                queryClient.prefetchQuery({
                  queryKey: ['workoutexercise', day.id],
                  queryFn: () => getWorkoutExercisesByDayID(day.id.toString())
                });
              });
            }
          });
      });
    }
  }, [programs, queryClient]);
};

export default usePrefetching;
