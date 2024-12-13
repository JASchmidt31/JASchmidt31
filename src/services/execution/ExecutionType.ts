import { z } from 'zod';

export const ExecutionSetSchema = z.object({
  reps: z.number(),
  weight: z.number().optional()
});

export const ExecutionSchema = z
  .object({
    id: z.number(),
    day: z.number(),
    exercise: z.number(),
    sets: z.object({
      sets: z.array(ExecutionSetSchema)
    })
  })
  .passthrough();

export const ExecutionResponseSchema = z.array(ExecutionSchema);

export type ExecutionData = z.infer<typeof ExecutionSchema>;

export type ExecutionSetData = z.infer<typeof ExecutionSetSchema>;
