import { Exercise } from '../exercise/Exercise';
import { WorkoutExerciseData } from './ExecutionType';
import { ExerciseSet } from './ExerciseSet';

export class WorkoutExercise {
  id: number;
  day: number;
  exercise: Exercise;
  sets: ExerciseSet[];

  constructor(data: WorkoutExerciseData) {
    this.id = data.id;
    this.day = data.day;
    this.sets = data.sets.sets.map((set, index) => new ExerciseSet(set, index));
    this.exercise = new Exercise(data.exercise);
  }
}
