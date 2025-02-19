import { supabase } from '../../supabase/supabase';
import { TrainingProgram } from './TrainingProgram';
import { ProgramResponseSchema, ProgramSchema } from './TraininigProgramType';

export async function getTrainingPrograms(): Promise<TrainingProgram[]> {
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
      return new TrainingProgram(program.data);
    });

    return validatedPrograms;
  } catch (error) {
    console.error(`Error in getPrograms: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}

export async function getProgramByID(id: string): Promise<TrainingProgram> {
  try {
    const { data: programs, error: fetchError } = await supabase.from('program').select('*').eq('id', id).single();
    if (fetchError) {
      throw new Error(`Database fetch error: ${fetchError.message}`);
    }
    const response = ProgramSchema.safeParse(programs);
    if (!response.success) {
      throw new Error(`Response validation error: ${JSON.stringify(response.error)}`);
    }
    return new TrainingProgram(response.data);
  } catch (error) {
    console.error(`Error in getPrograms: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}
