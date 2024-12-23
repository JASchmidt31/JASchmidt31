import { supabase } from '../../supabase/supabase';
import { TrainingDay } from '../trainingDay/TrainingDay';
import { DayResponseSchema, DaySchema } from '../trainingDay/TrainingDayType';

export async function getDaysByProgramID(programID: string): Promise<TrainingDay[]> {
  try {
    const { data: days, error: fetchError } = await supabase.from('day').select('*').eq('program', programID);
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
      return new TrainingDay(day.data);
    });

    return validatedDays;
  } catch (error) {
    console.error(`Error in getDays: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}
