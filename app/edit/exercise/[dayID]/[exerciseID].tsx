import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import useWorkoutSession from '../../../../src/hooks/useWorkoutSession';
import ValueSelector from '../../../../src/ui/ValueSelector';

const EditExercise: React.FC = () => {
  const { dayID, exerciseID } = useLocalSearchParams();
  const { isInitialized, workoutSlides, getExerciseSets, editExerciseSet } = useWorkoutSession(Array.isArray(dayID) ? dayID[0] : dayID);

  if (!isInitialized || !workoutSlides) return null;
  const workoutSets = getExerciseSets(Number(exerciseID));
  const exerciseName = workoutSets[0].exercise.name;

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exerciseName}</Text>
      <View style={styles.valueContainer}>
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
    backgroundColor: '#ffff',
    padding: 16
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  exerciseName: {
    fontSize: 24,
    color: '#eb0cf2',
    width: '100%',
    textAlign: 'center',
    marginBottom: 16
  }
});
