import { StyleSheet, Text } from 'react-native';
import { ExecutionSet } from '../services/execution/ExecutionSet';
import RoundedBox from './RoundedBox';

interface SetViewProps {
  data: ExecutionSet;
  index: number;
}

const SetView = ({ data, index }: SetViewProps) => {
  return (
    <RoundedBox key={index}>
      <Text style={styles.slideText}>reps: {data.reps}</Text>
      {data.weight && <Text style={styles.slideText}>weight: {data.weight}</Text>}
    </RoundedBox>
  );
};
export default SetView;

const styles = StyleSheet.create({
  slideText: {
    fontSize: 24,
    color: '#eb0cf2'
  }
});
