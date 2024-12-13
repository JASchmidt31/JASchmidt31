export class ExecutionSet {
  reps: number;
  weight?: number;

  constructor(data: ExecutionSet) {
    this.reps = data.reps;
    this.weight = data.reps;
  }
}
