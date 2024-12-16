import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useFetch from '../../src/hooks/useFetch';
import { DataType } from '../../src/services/DataTypes';
import { Set } from '../../src/services/execution/ExecutionSet';
import { WorkoutExercise } from '../../src/services/execution/ExerciseExecution';
import { useAppStore } from '../../src/store/AppStore';
import Carousel from '../../src/ui/Carousel';
import SetView from '../../src/ui/SetView';

const DayDetails = () => {
  const { id } = useLocalSearchParams(); // Get the dynamic ID from the URL
  const { fetchData } = useFetch();
  const { executions } = useAppStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchData(DataType.EXECUTION);
  }, [fetchData]);

  const renderExecutionSlide = ({ item }: { item: WorkoutExercise }) => {
    return (
      <View style={[styles.slide, { backgroundColor: '#958b95' }]}>
        <Text>{item.exercise.name}</Text>
        {item.sets.map((set: Set, index) => (
          <SetView key={index} data={set} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel data={executions.filter((e) => e.day === Number(id))} renderItem={renderExecutionSlide} />
    </SafeAreaView>
  );
};

export default DayDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  slide: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  slideText: {
    fontSize: 24,
    color: '#fff'
  }
});
