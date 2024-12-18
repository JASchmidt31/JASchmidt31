import { Exercise } from '../services/exercise/Exercise';

export type WorkoutExerciseSet = {
  exercise: Exercise;
  dayID: number;
  index: number;
  reps: number;
  weight?: number;
  order: number;
  finishedAtDate?: Date;
};
