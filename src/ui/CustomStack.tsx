import { Stack } from 'expo-router';
import useI18n from '../hooks/useI18n';
import useTheme from '../hooks/useTheme';
import { useTrainingDays } from '../hooks/useTrainingDays';
import useTrainingPrograms from '../hooks/useTrainingPrograms';
import { useAppStore } from '../store/useAppStore';
import LoadingSpinner from './LoadingSpinner';

const CustomStack: React.FC = () => {
  const { data: programs } = useTrainingPrograms();
  const { data: days } = useTrainingDays('1');
  const { workoutSessionState } = useAppStore();
  const { colors } = useTheme();
  const i18n = useI18n();

  if (!programs || !days) return <LoadingSpinner />;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
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
        options={({ route }) => {
          //@ts-ignore
          const { dayID, exerciseID } = route.params;
          const workoutSlides = workoutSessionState[Number(dayID)].workoutSlides;
          const workoutExercise = workoutSlides[Number(exerciseID)];
          const exerciseName = workoutExercise[0].exercise.name;
          return { title: i18n.t(exerciseName) || 'Edit Exercise' };
        }}
      />
    </Stack>
  );
};
export default CustomStack;
