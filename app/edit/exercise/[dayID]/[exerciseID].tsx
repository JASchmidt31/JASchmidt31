import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import useTheme from '../../../../src/hooks/useTheme';
import useWorkoutSession from '../../../../src/hooks/useWorkoutSession';
import ValueSelector from '../../../../src/ui/ValueSelector';

const EditExercise: React.FC = () => {
  const { dayID, exerciseID } = useLocalSearchParams();
  const { isInitialized, workoutSlides, getExerciseSets, editExerciseSet } = useWorkoutSession(Array.isArray(dayID) ? dayID[0] : dayID);
  const { colors } = useTheme();

  if (!isInitialized || !workoutSlides) return null;
  const workoutSets = getExerciseSets(Number(exerciseID));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.valueContainer]}>
        <ValueSelector
          min={1}
          max={100}
          step={1}
          initialValue={workoutSets[0].reps}
          setValue={(value: number) => {
            editExerciseSet(workoutSets[0].exercise.id, value, workoutSets[0].weight || 0);
          }}
        />
        {workoutSets[0].weight && (
          <ValueSelector
            min={20}
            max={150}
            step={0.5}
            initialValue={workoutSets[0].weight}
            setValue={(value: number) => {
              editExerciseSet(workoutSets[0].exercise.id, workoutSets[0].reps, value);
            }}
          />
        )}
      </View>
    </View>
  );
};
export default EditExercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  exerciseName: {
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
    marginBottom: 16
  }
});
