import { supabase } from '../../supabase/supabase';
import { Program } from './Program';
import { ProgramResponseSchema, ProgramSchema } from './ProgramType';

export async function getPrograms(): Promise<Program[]> {
  try {
    const { data: programs, error: fetchError } = await supabase.from('program').select();
    if (fetchError) {
      throw new Error(`Database fetch error: ${fetchError.message}`);
    }
    const response = ProgramResponseSchema.safeParse(programs);
    if (!response.success) {
      throw new Error(`Response validation error: ${JSON.stringify(response.error)}`);
    }

    const validatedPrograms = response.data.map((p) => {
      const program = ProgramSchema.safeParse(p);
      if (!program.success) {
        throw new Error(`Program validation error: ${JSON.stringify(program.error)}`);
      }
      return new Program(program.data);
    });

    return validatedPrograms;
  } catch (error) {
    console.error(`Error in getPrograms: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}
