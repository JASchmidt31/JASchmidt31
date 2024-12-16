import { Exercise } from '../exercise/Exercise';
import { Set } from './ExecutionSet';
import { ExecutionData } from './ExecutionType';

export class WorkoutExercise {
  id: number;
  day: number;
  exercise: Exercise;
  sets: Set[];

  constructor(data: ExecutionData) {
    this.id = data.id;
    this.day = data.day;
    this.sets = data.sets.sets.map((set, index) => new Set(set, index));
    this.exercise = new Exercise(data.exercise);
  }
}
