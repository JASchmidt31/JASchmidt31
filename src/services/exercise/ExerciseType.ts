import { z } from 'zod';

export const ExerciseSchema = z
  .object({
    id: z.number(),
    name: z.string()
  })
  .passthrough();

export type ExerciseData = z.infer<typeof ExerciseSchema>;
