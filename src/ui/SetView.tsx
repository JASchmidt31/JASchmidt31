import { Pressable, StyleSheet, Text } from 'react-native';
import { Set } from '../services/execution/ExecutionSet';
import RoundedBox from './RoundedBox';

interface SetViewProps {
  data: Set;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SetView = ({ data, activeIndex, setActiveIndex }: SetViewProps) => {
  let lastPress = 0;

  const handleDoublePress = () => {
    const time = new Date().getTime();
    if (time - lastPress < 300) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
    lastPress = time;
  };

  const handleLongPress = () => {
    console.log(`Long pressed (3+ seconds) on set `);
  };

  return (
    <RoundedBox isActive={activeIndex === data.index}>
      <Pressable onPress={handleDoublePress} onLongPress={handleLongPress} delayLongPress={1200}>
        <Text style={styles.slideText}>reps: {data.reps}</Text>
        {data.weight && <Text style={styles.slideText}>weight: {data.weight}</Text>}
      </Pressable>
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
