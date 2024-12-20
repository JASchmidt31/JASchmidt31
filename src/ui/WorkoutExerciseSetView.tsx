import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { WorkoutExerciseSet } from '../types/WorkoutExerciseSet';
import RoundedBox from './RoundedBox';

interface WorkoutExerciseSetViewProps {
  exerciseSet: WorkoutExerciseSet;
  activeIndex: number;
  finishExerciseSet: (exerciseSet: WorkoutExerciseSet) => void;
}

const WorkoutExerciseSetView = ({ exerciseSet, activeIndex, finishExerciseSet }: WorkoutExerciseSetViewProps) => {
  const active = activeIndex === exerciseSet.order;
  let lastPress = 0;
  const dayID = exerciseSet.dayID;
  const exerciseID = exerciseSet.exercise.id;

  const handleDoublePress = () => {
    const time = new Date().getTime();
    if (time - lastPress < 300) {
      if (active) {
        finishExerciseSet(exerciseSet);
      }
    }
    lastPress = time;
  };

  const handleLongPress = () => {
    router.push(`/edit/exercise/${dayID}/${exerciseID}`);
  };

  return (
    <RoundedBox isActive={active}>
      <Pressable onPress={handleDoublePress} onLongPress={handleLongPress} delayLongPress={1200}>
        <Text style={styles.slideText}>reps: {exerciseSet.reps}</Text>
        {exerciseSet.weight && <Text style={styles.slideText}>weight: {exerciseSet.weight}</Text>}
      </Pressable>
    </RoundedBox>
  );
};
export default WorkoutExerciseSetView;

const styles = StyleSheet.create({
  slideText: {
    fontSize: 24,
    color: '#eb0cf2'
  }
});
