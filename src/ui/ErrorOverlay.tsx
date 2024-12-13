import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppActionType } from '../store/AppAction';
import { useAppDispatch, useAppStore } from '../store/AppStore';

const ErrorOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppStore();
  if (!error) return null; // Render nothing if there's no error

  const handleOkPress = () => {
    dispatch({ type: AppActionType.SET_ERROR, payload: { error: null } }); // Reset the error
  };

  return (
    <Modal transparent={true} animationType="fade" visible={!!error}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={handleOkPress}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ErrorOverlay;
