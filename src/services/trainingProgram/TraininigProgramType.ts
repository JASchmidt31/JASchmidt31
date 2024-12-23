import { z } from 'zod';

export const ProgramSchema = z
  .object({
    id: z.number(),
    name: z.string()
  })
  .passthrough();

export const ProgramResponseSchema = z.array(ProgramSchema);

export type ProgramData = z.infer<typeof ProgramSchema>;
