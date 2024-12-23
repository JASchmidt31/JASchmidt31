import { z } from 'zod';

export const DaySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    program: z.number()
  })
  .passthrough();

export const DayResponseSchema = z.array(DaySchema);

export type DayData = z.infer<typeof DaySchema>;
