import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ValueSelectorProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  setValue: (value: number) => void;
}

const ValueSelector: React.FC<ValueSelectorProps> = ({ min, max, step, initialValue, setValue }) => {
  const [value, setLocalValue] = React.useState(initialValue);

  const incrementValue = () => {
    const newValue = Math.min(value + step, max);
    setLocalValue(newValue);
    setValue(newValue);
  };

  const decrementValue = () => {
    const newValue = Math.max(value - step, min);
    setLocalValue(newValue);
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={incrementValue}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={decrementValue}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 12
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  valueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  valueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333'
  }
});

export default ValueSelector;
