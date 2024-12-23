import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import useTheme from '../hooks/useTheme';
import { WorkoutExerciseSetRecord } from '../types/WorkoutExerciseSet';
import RoundedBox from './RoundedBox';

interface WorkoutExerciseSetViewProps {
  exerciseSet: WorkoutExerciseSetRecord;
  activeIndex: number;
  finishExerciseSet: (exerciseSet: WorkoutExerciseSetRecord) => void;
}

const WorkoutExerciseSetView = ({ exerciseSet, activeIndex, finishExerciseSet }: WorkoutExerciseSetViewProps) => {
  const active = activeIndex === exerciseSet.order;
  let lastPress = 0;
  const dayID = exerciseSet.dayID;
  const exerciseID = exerciseSet.exercise.id;
  const { colors } = useTheme();

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
        <Text style={[styles.slideText, { color: colors.text }]}>reps: {exerciseSet.reps}</Text>
        {exerciseSet.weight && <Text style={[styles.slideText, { color: colors.text }]}>weight: {exerciseSet.weight}</Text>}
      </Pressable>
    </RoundedBox>
  );
};
export default WorkoutExerciseSetView;

const styles = StyleSheet.create({
  slideText: {
    fontSize: 24
  }
});
