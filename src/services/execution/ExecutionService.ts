import { supabase } from '../../supabase/supabase';
import { Execution } from './Execution';
import { ExecutionResponseSchema, ExecutionSchema } from './ExecutionType';

export async function getExecutions(): Promise<Execution[]> {
  try {
    const { data: executions, error: fetchError } = await supabase.from('execution').select(`
      *,
      exercise (*)
    `);

    if (fetchError) {
      throw new Error(`Database fetch error: ${fetchError.message}`);
    }
    const response = ExecutionResponseSchema.safeParse(executions);
    if (!response.success) {
      throw new Error(`Response validation error: ${JSON.stringify(response.error)} \n\nReceived${JSON.stringify(executions)} `);
    }

    const validatedExecutions = response.data.map((p) => {
      const execution = ExecutionSchema.safeParse(p);
      if (!execution.success) {
        throw new Error(`Execution validation error: ${JSON.stringify(execution.error)}`);
      }
      return new Execution(execution.data);
    });

    return validatedExecutions;
  } catch (error) {
    console.error(`Error in getExecutions: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}
