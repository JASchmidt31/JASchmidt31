import { supabase } from '../../supabase/supabase';
import { WorkoutExerciseResponseSchema, WorkoutExerciseSchema } from './ExecutionType';
import { WorkoutExercise } from './WorkoutExercise';

export async function getWorkoutExercisesByDayID(dayID: string): Promise<WorkoutExercise[]> {
  try {
    const { data: executions, error: fetchError } = await supabase.from('workoutexercise').select('*, exercise (*)').eq('day', dayID);

    if (fetchError) {
      throw new Error(`Database fetch error: ${fetchError.message}`);
    }
    const response = WorkoutExerciseResponseSchema.safeParse(executions);
    if (!response.success) {
      throw new Error(`Response validation error: ${JSON.stringify(response.error)} \n\nReceived${JSON.stringify(executions)} `);
    }

    const validatedExecutions = response.data.map((p) => {
      const execution = WorkoutExerciseSchema.safeParse(p);
      if (!execution.success) {
        throw new Error(`Execution validation error: ${JSON.stringify(execution.error)}`);
      }
      return new WorkoutExercise(execution.data);
    });

    return validatedExecutions;
  } catch (error) {
    console.error(`Error in getWorkoutExercisesByDayID: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
}
