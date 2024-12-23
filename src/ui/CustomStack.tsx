import { Stack } from 'expo-router';
import { useTrainingDays } from '../hooks/useTrainingDays';
import useTrainingPrograms from '../hooks/useTrainingPrograms';
import LoadingSpinner from './LoadingSpinner';

const CustomStack: React.FC = () => {
  const { data: programs } = useTrainingPrograms();
  const { data: days } = useTrainingDays('1');

  if (!programs || !days) return <LoadingSpinner />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen
        name="programs/[id]"
        options={({ route }) => {
          //@ts-ignore
          const { id } = route.params;
          const program = programs.find((p) => p.id === Number(id));
          return { title: program?.name || 'Program Overview' };
        }}
      />
      <Stack.Screen
        name="days/[id]"
        options={({ route }) => {
          //@ts-ignore
          const { id } = route.params;
          const day = days.find((d) => d.id === Number(id));
          return { title: day?.name || 'Trainigsday' };
        }}
      />
      <Stack.Screen
        name="edit/exercise/[dayID]/[exerciseID]"
        options={{
          title: 'Edit Workout Exercise'
        }}
      />
    </Stack>
  );
};
export default CustomStack;
