import { Set } from '../services/execution/ExecutionSet';
import { WorkoutExercise } from '../services/execution/ExerciseExecution';

export interface WorkoutModelInterface {
  getActiveExercise(): WorkoutExercise;
  getActiveSet(): Set;
  getAll(): WorkoutExercise[];
  removeExercise(exerciseExecutionID: number): void;
  addExercise(exerciseExecution: WorkoutExercise): void;
  setSet(exerciseExecutionID: number, set: Set): void;
}
