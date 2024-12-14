import { z } from 'zod';
import { ExerciseSchema } from '../exercise/ExerciseType';

export const ExecutionSetSchema = z.object({
  reps: z.number(),
  weight: z.number().optional()
});

export const ExecutionSchema = z
  .object({
    id: z.number(),
    day: z.number(),
    exercise: ExerciseSchema,
    sets: z.object({
      sets: z.array(ExecutionSetSchema)
    })
  })
  .passthrough();

export const ExecutionResponseSchema = z.array(ExecutionSchema);

export type ExecutionData = z.infer<typeof ExecutionSchema>;

export type ExecutionSetData = z.infer<typeof ExecutionSetSchema>;
