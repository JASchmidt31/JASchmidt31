import { supabase } from '../../supabase/supabase';
import { Day } from './Day';
import { DayResponseSchema, DaySchema } from './DayType';

export async function getDays(): Promise<Day[]> {
  try {
    const { data: days, error: fetchError } = await supabase.from('day').select();
    if (fetchError) {
      throw new Error(`Database fetch error: ${fetchError.message}`);
    }
    const response = DayResponseSchema.safeParse(days);
    if (!response.success) {
      throw new Error(`Response validation error: ${JSON.stringify(response.error)} \nReceived${JSON.stringify(days)} `);
    }

    const validatedDays = response.data.map((p) => {
      const day = DaySchema.safeParse(p);
      if (!day.success) {
        throw new Error(`Day validation error: ${JSON.stringify(day.error)}`);
      }
      return new Day(day.data);
    });

    return validatedDays;
  } catch (error) {
    console.error(`Error in getDays: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}
