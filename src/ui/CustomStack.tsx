import { Stack } from 'expo-router';
import { useAppStore } from '../store/AppStore';

const CustomStack: React.FC = () => {
  const { programs } = useAppStore();

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
    </Stack>
  );
};
export default CustomStack;
