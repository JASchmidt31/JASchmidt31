import { Exercise } from '../exercise/Exercise';
import { ExecutionSet } from './ExecutionSet';
import { ExecutionData } from './ExecutionType';

export class Execution {
  id: number;
  day: number;
  exercise: Exercise;
  sets: ExecutionSet[];

  constructor(data: ExecutionData) {
    this.id = data.id;
    this.day = data.day;
    this.sets = data.sets.sets.map((set) => new ExecutionSet(set));
    this.exercise = new Exercise(data.exercise);
  }
}
