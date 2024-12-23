import { WorkoutExerciseSetRecord } from './WorkoutExerciseSet';

export type WorkoutSlide = { [exerciseID: number]: WorkoutExerciseSetRecord[] };
