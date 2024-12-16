import { Set } from '../services/execution/ExecutionSet';

export class SetModel extends Set {
  executedDate: Date | null = null;

  constructor(set: Set) {
    super({ reps: set.reps, weight: set.weight }, set.index);
  }

  setExecutionDate() {
    this.executedDate = new Date();
  }
}
