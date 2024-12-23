import { useQuery } from '@tanstack/react-query';
import { WorkoutExercise } from '../services/workoutExercise/WorkoutExercise';
import { getWorkoutExercisesByDayID } from '../services/workoutExercise/WorkoutExerciseService';

const useWorkoutExercises = (dayID: string) => {
  return useQuery<WorkoutExercise[]>({
    queryKey: ['workoutexercise', dayID],
    queryFn: () => getWorkoutExercisesByDayID(dayID)
  });
};
export default useWorkoutExercises;
