import { Day } from './day/Day';
import { Program } from './program/Program';
import { WorkoutExercise } from './workoutExercise/WorkoutExercise';

export enum DataType {
  PROGRAM = 'PROGRAM',
  DAY = 'DAY',
  EXECUTION = 'EXECUTION'
}

export type DataPayloadType =
  | { dataType: DataType.PROGRAM; data: Program[] }
  | { dataType: DataType.DAY; data: Day[] }
  | { dataType: DataType.EXECUTION; data: WorkoutExercise[] };
