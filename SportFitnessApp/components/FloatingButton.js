import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClickContext } from '../context/ClickContext';

export default function FloatingButton() {
  const { clickCount } = useContext(ClickContext);

  return (
    <TouchableOpacity style={styles.floatingButton}>
      <Text style={styles.text}>{clickCount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#035313',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
