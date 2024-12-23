import { z } from 'zod';
import { ExerciseSchema } from '../exercise/ExerciseType';

export const WorkoutExerciseSetSchema = z.object({
  index: z.number().optional(),
  reps: z.number(),
  weight: z.number().optional()
});

export const WorkoutExerciseSchema = z
  .object({
    id: z.number(),
    day: z.number(),
    exercise: ExerciseSchema,
    sets: z.object({
      sets: z.array(WorkoutExerciseSetSchema)
    })
  })
  .passthrough();

export const WorkoutExerciseResponseSchema = z.array(WorkoutExerciseSchema);

export type WorkoutExerciseData = z.infer<typeof WorkoutExerciseSchema>;

export type ExerciseSetData = z.infer<typeof WorkoutExerciseSetSchema>;
