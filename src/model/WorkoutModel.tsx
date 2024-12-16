import { Set } from '../services/execution/ExecutionSet';
import { WorkoutExercise } from '../services/execution/ExerciseExecution';
import { WorkoutModelInterface } from './WorkoutModelInterface';

export class WorkoutModel implements WorkoutModelInterface {
  startDate: Date;
  order: WeakMap<WorkoutExercise, { order: number }>;

  constructor(exerciseExecutions: WorkoutExercise[]) {
    this.startDate = new Date();
    this.order = new WeakMap();
  }
  getActiveExercise(): WorkoutExercise {
    throw new Error('Method not implemented.');
  }
  getActiveSet(): Set {
    throw new Error('Method not implemented.');
  }
  getAll(): WorkoutExercise[] {
    throw new Error('Method not implemented.');
  }
  removeExercise(exerciseExecutionID: number): void {
    throw new Error('Method not implemented.');
  }
  addExercise(exerciseExecution: WorkoutExercise): void {
    throw new Error('Method not implemented.');
  }
  setSet(exerciseExecutionID: number, set: Set): void {
    throw new Error('Method not implemented.');
  }
}
