import { Exercise } from '../exercise/Exercise';
import { WorkoutExerciseSet } from './ExerciseSet';
import { WorkoutExerciseData } from './WorkoutExerciseType';

export class WorkoutExercise {
  id: number;
  day: number;
  exercise: Exercise;
  sets: WorkoutExerciseSet[];

  constructor(data: WorkoutExerciseData) {
    this.id = data.id;
    this.day = data.day;
    this.sets = data.sets.sets.map((set, index) => new WorkoutExerciseSet(set, index));
    this.exercise = new Exercise(data.exercise);
  }
}
