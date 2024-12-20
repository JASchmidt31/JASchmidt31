import { ExerciseSetData } from './ExecutionType';

export class ExerciseSet {
  index: number;
  reps: number;
  weight?: number;

  constructor(data: ExerciseSetData, index: number) {
    this.index = index;
    this.reps = data.reps;
    this.weight = data.weight;
  }
}
