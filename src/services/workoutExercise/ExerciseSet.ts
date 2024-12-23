import { ExerciseSetData as WorkoutExerciseSetData } from './WorkoutExerciseType';

export class WorkoutExerciseSet {
  index: number;
  reps: number;
  weight?: number;

  constructor(data: WorkoutExerciseSetData, index: number) {
    this.index = index;
    this.reps = data.reps;
    this.weight = data.weight;
  }
}
