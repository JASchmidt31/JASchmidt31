import { ExecutionSetData } from './ExecutionType';

export class Set {
  index: number;
  reps: number;
  weight?: number;

  constructor(data: ExecutionSetData, index: number) {
    this.index = index;
    this.reps = data.reps;
    this.weight = data.weight;
  }
}
